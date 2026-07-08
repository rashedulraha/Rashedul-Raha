import React from "react";
import { Folder } from "lucide-react";

interface FolderStructureProps {
  title?: string;
  children: React.ReactNode;
}

export default function FolderStructure({
  title = "Folder Structure",
  children,
}: FolderStructureProps) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-foreground/10 bg-[#0c0c0e] shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-foreground/5 bg-foreground/5 px-4 py-3">
        <Folder className="h-5 w-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-cyan-400 tracking-tight m-0">
          {title}
        </h3>
      </div>
      
      {/* Body */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-muted-foreground">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}
