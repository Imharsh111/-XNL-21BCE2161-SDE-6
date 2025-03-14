
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Check, 
  Shield, 
  ShieldAlert, 
  Lock, 
  Key, 
  RefreshCw,
  Database,
  ServerCrash,
  Layers,
  FileCode,
  Bug,
  GitBranch
} from 'lucide-react';

interface SecurityFeatureProps {
  title: string;
  description: string;
  implemented: boolean;
  icon: React.ReactNode;
  tools?: string[];
}

const SecurityFeature: React.FC<SecurityFeatureProps> = ({
  title,
  description,
  implemented,
  icon,
  tools = []
}) => (
  <div className="flex items-start space-x-3 p-3 rounded-lg bg-white border border-border hover:shadow-sm transition-all">
    <div className={cn(
      "flex-shrink-0 p-2 rounded-md",
      implemented ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
    )}>
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-2">
        <h4 className="font-medium">{title}</h4>
        {implemented && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Implemented
          </span>
        )}
        {!implemented && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Planned
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      
      {tools.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium text-muted-foreground">Tools:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {tools.map((tool, idx) => (
              <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-100">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

interface SecurityImplementationProps {
  className?: string;
}

const SecurityImplementation: React.FC<SecurityImplementationProps> = ({ className }) => {
  const securityFeatures: SecurityFeatureProps[] = [
    {
      title: "Content Security Policy",
      description: "Restricts sources of executable scripts to prevent XSS attacks",
      implemented: true,
      icon: <Shield className="w-5 h-5" />,
      tools: ["Helmet.js", "CSP Evaluator"]
    },
    {
      title: "HTTP Security Headers",
      description: "Implements X-Frame-Options, X-Content-Type-Options, and other security headers",
      implemented: true,
      icon: <ShieldAlert className="w-5 h-5" />,
      tools: ["Helmet.js", "SecurityHeaders.com"]
    },
    {
      title: "JWT Authentication",
      description: "Secure token-based authentication with proper validation",
      implemented: true,
      icon: <Key className="w-5 h-5" />,
      tools: ["jsonwebtoken", "jwt-decode"]
    },
    {
      title: "CSRF Protection",
      description: "Anti-CSRF tokens for all state-changing requests",
      implemented: true,
      icon: <Shield className="w-5 h-5" />,
      tools: ["csurf", "Custom CSRF middleware"]
    },
    {
      title: "Input Sanitization",
      description: "Sanitizes all user inputs to prevent injection attacks",
      implemented: true,
      icon: <Check className="w-5 h-5" />,
      tools: ["DOMPurify", "validator.js"]
    },
    {
      title: "Secure Cookies",
      description: "HttpOnly, Secure, and SameSite cookie attributes",
      implemented: true,
      icon: <Lock className="w-5 h-5" />,
      tools: ["cookie-parser", "cookies-next"]
    },
    {
      title: "Rate Limiting",
      description: "Limits request rates to prevent brute force attacks",
      implemented: false,
      icon: <RefreshCw className="w-5 h-5" />,
      tools: ["express-rate-limit", "rate-limiter-flexible"]
    },
    {
      title: "Two-Factor Authentication",
      description: "Additional security layer with time-based OTP",
      implemented: false,
      icon: <Key className="w-5 h-5" />,
      tools: ["otplib", "speakeasy"]
    },
    {
      title: "Dependency Scanning",
      description: "Automated scanning of dependencies for known vulnerabilities",
      implemented: true,
      icon: <Bug className="w-5 h-5" />,
      tools: ["OWASP Dependency-Check", "Snyk", "npm audit"]
    },
    {
      title: "Database Security",
      description: "Secure database connections and parameterized queries",
      implemented: true,
      icon: <Database className="w-5 h-5" />,
      tools: ["Prisma", "pg", "SQL injection scanners"]
    },
    {
      title: "Containerization",
      description: "Secure Docker containers with minimal attack surface",
      implemented: true,
      icon: <Layers className="w-5 h-5" />,
      tools: ["Docker", "Kubernetes", "Docker Bench for Security"]
    },
    {
      title: "CI/CD Security",
      description: "Automated security scanning in build pipeline",
      implemented: true,
      icon: <GitBranch className="w-5 h-5" />,
      tools: ["GitHub Actions", "SonarQube", "OWASP ZAP"]
    },
    {
      title: "Error Handling",
      description: "Custom error handling without exposing system details",
      implemented: true,
      icon: <ServerCrash className="w-5 h-5" />,
      tools: ["Custom middleware", "Sentry"]
    },
    {
      title: "Static Code Analysis",
      description: "Code scanning for security vulnerabilities",
      implemented: true,
      icon: <FileCode className="w-5 h-5" />,
      tools: ["SonarQube", "ESLint security plugins", "Semgrep"]
    }
  ];

  return (
    <div className={cn("bg-white rounded-xl border border-border p-6 hover:shadow-md transition-all", className)}>
      <h3 className="text-lg font-medium text-foreground mb-6">Security Implementation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {securityFeatures.map((feature, index) => (
          <SecurityFeature key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default SecurityImplementation;
