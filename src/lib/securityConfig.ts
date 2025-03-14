
// Security configuration for the application

// Content Security Policy configuration
export const cspConfig = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.gpteng.co"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", "data:", "blob:"],
  connectSrc: ["'self'", "https://lovable.dev"],
  fontSrc: ["'self'"],
  frameSrc: ["'self'"]
};

// Security Headers configuration
export const securityHeaders = {
  'Content-Security-Policy': buildCspString(cspConfig),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Feature-Policy': "camera 'none'; microphone 'none'; geolocation 'none'",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};

// Cookie security configuration
export const cookieConfig = {
  secure: true,
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 3600 // 1 hour
};

// Token security configuration
export const tokenConfig = {
  accessTokenExpiry: 900, // 15 minutes
  refreshTokenExpiry: 86400, // 24 hours
  algorithm: 'HS256',
  issuer: 'security-sentinel'
};

// Build CSP string from configuration
function buildCspString(config: Record<string, string[]>): string {
  return Object.entries(config)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}

// Apply security headers to document programmatically
export const applySecurityHeaders = (): void => {
  Object.entries(securityHeaders).forEach(([header, value]) => {
    const meta = document.createElement('meta');
    meta.httpEquiv = header;
    meta.content = value;
    document.head.appendChild(meta);
  });

  // Set SameSite cookie attributes
  document.cookie = "SameSite=Strict; Secure";
};

// CSRF protection helpers
export const generateCsrfToken = (): string => {
  // In a real implementation, this would use a secure random generator
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

export const storeCsrfToken = (token: string): void => {
  // Store in localStorage for this demo (in a real app, use a secure cookie)
  localStorage.setItem('csrf_token', token);
};

export const validateCsrfToken = (token: string): boolean => {
  const storedToken = localStorage.getItem('csrf_token');
  return token === storedToken;
};

// Security utilities
export const sanitizeInput = (input: string): string => {
  // Basic XSS sanitization
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

// Rate limiting configuration
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
};

// Password security settings
export const passwordSecurityConfig = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventCommonPasswords: true,
  passwordHistoryCount: 5, // remember last 5 passwords to prevent reuse
};

// Security monitoring configuration
export const securityMonitoringConfig = {
  logFailedAttempts: true,
  alertOnMultipleFailures: true,
  failureThreshold: 5,
  monitoringEndpoints: [
    '/login',
    '/api/user',
    '/api/admin'
  ]
};
