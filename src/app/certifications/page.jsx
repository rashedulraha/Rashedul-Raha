import PageCertifications from "@/views/Certifications/Certifications";
import Navbar from "@/views/shared/Navbar/Navbar";
import Responsive from "@/components/Responsive/Responsive";
import React from "react";

const Certifications = () => {
  return (
    <div>
      <Navbar />
      <Responsive>
        <PageCertifications />
      </Responsive>
    </div>
  );
};

export default Certifications;
