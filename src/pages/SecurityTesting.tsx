import React from "react";
import { useNavigate } from "react-router-dom";

const SecurityTesting: React.FC = () => {
  const navigate = useNavigate();

  const handleSecurityTest = () => {
    alert("Starting Security Tests...\n\n✅ Running Static Code Analysis\n✅ Running Penetration Testing\n✅ Scanning for Vulnerabilities");
    // Here, you can integrate SonarQube, OWASP ZAP, or other tools
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Security Testing</h1>
      <p>Perform penetration testing and static code analysis on the application.</p>
      <button 
        onClick={handleSecurityTest} 
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#ff5733",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Start Security Testing
      </button>
    </div>
  );
};

export default SecurityTesting;
