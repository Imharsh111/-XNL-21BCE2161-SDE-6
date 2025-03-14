import ArchitectureDiagram from "@/components/dashboard/ArchitectureDiagram";
import SecurityImplementation from "@/components/dashboard/SecurityImplementation";
import SecurityOverview from "@/components/dashboard/SecurityOverview";
import ThreatModel from "@/components/dashboard/ThreatModel";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center">Project Security Dashboard</h1>
      <p className="text-center text-gray-400 mt-2">
        Overview of security implementations, architecture, and vulnerabilities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <ArchitectureDiagram />
        <SecurityImplementation />
        <SecurityOverview />
      </div>
    </div>
  );
};

export default Dashboard;
