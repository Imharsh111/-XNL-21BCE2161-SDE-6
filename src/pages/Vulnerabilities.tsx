
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Check, AlertTriangle, Shield, RefreshCw, FileText, Download } from 'lucide-react';
import VulnerabilityCard from '@/components/dashboard/VulnerabilityCard';
import CustomButton from '@/components/ui/CustomButton';
import { vulnerabilities } from '@/lib/securityData';
import FadeTransition from '@/components/transitions/FadeTransition';
import Navbar from '@/components/layout/Navbar';
import { SecurityTestItem, SecurityTest, SecurityTester } from '@/components/security/SecurityTestEngine';
import { applySecurityHeaders } from '@/lib/securityConfig';

const Vulnerabilities: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [securityTests, setSecurityTests] = useState<SecurityTest[]>([
    {
      id: 'sql-injection',
      name: 'SQL Injection Test',
      description: 'Tests for SQL injection vulnerabilities in input fields',
      status: 'idle'
    },
    {
      id: 'xss',
      name: 'Cross-Site Scripting (XSS) Test',
      description: 'Tests for XSS vulnerabilities in rendered output',
      status: 'idle'
    },
    {
      id: 'auth-bypass',
      name: 'Authentication Bypass Test',
      description: 'Tests for authentication weaknesses',
      status: 'idle'
    },
    {
      id: 'csrf',
      name: 'CSRF Protection Test',
      description: 'Verifies CSRF token validation',
      status: 'idle'
    },
    {
      id: 'security-headers',
      name: 'Security Headers Test',
      description: 'Checks implementation of security headers',
      status: 'idle'
    }
  ]);
  const [activeScanId, setActiveScanId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { passed: number, failed: number }>>({
    'sql-injection': { passed: 0, failed: 0 },
    'xss': { passed: 0, failed: 0 },
    'auth-bypass': { passed: 0, failed: 0 },
    'csrf': { passed: 0, failed: 0 },
    'security-headers': { passed: 0, failed: 0 }
  });
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Apply security headers for tests
    applySecurityHeaders();
    
    return () => clearTimeout(timer);
  }, []);

  // Run a security test and track historical results
  const runSecurityTest = async (testId: string) => {
    // Set the test to running state
    setSecurityTests(prev => 
      prev.map(test => 
        test.id === testId ? { ...test, status: 'running' } : test
      )
    );
    
    setActiveScanId(testId);
    
    try {
      // Get the test method based on testId
      let testResult;
      switch (testId) {
        case 'sql-injection':
          testResult = await SecurityTester.testSqlInjection();
          break;
        case 'xss':
          testResult = await SecurityTester.testXss();
          break;
        case 'auth-bypass':
          testResult = await SecurityTester.testAuthBypass();
          break;
        case 'csrf':
          testResult = await SecurityTester.testCsrf();
          break;
        case 'security-headers':
          testResult = await SecurityTester.testSecurityHeaders();
          break;
        default:
          throw new Error(`Unknown test: ${testId}`);
      }
      
      // Update test status
      setSecurityTests(prev => 
        prev.map(test => 
          test.id === testId ? { 
            ...test, 
            status: testResult.success ? 'success' : 'failed',
            result: testResult.message,
            details: testResult.details
          } : test
        )
      );
      
      // Update test results history
      setTestResults(prev => ({
        ...prev,
        [testId]: {
          passed: prev[testId].passed + (testResult.success ? 1 : 0),
          failed: prev[testId].failed + (testResult.success ? 0 : 1)
        }
      }));
      
      // Show toast notification
      if (testResult.success) {
        toast.success(`${testResult.message}`);
      } else {
        toast.error(`${testResult.message}`);
      }
      
      // Update last scan time
      setLastScanTime(new Date().toISOString());
    } catch (error) {
      console.error(`Error running test ${testId}:`, error);
      toast.error(`Test failed to run: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Update test status to failed
      setSecurityTests(prev => 
        prev.map(test => 
          test.id === testId ? { 
            ...test, 
            status: 'failed',
            result: 'Test execution failed',
            details: [`Error: ${error instanceof Error ? error.message : 'Unknown error'}`]
          } : test
        )
      );
    } finally {
      setActiveScanId(null);
    }
  };
  
  // Run all security tests
  const runAllTests = async () => {
    toast.info("Starting comprehensive security scan...");
    
    try {
      // Set all tests to running state
      setSecurityTests(prev => prev.map(test => ({ ...test, status: 'running' })));
      
      // Run tests sequentially via our test engine
      await SecurityTester.runAllTests((testId, result) => {
        // Update test status as each test completes
        setSecurityTests(prev => 
          prev.map(test => 
            test.id === testId ? { 
              ...test, 
              status: result.success ? 'success' : 'failed',
              result: result.message,
              details: result.details
            } : test
          )
        );
        
        // Update test results history
        setTestResults(prev => ({
          ...prev,
          [testId]: {
            passed: prev[testId].passed + (result.success ? 1 : 0),
            failed: prev[testId].failed + (result.success ? 0 : 1)
          }
        }));
        
        // Show individual test toast
        if (result.success) {
          toast.success(`${result.message}`);
        } else {
          toast.error(`${result.message}`);
        }
      });
      
      // Update last scan time
      setLastScanTime(new Date().toISOString());
      
      toast.success("Comprehensive security scan completed");
    } catch (error) {
      console.error("Error running all tests:", error);
      toast.error(`Security scan failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  
  // Generate a security report
  const generateSecurityReport = () => {
    const passedTests = securityTests.filter(test => test.status === 'success').length;
    const failedTests = securityTests.filter(test => test.status === 'failed').length;
    const totalVulnerabilities = vulnerabilities.length;
    const resolvedVulnerabilities = vulnerabilities.filter(v => v.status === 'resolved').length;
    
    const report = `# Security Test Report
Generated: ${new Date().toLocaleString()}

## Security Test Results
Total Tests Run: ${passedTests + failedTests}
- Passed: ${passedTests}
- Failed: ${failedTests}
- Success Rate: ${passedTests > 0 ? Math.round((passedTests / (passedTests + failedTests)) * 100) : 0}%

## Test Details
${securityTests.map(test => `
### ${test.name}
**Status:** ${test.status === 'success' ? '✅ Passed' : test.status === 'failed' ? '❌ Failed' : '⏳ Not Run'}
${test.result ? `**Result:** ${test.result}` : ''}
${test.details ? `**Details:**\n${test.details.map(detail => `- ${detail}`).join('\n')}` : ''}
`).join('\n')}

## Known Vulnerabilities
Total Vulnerabilities: ${totalVulnerabilities}
- Resolved: ${resolvedVulnerabilities}
- Open: ${totalVulnerabilities - resolvedVulnerabilities}

${vulnerabilities.slice(0, 5).map(vuln => `
### ${vuln.name}
**Severity:** ${vuln.severity}
**Status:** ${vuln.status}
**Description:** ${vuln.description}
**Affected Components:** ${vuln.affectedComponents.join(', ')}
`).join('\n')}

## Recommendations
1. Address failed security tests immediately
2. Implement proper input validation for all user inputs
3. Ensure all security headers are properly configured
4. Regularly update dependencies to patch known vulnerabilities
5. Implement CSP to mitigate XSS attacks
`;

    const dataUri = `data:text/markdown;charset=utf-8,${encodeURIComponent(report)}`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `security-report-${new Date().toISOString().slice(0, 10)}.md`);
    linkElement.click();
    
    toast.success("Security report generated successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeTransition show={isVisible} className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Vulnerability Testing</h1>
                <p className="text-muted-foreground mt-2">
                  Run real-time security tests to identify vulnerabilities in your application
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 space-x-3 flex">
                <CustomButton 
                  variant="outline" 
                  onClick={generateSecurityReport}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </CustomButton>
                
                <CustomButton 
                  variant="primary" 
                  onClick={runAllTests}
                  disabled={activeScanId !== null}
                >
                  {activeScanId !== null ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Running Tests...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Run All Tests
                    </>
                  )}
                </CustomButton>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-border p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Security Tests</h2>
                
                {lastScanTime && (
                  <div className="text-sm text-muted-foreground">
                    Last scan: {new Date(lastScanTime).toLocaleString()}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {securityTests.map((test) => (
                  <SecurityTestItem 
                    key={test.id}
                    test={test}
                    onRunTest={runSecurityTest}
                    disabled={activeScanId !== null}
                  />
                ))}
              </div>
              
              {/* Test history metrics */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
                {Object.entries(testResults).map(([testId, results]) => {
                  const test = securityTests.find(t => t.id === testId);
                  const totalRuns = results.passed + results.failed;
                  const successRate = totalRuns > 0 ? (results.passed / totalRuns) * 100 : 0;
                  
                  return (
                    <div key={testId} className="bg-gray-50 rounded-lg p-3 border border-border">
                      <h4 className="text-sm font-medium truncate">{test?.name.replace(' Test', '')}</h4>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            successRate > 70 ? 'bg-green-500' : 
                            successRate > 40 ? 'bg-amber-500' : 
                            'bg-red-500'
                          }`} 
                          style={{ width: `${Math.max(5, successRate)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <div>Success: {results.passed}/{totalRuns}</div>
                        <div>{Math.round(successRate)}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Known Vulnerabilities</h2>
                
                <div className="flex space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Critical: {vulnerabilities.filter(v => v.severity === 'critical').length}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    High: {vulnerabilities.filter(v => v.severity === 'high').length}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Open: {vulnerabilities.filter(v => v.status === 'open').length}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vulnerabilities.slice(0, 6).map((vulnerability, index) => (
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
              
              <div className="mt-6 text-center">
                <CustomButton
                  variant="outline"
                  onClick={() => {
                    toast.info("In a real application, this would navigate to a complete vulnerability database");
                  }}
                >
                  View All Vulnerabilities
                </CustomButton>
              </div>
            </div>
          </FadeTransition>
        </div>
      </main>
    </div>
  );
};

export default Vulnerabilities;
