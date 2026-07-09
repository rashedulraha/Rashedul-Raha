import React from "react";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Chatbot />
    </>
  );
}
