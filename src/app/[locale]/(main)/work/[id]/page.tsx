import { getProjectById, getProjectBanner } from "@/lib/projectData";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Code, CheckCircle, Database, Server, Layout } from "lucide-react";
import { Link } from "@/routing";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";

export default function ProjectDetailsPage({ params }: { params: { id: string, locale: string } }) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  const renderList = (items: string[]) => (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <PageWrapper>
      <article className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        
        {/* Back Link */}
        <Link 
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all projects
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
                {project.name}
              </h1>
              <p className="text-xl md:text-2xl text-primary font-medium">
                {project.tagline}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {project.live_demo && (
                <a 
                  href={project.live_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                >
                  Visit Live Site
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.github_repo && (
                <a 
                  href={project.github_repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-accent hover:border-primary/30"
                >
                  <Code className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          </div>

          {/* Banner Image */}
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl bg-muted border border-border shadow-lg">
            <Image
              src={getProjectBanner(project)}
              alt={`${project.name} Banner`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Layout className="w-6 h-6 text-primary" />
                Project Overview
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {project.overview}
                </p>
              </div>
            </section>

            {/* Architecture (if exists) */}
            {project.architecture && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Server className="w-6 h-6 text-primary" />
                  System Architecture
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(project.architecture).map(([key, value]) => {
                    if (Array.isArray(value)) return null; // Handle arrays separately if needed
                    return (
                      <div key={key} className="p-4 rounded-xl border border-border bg-card">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          {key.replace(/_/g, ' ')}
                        </h3>
                        <p className="text-foreground font-medium">{String(value)}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Responsibilities or Features */}
            {project.responsibilities && project.responsibilities.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Key Responsibilities & Features</h2>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  {renderList(project.responsibilities)}
                </div>
              </section>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-red-500/90">Challenges Overcome</h2>
                <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 md:p-8">
                  <ul className="space-y-4">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-500 text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-muted-foreground">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Database Schema (if exists) */}
            {project.database_schema && project.database_schema.tables && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Database className="w-6 h-6 text-primary" />
                  Database Schema
                </h2>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-4 font-semibold text-foreground">Table Name</th>
                        <th className="p-4 font-semibold text-foreground">Fields</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {project.database_schema.tables.map((table: any, idx: number) => (
                        <tr key={idx} className="bg-card hover:bg-muted/50 transition-colors">
                          <td className="p-4 font-medium text-primary whitespace-nowrap align-top">
                            {table.name}
                          </td>
                          <td className="p-4 text-sm text-muted-foreground leading-relaxed">
                            {table.fields.join(', ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Tech Stack */}
            {project.tech_stack && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 pb-2 border-b border-border">Tech Stack</h3>
                <div className="space-y-6">
                  {Object.entries(project.tech_stack).map(([category, items]) => {
                    if (!Array.isArray(items)) return null;
                    return (
                      <div key={category}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                          {category.replace(/_/g, ' ')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {items.map((item, idx) => (
                            <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Role & Outcome */}
            <div className="bg-muted/50 border border-border rounded-2xl p-6 space-y-6">
              {project.role && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">My Role</h3>
                  <p className="font-medium text-foreground">{project.role}</p>
                </div>
              )}
              
              {project.outcome_profit && project.outcome_profit.business_impact && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Business Impact</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.outcome_profit.business_impact}</p>
                </div>
              )}

              {project.outcome_profit && project.outcome_profit.client_testimonial && (
                <div className="pt-4 border-t border-border">
                  <blockquote className="italic text-sm text-foreground relative pl-4 border-l-2 border-primary">
                    {project.outcome_profit.client_testimonial}
                  </blockquote>
                </div>
              )}
            </div>

          </div>
        </div>
      </article>
      <Footer />
    </PageWrapper>
  );
}
