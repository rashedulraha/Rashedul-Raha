import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="card-premium max-w-md w-full p-8 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Welcome to the admin dashboard! This area is currently under construction.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
