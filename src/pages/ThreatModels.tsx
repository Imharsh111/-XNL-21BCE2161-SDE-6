
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Shield, Layers, AlertTriangle, 
  RefreshCw, Download, Upload, 
  PlusCircle, FileText
} from 'lucide-react';
import ThreatModel from '@/components/dashboard/ThreatModel';
import CustomButton from '@/components/ui/CustomButton';
import { threatModels as initialThreatModels } from '@/lib/securityData';
import FadeTransition from '@/components/transitions/FadeTransition';
import Navbar from '@/components/layout/Navbar';
import { ThreatModel as ThreatModelType } from '@/lib/securityData';

const ThreatModels: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [threatModels, setThreatModels] = useState<ThreatModelType[]>(initialThreatModels);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [threatLabels, setThreatLabels] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Extract unique labels from threat models
    const allLabels = threatModels.flatMap(threat => threat.affectedAssets);
    const uniqueLabels = Array.from(new Set(allLabels));
    setThreatLabels(uniqueLabels);
    
    return () => clearTimeout(timer);
  }, [threatModels]);

  // Filter threat models based on selected filter
  const filteredThreatModels = selectedFilter === 'all' 
    ? threatModels 
    : threatModels.filter(model => model.riskLevel === selectedFilter);

  const runThreatAnalysis = async () => {
    setIsAnalyzing(true);
    toast.info("Starting comprehensive threat analysis...");
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add a new threat model (simulated discovery)
    const newThreatModel: ThreatModelType = {
      id: `threat-00${threatModels.length + 1}`,
      name: 'Cross-Origin Resource Sharing Misconfiguration',
      description: 'CORS headers are too permissive, potentially allowing unauthorized domains to access sensitive data.',
      riskLevel: Math.random() > 0.5 ? 'high' : 'medium',
      likelihood: Math.floor(Math.random() * 5) + 5, // 5-10
      impact: Math.floor(Math.random() * 4) + 6, // 6-10
      affectedAssets: ['API Gateway', 'Authentication Service', 'User Data'],
      mitigationSteps: [
        'Configure CORS with specific allowed origins',
        'Remove wildcards from CORS configurations',
        'Implement preflight request validation',
        'Add Origin validation middleware'
      ]
    };
    
    // Update state with new threat model
    setThreatModels(prev => [...prev, newThreatModel]);
    
    toast.success("Threat analysis completed. New potential threat discovered.");
    setIsAnalyzing(false);
  };

  // Export threat models as JSON file
  const exportThreatModels = () => {
    const dataStr = JSON.stringify(threatModels, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `threat-models-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("Threat models exported successfully");
  };

  // Generate a report in markdown format
  const generateReport = () => {
    // In a real app, this would be more sophisticated
    const report = `# Threat Model Report
Generated: ${new Date().toLocaleString()}

## Summary
Total Threats: ${threatModels.length}
Critical: ${threatModels.filter(t => t.riskLevel === 'critical').length}
High: ${threatModels.filter(t => t.riskLevel === 'high').length}
Medium: ${threatModels.filter(t => t.riskLevel === 'medium').length}
Low: ${threatModels.filter(t => t.riskLevel === 'low').length}

## Details

${threatModels.map(threat => `
### ${threat.name}
**Risk Level:** ${threat.riskLevel}
**Description:** ${threat.description}
**Likelihood:** ${threat.likelihood}/10
**Impact:** ${threat.impact}/10
**Risk Score:** ${Math.round(threat.likelihood * threat.impact / 10)}
**Affected Assets:** ${threat.affectedAssets.join(', ')}

**Mitigation Steps:**
${threat.mitigationSteps.map(step => `- ${step}`).join('\n')}
`).join('\n')}
`;

    const dataUri = `data:text/markdown;charset=utf-8,${encodeURIComponent(report)}`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `threat-report-${new Date().toISOString().slice(0, 10)}.md`);
    linkElement.click();
    
    toast.success("Threat report generated successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeTransition show={isVisible} className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Threat Models</h1>
                <p className="text-muted-foreground mt-2">
                  Analyze and manage potential security threats to your system
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 space-x-3 flex">
                <CustomButton 
                  variant="outline" 
                  onClick={exportThreatModels}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </CustomButton>
                
                <CustomButton 
                  variant="outline" 
                  onClick={generateReport}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </CustomButton>
                
                <CustomButton 
                  variant="primary" 
                  onClick={runThreatAnalysis}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Run Analysis
                    </>
                  )}
                </CustomButton>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-border p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-semibold">Threat Analysis Dashboard</h2>
                
                <div className="mt-3 sm:mt-0 flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSelectedFilter('all')}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedFilter === 'all' 
                        ? 'bg-primary text-white' 
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setSelectedFilter('critical')}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedFilter === 'critical' 
                        ? 'bg-security-critical text-white' 
                        : 'bg-security-critical/10 text-security-critical'
                    }`}
                  >
                    Critical
                  </button>
                  <button 
                    onClick={() => setSelectedFilter('high')}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedFilter === 'high' 
                        ? 'bg-security-warning text-white' 
                        : 'bg-security-warning/10 text-security-warning'
                    }`}
                  >
                    High
                  </button>
                  <button 
                    onClick={() => setSelectedFilter('medium')}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedFilter === 'medium' 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    Medium
                  </button>
                  <button 
                    onClick={() => setSelectedFilter('low')}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedFilter === 'low' 
                        ? 'bg-security-safe text-white' 
                        : 'bg-security-safe/10 text-security-safe'
                    }`}
                  >
                    Low
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredThreatModels.map((threat, index) => (
                  <FadeTransition 
                    key={threat.id} 
                    show={isVisible} 
                    duration={300 + (index * 100)}
                  >
                    <ThreatModel threatModel={threat} />
                  </FadeTransition>
                ))}
              </div>
              
              {filteredThreatModels.length === 0 && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No threat models found</h3>
                  <p className="text-muted-foreground mt-2">
                    No threat models match the selected filter. Try changing the filter or run a new analysis.
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="text-xl font-semibold mb-4">Affected Assets Overview</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {threatLabels.map((label, index) => {
                  // Count how many threats affect this asset
                  const threatsCount = threatModels.filter(
                    threat => threat.affectedAssets.includes(label)
                  ).length;
                  
                  // Count critical threats affecting this asset
                  const criticalCount = threatModels.filter(
                    threat => threat.affectedAssets.includes(label) && threat.riskLevel === 'critical'
                  ).length;
                  
                  // Determine color based on critical count
                  const labelColor = criticalCount > 0 
                    ? 'bg-security-critical/10 text-security-critical border-security-critical/20' 
                    : 'bg-blue-50 text-blue-700 border-blue-200';
                  
                  return (
                    <div 
                      key={index} 
                      className={`border rounded-lg p-4 ${labelColor}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{label}</h4>
                          <p className="text-xs mt-1">Affected by {threatsCount} threat{threatsCount !== 1 ? 's' : ''}</p>
                        </div>
                        <div className="flex items-center">
                          {criticalCount > 0 && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-security-critical text-white">
                              {criticalCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Threat Model Documentation</h3>
                <p className="text-muted-foreground mb-3">
                  Reference the complete threat model documentation to understand the methodology and risk assessment process.
                </p>
                
                <CustomButton 
                  variant="outline" 
                  onClick={() => {
                    window.open('/docs/threat_model.md', '_blank');
                    toast.info("Opened threat model documentation");
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Documentation
                </CustomButton>
              </div>
            </div>
          </FadeTransition>
        </div>
      </main>
    </div>
  );
};

export default ThreatModels;
