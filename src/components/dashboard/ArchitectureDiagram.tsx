
import React from 'react';
import { cn } from '@/lib/utils';

interface ArchitectureDiagramProps {
  className?: string;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ className }) => {
  return (
    <div className={cn("bg-white rounded-xl border border-border p-6 hover:shadow-md transition-all", className)}>
      <h3 className="text-lg font-medium text-foreground mb-4">System Architecture</h3>
      
      <div className="relative h-[400px] w-full">
        {/* Client Layer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[180px] h-[70px] bg-blue-100 rounded-md border border-blue-200 flex items-center justify-center">
          <div className="text-center">
            <div className="font-medium">Client Browser</div>
            <div className="text-xs text-muted-foreground">React, TypeScript</div>
          </div>
        </div>
        
        {/* Arrow */}
        <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 w-[2px] h-[40px] bg-gray-300"></div>
        <div className="absolute top-[95px] left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
          HTTPS
        </div>
        
        {/* Security Layer */}
        <div className="absolute top-[110px] left-1/2 transform -translate-x-1/2 w-[220px] h-[70px] bg-red-50 rounded-md border border-red-100 flex items-center justify-center">
          <div className="text-center">
            <div className="font-medium">Security Gateway</div>
            <div className="text-xs text-muted-foreground">CSP, CSRF, Auth, Headers</div>
          </div>
        </div>
        
        {/* Arrow */}
        <div className="absolute top-[180px] left-1/2 transform -translate-x-1/2 w-[2px] h-[40px] bg-gray-300"></div>
        <div className="absolute top-[205px] left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
          Validated Requests
        </div>
        
        {/* API Layer */}
        <div className="absolute top-[220px] left-1/2 transform -translate-x-1/2 w-[180px] h-[70px] bg-green-50 rounded-md border border-green-100 flex items-center justify-center">
          <div className="text-center">
            <div className="font-medium">Backend API</div>
            <div className="text-xs text-muted-foreground">Node.js, Express</div>
          </div>
        </div>
        
        {/* Arrow */}
        <div className="absolute top-[290px] left-1/2 transform -translate-x-1/2 w-[2px] h-[40px] bg-gray-300"></div>
        <div className="absolute top-[315px] left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
          Parameterized Queries
        </div>
        
        {/* Database Layer */}
        <div className="absolute top-[330px] left-1/2 transform -translate-x-1/2 w-[180px] h-[70px] bg-purple-50 rounded-md border border-purple-100 flex items-center justify-center">
          <div className="text-center">
            <div className="font-medium">Database</div>
            <div className="text-xs text-muted-foreground">PostgreSQL</div>
          </div>
        </div>
        
        {/* Side components */}
        {/* Monitoring */}
        <div className="absolute top-[170px] right-0 w-[140px] h-[60px] bg-amber-50 rounded-md border border-amber-100 flex items-center justify-center">
          <div className="text-center">
            <div className="font-medium">Monitoring</div>
            <div className="text-xs text-muted-foreground">Logs, Alerts</div>
          </div>
        </div>
        
        {/* Authentication */}
        <div className="absolute top-[170px] left-0 w-[140px] h-[60px] bg-indigo-50 rounded-md border border-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="font-medium">Authentication</div>
            <div className="text-xs text-muted-foreground">JWT, OAuth</div>
          </div>
        </div>
        
        {/* Connecting lines */}
        <div className="absolute top-[200px] left-[140px] w-[70px] h-[1px] bg-gray-300"></div>
        <div className="absolute top-[200px] right-[140px] w-[70px] h-[1px] bg-gray-300"></div>
      </div>
      
      <div className="mt-6 text-sm text-muted-foreground">
        <p>This diagram illustrates the secure architecture of the SecuritySentinel platform, featuring multiple layers of security controls and validation.</p>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
