
# SecuritySentinel

## Project Overview

SecuritySentinel is a comprehensive security monitoring and vulnerability assessment platform built with a focus on real-time security measures, penetration testing, and secure coding practices.

## Security Features

- **Content Security Policy (CSP)**: Restricts sources of executable scripts
- **HTTP Security Headers**: Implements X-Frame-Options, X-Content-Type-Options, etc.
- **JWT Authentication**: Secure token-based authentication
- **CSRF Protection**: Anti-CSRF tokens for state-changing requests
- **Input Sanitization**: Prevents injection attacks
- **Secure Cookie Configuration**: HttpOnly, Secure, and SameSite attributes
- **Comprehensive Threat Modeling**: Visual representation of threats and mitigations
- **Vulnerability Tracking**: Real-time monitoring of security vulnerabilities
- **Security Score Calculation**: Quantitative measurement of security posture

## Architecture

The application follows a layered security architecture:

1. **Client Layer**: React.js frontend with client-side validations
2. **Security Gateway**: Implements security headers, CSRF protection, etc.
3. **API Layer**: REST endpoints with authentication and authorization
4. **Database Layer**: Secure data storage with parameterized queries

## Getting Started

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd security-sentinel

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Security Documentation

- System Design Document: [docs/system_design.md](src/docs/system_design.md)
- Threat Model: [docs/threat_model.md](src/docs/threat_model.md)

## Project Structure

- `/src/components` - UI components
- `/src/lib` - Utility functions and security configurations
- `/src/pages` - Application pages
- `/src/docs` - Security documentation

## Built With

- React.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- react-router-dom
- Vite
