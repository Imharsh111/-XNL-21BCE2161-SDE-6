
import React from 'react';
import { SecurityOverview as SecurityOverviewType, getSecurityOverview } from '@/lib/securityData';
import CustomButton from '../ui/CustomButton';
import { cn } from '@/lib/utils';

const SecurityOverview: React.FC = () => {
  const overview = getSecurityOverview();
  
  // Format date
  const formatLastScan = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get security score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-security-safe';
    if (score >= 60) return 'text-security-warning';
    return 'text-security-critical';
  };
  
  // Get security score background
  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-security-safe';
    if (score >= 60) return 'bg-security-warning';
    return 'bg-security-critical';
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Security Score Card */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:col-span-1 flex flex-col animate-slide-up">
        <h3 className="text-lg font-medium mb-4">Security Score</h3>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 mb-4">
            {/* Background Circle */}
            <svg className="w-full h-full" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
              />
              {/* Progress Circle - Dasharray 339.3 is the circumference of the circle */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={getScoreBackground(overview.securityScore)}
                strokeWidth="12"
                strokeDasharray="339.3"
                strokeDashoffset={339.3 - (339.3 * overview.securityScore) / 100}
                transform="rotate(-90 60 60)"
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            
            {/* Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn(
                "text-4xl font-bold",
                getScoreColor(overview.securityScore)
              )}>
                {overview.securityScore}
              </span>
              <span className="text-sm text-muted-foreground">out of 100</span>
            </div>
          </div>
          
          <p className="text-sm text-center text-muted-foreground">
            Last scan: {formatLastScan(overview.lastScan)}
          </p>
          
          <CustomButton 
            variant="outline" 
            size="sm"
            className="mt-4"
          >
            Run New Scan
          </CustomButton>
        </div>
      </div>
      
      {/* Vulnerability Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:col-span-2 animate-fade-in">
        <h3 className="text-lg font-medium mb-6">Vulnerability Overview</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Critical" 
            value={overview.criticalCount} 
            color="bg-security-critical/10 text-security-critical"
          />
          <StatCard 
            title="High" 
            value={overview.highCount} 
            color="bg-security-warning/10 text-security-warning"
          />
          <StatCard 
            title="Medium" 
            value={overview.mediumCount} 
            color="bg-security-warning/5 text-amber-600"
          />
          <StatCard 
            title="Low" 
            value={overview.lowCount} 
            color="bg-security-safe/10 text-security-safe"
          />
        </div>
        
        <h4 className="text-sm font-medium text-muted-foreground mb-4">Resolution Status</h4>
        
        <div className="grid grid-cols-3 gap-4">
          <StatusCard 
            title="Open" 
            value={overview.openCount} 
            color="bg-security-critical/10 text-security-critical"
          />
          <StatusCard 
            title="Mitigated" 
            value={overview.mitigatedCount} 
            color="bg-security-warning/10 text-security-warning"
          />
          <StatusCard 
            title="Resolved" 
            value={overview.resolvedCount} 
            color="bg-security-safe/10 text-security-safe"
          />
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Resolution Progress</h4>
            <span className="text-xs text-muted-foreground">
              {overview.resolvedCount + overview.mitigatedCount} of {overview.openCount + overview.resolvedCount + overview.mitigatedCount}
            </span>
          </div>
          
          <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
            <div className="flex h-full">
              <div 
                className="bg-security-safe h-full" 
                style={{ 
                  width: `${(overview.resolvedCount / (overview.openCount + overview.resolvedCount + overview.mitigatedCount)) * 100}%` 
                }}
              ></div>
              <div 
                className="bg-security-warning h-full" 
                style={{ 
                  width: `${(overview.mitigatedCount / (overview.openCount + overview.resolvedCount + overview.mitigatedCount)) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => (
  <div className="bg-white rounded-lg border border-border p-4">
    <div className="flex flex-col">
      <span className={cn("text-xs font-medium mb-1", color)}>
        {title}
      </span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  </div>
);

interface StatusCardProps {
  title: string;
  value: number;
  color: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, color }) => (
  <div className={cn("rounded-lg p-3 flex items-center", color)}>
    <div className="flex-1">
      <div className="text-xs font-medium mb-1">
        {title}
      </div>
      <div className="text-lg font-bold">
        {value}
      </div>
    </div>
  </div>
);

export default SecurityOverview;
