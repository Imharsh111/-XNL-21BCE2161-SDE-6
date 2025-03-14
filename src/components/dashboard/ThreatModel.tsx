
import React from 'react';
import { cn } from '@/lib/utils';
import { ThreatModel as ThreatModelType } from '@/lib/securityData';

interface ThreatModelProps {
  threatModel: ThreatModelType;
  className?: string;
}

const ThreatModel: React.FC<ThreatModelProps> = ({ 
  threatModel,
  className 
}) => {
  const { name, description, riskLevel, likelihood, impact, affectedAssets, mitigationSteps } = threatModel;
  
  // Risk level styles
  const riskLevelStyles = {
    critical: 'bg-security-critical/10 text-security-critical border-security-critical/20',
    high: 'bg-security-warning/10 text-security-warning border-security-warning/20',
    medium: 'bg-security-warning/5 text-amber-600 border-amber-200',
    low: 'bg-security-safe/10 text-security-safe border-security-safe/20'
  };
  
  // Calculate risk score (1-100)
  const riskScore = Math.round((likelihood * impact) / 100 * 100);
  
  // Risk score color
  const getRiskScoreColor = (score: number) => {
    if (score >= 70) return 'text-security-critical';
    if (score >= 40) return 'text-security-warning';
    return 'text-security-safe';
  };
  
  return (
    <div className={cn(
      "bg-white rounded-xl border border-border p-5 hover:shadow-md transition-all duration-300 card-stack",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <span className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
          riskLevelStyles[riskLevel]
        )}>
          {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
        </span>
        
        <div className="flex items-center">
          <div className="text-center">
            <div className={cn(
              "text-xl font-bold",
              getRiskScoreColor(riskScore)
            )}>
              {riskScore}
            </div>
            <div className="text-xs text-muted-foreground">Risk Score</div>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-foreground mb-2">{name}</h3>
      
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Likelihood</p>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${likelihood * 10}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Impact</p>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${impact * 10}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-1">Affected Assets:</p>
        <div className="flex flex-wrap gap-1">
          {affectedAssets.map((asset, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground"
            >
              {asset}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-1">Mitigation Steps:</p>
        <ul className="text-sm space-y-1">
          {mitigationSteps.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-4 h-4 mt-0.5 mr-2 text-primary">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-muted-foreground">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThreatModel;
