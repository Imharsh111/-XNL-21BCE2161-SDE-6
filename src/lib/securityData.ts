
// Types for security data
export interface SecurityVulnerability {
  id: string;
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'injection' | 'authentication' | 'data' | 'xss' | 'configuration';
  status: 'open' | 'mitigated' | 'resolved';
  discovered: string;
  affectedComponents: string[];
}

export interface SecurityOverview {
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  mitigatedCount: number;
  resolvedCount: number;
  openCount: number;
  lastScan: string;
  securityScore: number;
}

export interface ThreatModel {
  id: string;
  name: string;
  description: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  likelihood: number; // 1-10
  impact: number; // 1-10
  affectedAssets: string[];
  mitigationSteps: string[];
}

// Mock data
export const vulnerabilities: SecurityVulnerability[] = [
  {
    id: 'vuln-001',
    name: 'SQL Injection in User API',
    description: 'Unsanitized input in the user search endpoint allows for potential SQL injection attacks.',
    severity: 'critical',
    category: 'injection',
    status: 'open',
    discovered: '2023-09-15T08:30:00Z',
    affectedComponents: ['API Gateway', 'User Service']
  },
  {
    id: 'vuln-002',
    name: 'Weak Password Policy',
    description: 'Current password requirements don\'t enforce sufficient complexity.',
    severity: 'high',
    category: 'authentication',
    status: 'mitigated',
    discovered: '2023-09-10T14:22:00Z',
    affectedComponents: ['Authentication Service']
  },
  {
    id: 'vuln-003',
    name: 'Missing Content Security Policy',
    description: 'The application doesn\'t implement a Content Security Policy, potentially allowing XSS attacks.',
    severity: 'medium',
    category: 'xss',
    status: 'open',
    discovered: '2023-09-20T11:15:00Z',
    affectedComponents: ['Frontend', 'API Gateway']
  },
  {
    id: 'vuln-004',
    name: 'Insecure Cookie Configuration',
    description: 'Authentication cookies are missing secure and httpOnly flags.',
    severity: 'medium',
    category: 'authentication',
    status: 'resolved',
    discovered: '2023-09-05T09:45:00Z',
    affectedComponents: ['Frontend', 'Authentication Service']
  },
  {
    id: 'vuln-005',
    name: 'Outdated Dependencies',
    description: 'Several npm packages have known vulnerabilities.',
    severity: 'high',
    category: 'configuration',
    status: 'open',
    discovered: '2023-09-12T16:30:00Z',
    affectedComponents: ['Frontend', 'API Services']
  },
  {
    id: 'vuln-006',
    name: 'Unencrypted Data Storage',
    description: 'User personal information is stored in the database without encryption.',
    severity: 'critical',
    category: 'data',
    status: 'mitigated',
    discovered: '2023-09-08T13:20:00Z',
    affectedComponents: ['Database', 'User Service']
  },
  {
    id: 'vuln-007',
    name: 'Insufficient Rate Limiting',
    description: 'API endpoints lack proper rate limiting, making them vulnerable to brute force attacks.',
    severity: 'medium',
    category: 'authentication',
    status: 'open',
    discovered: '2023-09-18T10:05:00Z',
    affectedComponents: ['API Gateway', 'Authentication Service']
  },
  {
    id: 'vuln-008',
    name: 'Cross-Site Request Forgery',
    description: 'Missing CSRF tokens in form submissions could allow attackers to perform actions on behalf of authenticated users.',
    severity: 'high',
    category: 'xss',
    status: 'open',
    discovered: '2023-09-14T15:10:00Z',
    affectedComponents: ['Frontend', 'API Gateway']
  }
];

export const getSecurityOverview = (): SecurityOverview => {
  const criticalCount = vulnerabilities.filter(v => v.severity === 'critical').length;
  const highCount = vulnerabilities.filter(v => v.severity === 'high').length;
  const mediumCount = vulnerabilities.filter(v => v.severity === 'medium').length;
  const lowCount = vulnerabilities.filter(v => v.severity === 'low').length;
  
  const mitigatedCount = vulnerabilities.filter(v => v.status === 'mitigated').length;
  const resolvedCount = vulnerabilities.filter(v => v.status === 'resolved').length;
  const openCount = vulnerabilities.filter(v => v.status === 'open').length;
  
  // Calculate security score (0-100)
  // This is a simple calculation - in a real app this would be more sophisticated
  const totalWeight = criticalCount * 10 + highCount * 5 + mediumCount * 2 + lowCount * 1;
  const resolvedWeight = vulnerabilities
    .filter(v => v.status === 'resolved')
    .reduce((sum, v) => {
      switch (v.severity) {
        case 'critical': return sum + 10;
        case 'high': return sum + 5;
        case 'medium': return sum + 2;
        case 'low': return sum + 1;
        default: return sum;
      }
    }, 0);
  
  const mitigatedWeight = vulnerabilities
    .filter(v => v.status === 'mitigated')
    .reduce((sum, v) => {
      switch (v.severity) {
        case 'critical': return sum + 5; // Mitigated counts for half
        case 'high': return sum + 2.5;
        case 'medium': return sum + 1;
        case 'low': return sum + 0.5;
        default: return sum;
      }
    }, 0);
  
  // If no vulnerabilities, score is 100
  const baseScore = totalWeight === 0 
    ? 100 
    : Math.round(((resolvedWeight + mitigatedWeight) / totalWeight) * 100);
  
  // Adjust score: more severe issues have bigger impact
  const securityScore = Math.max(0, Math.min(100, baseScore - (criticalCount * 10) - (highCount * 5)));
  
  return {
    criticalCount,
    highCount,
    mediumCount,
    lowCount,
    mitigatedCount,
    resolvedCount,
    openCount,
    lastScan: '2023-09-22T09:30:00Z',
    securityScore
  };
};

export const threatModels: ThreatModel[] = [
  {
    id: 'threat-001',
    name: 'Unauthorized Data Access',
    description: 'Attackers may attempt to access sensitive user data without proper authorization.',
    riskLevel: 'critical',
    likelihood: 8,
    impact: 9,
    affectedAssets: ['User Database', 'Profile API'],
    mitigationSteps: [
      'Implement proper authentication for all API endpoints',
      'Enforce role-based access control',
      'Apply the principle of least privilege',
      'Audit all data access attempts'
    ]
  },
  {
    id: 'threat-002',
    name: 'Session Hijacking',
    description: 'User sessions could be hijacked through insecure session management.',
    riskLevel: 'high',
    likelihood: 6,
    impact: 8,
    affectedAssets: ['Authentication System', 'User Sessions'],
    mitigationSteps: [
      'Use secure, HttpOnly, and SameSite cookies',
      'Implement session timeout and rotation',
      'Validate session origin and user agent',
      'Add multi-factor authentication for sensitive operations'
    ]
  },
  {
    id: 'threat-003',
    name: 'Denial of Service',
    description: 'The application could be targeted with a DoS attack, making it unavailable to legitimate users.',
    riskLevel: 'medium',
    likelihood: 7,
    impact: 6,
    affectedAssets: ['API Gateway', 'Web Servers', 'Database'],
    mitigationSteps: [
      'Implement rate limiting and throttling',
      'Use a CDN for static assets',
      'Configure auto-scaling for application servers',
      'Implement a Web Application Firewall (WAF)'
    ]
  },
  {
    id: 'threat-004',
    name: 'Supply Chain Attack',
    description: 'Compromised dependencies could introduce vulnerabilities into the application.',
    riskLevel: 'high',
    likelihood: 5,
    impact: 9,
    affectedAssets: ['NPM Dependencies', 'Deployment Pipeline'],
    mitigationSteps: [
      'Regularly audit dependencies for vulnerabilities',
      'Pin dependency versions',
      'Use a private package repository',
      'Implement integrity checking for dependencies'
    ]
  }
];
