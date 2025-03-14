
import React from 'react';
import { toast } from 'sonner';
import { AlertTriangle, Check, Shield, RefreshCw } from 'lucide-react';

export type TestStatus = 'idle' | 'running' | 'success' | 'failed';

export interface SecurityTest {
  id: string;
  name: string;
  description: string;
  status: TestStatus;
  result?: string;
  details?: string[];
}

export interface SecurityTestResult {
  success: boolean;
  message: string;
  details: string[];
}

// Mock security testing implementation
export class SecurityTester {
  // This would connect to actual security testing tools in a real implementation
  
  static async testSqlInjection(): Promise<SecurityTestResult> {
    console.log("Running SQL Injection test...");
    // Simulating an actual test with randomized results
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const vulnerable = Math.random() > 0.7;
    return {
      success: !vulnerable,
      message: !vulnerable 
        ? "No SQL injection vulnerabilities detected" 
        : "SQL injection vulnerability detected",
      details: !vulnerable 
        ? [
            "All input parameters are properly sanitized", 
            "Parameterized queries in use",
            "ORM layer provides additional protection"
          ] 
        : [
            "Vulnerable endpoint detected: /api/users", 
            "Input sanitization missing on userId parameter",
            "Potential for database schema exposure"
          ]
    };
  }
  
  static async testXss(): Promise<SecurityTestResult> {
    console.log("Running XSS test...");
    await new Promise(resolve => setTimeout(resolve, 2800));
    
    const vulnerable = Math.random() > 0.6;
    return {
      success: !vulnerable,
      message: !vulnerable 
        ? "XSS protection measures verified" 
        : "XSS vulnerability detected in user interface",
      details: !vulnerable 
        ? [
            "Content Security Policy implemented", 
            "Output encoding working correctly",
            "React's built-in XSS protection active"
          ] 
        : [
            "Insufficient output encoding in profile description", 
            "CSP not blocking script execution",
            "Potential for stored XSS in comment section"
          ]
    };
  }
  
  static async testAuthBypass(): Promise<SecurityTestResult> {
    console.log("Running Authentication Bypass test...");
    await new Promise(resolve => setTimeout(resolve, 3200));
    
    const vulnerable = Math.random() > 0.8;
    return {
      success: !vulnerable,
      message: !vulnerable 
        ? "Authentication mechanisms secure" 
        : "Potential authentication bypass detected",
      details: !vulnerable 
        ? [
            "JWT validation working correctly", 
            "Rate limiting effective against brute force",
            "Session validation prevents hijacking attempts"
          ] 
        : [
            "Token validation weakness detected", 
            "Password reset flow vulnerable to enumeration",
            "Insufficient protection against credential stuffing"
          ]
    };
  }
  
  static async testCsrf(): Promise<SecurityTestResult> {
    console.log("Running CSRF test...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const vulnerable = Math.random() > 0.7;
    return {
      success: !vulnerable,
      message: !vulnerable 
        ? "CSRF protection verified" 
        : "CSRF vulnerability detected",
      details: !vulnerable 
        ? [
            "CSRF tokens implemented on all forms", 
            "SameSite cookie attributes set correctly",
            "Origin validation prevents cross-site requests"
          ] 
        : [
            "Missing CSRF token on /api/profile/update", 
            "Cookie missing SameSite attribute",
            "Multiple endpoints vulnerable to CSRF"
          ]
    };
  }
  
  static async testSecurityHeaders(): Promise<SecurityTestResult> {
    console.log("Running Security Headers test...");
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    // Check actual headers in the current page
    const headers = [
      { name: 'Content-Security-Policy', implemented: document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null },
      { name: 'X-Frame-Options', implemented: document.querySelector('meta[http-equiv="X-Frame-Options"]') !== null },
      { name: 'X-Content-Type-Options', implemented: document.querySelector('meta[http-equiv="X-Content-Type-Options"]') !== null },
    ];
    
    const missingHeaders = headers.filter(h => !h.implemented).map(h => h.name);
    const implementedCount = headers.filter(h => h.implemented).length;
    
    const vulnerable = implementedCount < 2;
    
    return {
      success: !vulnerable,
      message: !vulnerable 
        ? "Security headers properly configured" 
        : "Missing critical security headers",
      details: !vulnerable 
        ? [
            "Content-Security-Policy implemented", 
            "X-Content-Type-Options set to nosniff",
            "X-Frame-Options prevents clickjacking"
          ] 
        : [
            `Missing headers: ${missingHeaders.join(', ')}`,
            "Content-Security-Policy not enforcing strict rules",
            "Application vulnerable to clickjacking attacks"
          ]
    };
  }
  
  // Run all security tests
  static async runAllTests(updateCallback: (testId: string, result: SecurityTestResult) => void): Promise<void> {
    // Run SQL Injection test
    updateCallback('sql-injection', await this.testSqlInjection());
    
    // Run XSS test
    updateCallback('xss', await this.testXss());
    
    // Run Authentication Bypass test
    updateCallback('auth-bypass', await this.testAuthBypass());
    
    // Run CSRF test
    updateCallback('csrf', await this.testCsrf());
    
    // Run Security Headers test
    updateCallback('security-headers', await this.testSecurityHeaders());
  }
}

interface SecurityTestItemProps {
  test: SecurityTest;
  onRunTest: (testId: string) => void;
  disabled: boolean;
}

export const SecurityTestItem: React.FC<SecurityTestItemProps> = ({ 
  test, 
  onRunTest, 
  disabled 
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <div className="flex items-center">
            <h3 className="text-lg font-medium">{test.name}</h3>
            <div className="ml-3">
              {test.status === 'idle' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Ready
                </span>
              )}
              {test.status === 'running' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Running
                </span>
              )}
              {test.status === 'success' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Passed
                </span>
              )}
              {test.status === 'failed' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Failed
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{test.description}</p>
        </div>
        
        <button 
          className={`mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
            disabled 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
          onClick={() => onRunTest(test.id)}
          disabled={disabled}
        >
          {test.status === 'running' ? (
            <>
              <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
              Running...
            </>
          ) : (
            'Run Test'
          )}
        </button>
      </div>
      
      {test.status === 'success' && (
        <div className="mt-3 pl-4 border-l-2 border-green-500">
          <p className="text-sm text-green-700 font-medium">{test.result}</p>
          {test.details && (
            <ul className="mt-2 space-y-1">
              {test.details.map((detail, index) => (
                <li key={index} className="flex items-start text-xs text-muted-foreground">
                  <Check className="text-green-500 w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      {test.status === 'failed' && (
        <div className="mt-3 pl-4 border-l-2 border-red-500">
          <p className="text-sm text-red-700 font-medium">{test.result}</p>
          {test.details && (
            <ul className="mt-2 space-y-1">
              {test.details.map((detail, index) => (
                <li key={index} className="flex items-start text-xs text-muted-foreground">
                  <AlertTriangle className="text-red-500 w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
