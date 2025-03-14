import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import SecurityOverview from '@/components/dashboard/SecurityOverview';
import VulnerabilityCard from '@/components/dashboard/VulnerabilityCard';
import ThreatModel from '@/components/dashboard/ThreatModel';
import CustomButton from '@/components/ui/CustomButton';
import { vulnerabilities, threatModels, SecurityVulnerability, ThreatModel as ThreatModelType } from '@/lib/securityData';
import { getCurrentUser, User } from '@/lib/auth';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import FadeTransition from '@/components/transitions/FadeTransition';
import ArchitectureDiagram from '@/components/dashboard/ArchitectureDiagram';
import SecurityImplementation from '@/components/dashboard/SecurityImplementation';

const Index: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [topVulnerabilities, setTopVulnerabilities] = useState<SecurityVulnerability[]>([]);
  const [topThreats, setTopThreats] = useState<ThreatModelType[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'architecture' | 'implementation'>('dashboard');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    const criticalAndHigh = vulnerabilities
      .filter(v => v.severity === 'critical' || v.severity === 'high')
      .slice(0, 3);
    setTopVulnerabilities(criticalAndHigh);
    
    setTopThreats(threatModels.slice(0, 2));
  }, []);
  
  if (!user && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 px-4 flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight mb-6">Welcome to SecuritySentinel</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your comprehensive security monitoring and vulnerability assessment platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomButton 
                size="lg" 
                variant="primary"
                onClick={() => toast.info('This is a demo. Please use the login form below.')}
              >
                Get Started
              </CustomButton>
              <CustomButton 
                size="lg" 
                variant="outline"
                onClick={() => toast.info('This is a demo. Documentation is not available.')}
              >
                Learn More
              </CustomButton>
            </div>
          </div>
          
          <LoginForm />
          
          <div className="mt-24 text-center text-sm text-muted-foreground">
            <p>© 2023 SecuritySentinel. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeTransition show={isVisible} className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
                <p className="text-muted-foreground mt-2">Monitor your application's security posture at a glance</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-4">
                <CustomButton 
                  variant={activeTab === 'dashboard' ? 'primary' : 'outline'} 
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </CustomButton>
                <CustomButton 
                  variant={activeTab === 'architecture' ? 'primary' : 'outline'} 
                  onClick={() => setActiveTab('architecture')}
                >
                  Architecture
                </CustomButton>
                <CustomButton 
                  variant={activeTab === 'implementation' ? 'primary' : 'outline'} 
                  onClick={() => setActiveTab('implementation')}
                >
                  Implementation
                </CustomButton>
              </div>
            </div>
            
            {activeTab === 'dashboard' && (
              <>
                <SecurityOverview />
                
                <div className="mt-12 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Top Vulnerabilities</h2>
                    <CustomButton variant="ghost" size="sm">View All</CustomButton>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topVulnerabilities.map((vulnerability, index) => (
                      <FadeTransition 
                        key={vulnerability.id}
                        show={isVisible} 
                        className="transform transition-all duration-500"
                        duration={300 + (index * 100)}
                      >
                        <VulnerabilityCard vulnerability={vulnerability} />
                      </FadeTransition>
                    ))}
                  </div>
                </div>
                
                <div className="mt-12 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Threat Models</h2>
                    <CustomButton variant="ghost" size="sm">View All</CustomButton>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topThreats.map((threatModel, index) => (
                      <FadeTransition 
                        key={threatModel.id}
                        show={isVisible} 
                        className="transform transition-all duration-500"
                        duration={600 + (index * 100)}
                      >
                        <ThreatModel threatModel={threatModel} />
                      </FadeTransition>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'architecture' && (
              <div className="mt-8">
                <FadeTransition show={isVisible}>
                  <ArchitectureDiagram />
                </FadeTransition>
                
                <div className="mt-8 bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-medium mb-4">System Documentation</h3>
                  <div className="flex gap-4 flex-wrap">
                    <CustomButton 
                      variant="outline" 
                      onClick={() => window.open('/docs/system_design.md', '_blank')}
                    >
                      System Design Document
                    </CustomButton>
                    <CustomButton 
                      variant="outline"
                      onClick={() => window.open('/docs/threat_model.md', '_blank')}
                    >
                      Threat Model Document
                    </CustomButton>
                    <CustomButton 
                      variant="outline"
                      onClick={() => toast.info('This feature is not available in the demo')}
                    >
                      Security Audit Report
                    </CustomButton>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'implementation' && (
              <div className="mt-8">
                <FadeTransition show={isVisible}>
                  <SecurityImplementation />
                </FadeTransition>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h3 className="text-lg font-medium mb-4">CI/CD Pipeline</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-5 h-5 text-green-500 mr-2">
                          <Check className="w-5 h-5" />
                        </div>
                        <span>Automated security scanning</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-5 h-5 text-green-500 mr-2">
                          <Check className="w-5 h-5" />
                        </div>
                        <span>Dependency vulnerability checks</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-5 h-5 text-green-500 mr-2">
                          <Check className="w-5 h-5" />
                        </div>
                        <span>Static code analysis</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-5 h-5 text-green-500 mr-2">
                          <Check className="w-5 h-5" />
                        </div>
                        <span>Integration tests</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h3 className="text-lg font-medium mb-4">Deployment Security</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-5 h-5 text-green-500 mr-2">
                          <Check className="w-5 h-5" />
                        </div>
                        <span>Docker containerization</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-5 h-5 text-green-500 mr-2">
                          <Check className="w-5 h-5" />
                        </div>
                        <span>HTTPS enforcement</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-5 h-5 text-green-500 mr-2">
                          <Check className="w-5 h-5" />
                        </div>
                        <span>Web Application Firewall</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-5 h-5 text-green-500 mr-2">
                          <Check className="w-5 h-5" />
                        </div>
                        <span>Network isolation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </FadeTransition>
          
          <div className="mt-16 bg-white rounded-xl border border-border p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Need a comprehensive security assessment?</h2>
                <p className="text-muted-foreground">Our security experts can help identify and mitigate vulnerabilities in your system.</p>
              </div>
              <CustomButton variant="primary" className="mt-4 md:mt-0">
                Schedule Consultation
              </CustomButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
