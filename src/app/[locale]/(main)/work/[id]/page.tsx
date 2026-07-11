import { getProjectById, getProjectBanner } from "@/lib/projectData";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Code, CheckCircle, Database, Server, Layout } from "lucide-react";
import { Link } from "@/routing";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.id, resolvedParams.locale);
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: "ProjectDetails" });

  if (!project) {
    notFound();
  }

  const renderList = (items: string[]) => (
    <ul className="space-y-3 mt-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span className="text-muted-foreground text-base">{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <PageWrapper>
      <article className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
        
        {/* Back Link */}
        <Link 
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToAllProjects')}
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
                {project.name}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-medium">
                {project.tagline}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {project.live_demo && (
                <a 
                  href={project.live_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  {t('visitLiveSite')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.github_repo && (
                <a 
                  href={project.github_repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-accent"
                >
                  <Code className="w-4 h-4" />
                  {t('sourceCode')}
                </a>
              )}
            </div>
          </div>

          {/* Banner Image - Aspect Video so it fits perfectly without cropping */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted/30 border border-border/50 shadow-md">
            <Image
              src={getProjectBanner(project)}
              alt={`${project.name} Banner`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </header>

        {/* Main Content Grid (Document Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground">
                <Layout className="w-5 h-5 text-primary" />
                {t('projectOverview')}
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-base leading-7 text-muted-foreground">
                  {project.overview}
                </p>
              </div>
            </section>

            {/* Architecture (if exists) */}
            {project.architecture && (
              <section>
                <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-foreground">
                  <Server className="w-5 h-5 text-primary" />
                  {t('systemArchitecture')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(project.architecture).map(([key, value]) => {
                    if (Array.isArray(value)) return null; 
                    return (
                      <div key={key} className="p-4 rounded-xl border border-border/50 bg-muted/10">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          {key.replace(/_/g, ' ')}
                        </h3>
                        <p className="text-foreground text-sm font-medium">{String(value)}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Responsibilities or Features */}
            {project.responsibilities && project.responsibilities.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-2 text-foreground">{t('keyResponsibilities')}</h2>
                {renderList(project.responsibilities)}
              </section>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">{t('challengesOvercome')}</h2>
                <ul className="space-y-4">
                  {project.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-md bg-muted text-foreground text-xs font-bold shrink-0 mt-0.5 border border-border/50">
                        {idx + 1}
                      </span>
                      <span className="text-muted-foreground text-base leading-7">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Database Schema (if exists) */}
            {project.database_schema && project.database_schema.tables && (
              <section>
                <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-foreground">
                  <Database className="w-5 h-5 text-primary" />
                  {t('databaseSchema')}
                </h2>
                <div className="overflow-x-auto rounded-xl border border-border/50 shadow-sm">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="p-3 font-semibold text-foreground border-b border-border/50">{t('tableName')}</th>
                        <th className="p-3 font-semibold text-foreground border-b border-border/50">{t('fields')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {project.database_schema.tables.map((table: any, idx: number) => (
                        <tr key={idx} className="bg-transparent hover:bg-muted/10 transition-colors">
                          <td className="p-3 font-medium text-foreground whitespace-nowrap align-top">
                            {table.name}
                          </td>
                          <td className="p-3 text-muted-foreground leading-relaxed">
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
            
            {/* Role & Outcome */}
            <div className="bg-muted/10 border border-border/50 rounded-2xl p-6 space-y-6">
              {project.role && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">{t('myRole')}</h3>
                  <p className="font-medium text-foreground text-sm">{project.role}</p>
                </div>
              )}
              
              {project.outcome_profit && project.outcome_profit.business_impact && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">{t('businessImpact')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.outcome_profit.business_impact}</p>
                </div>
              )}

              {project.outcome_profit && project.outcome_profit.client_testimonial && (
                <div className="pt-4 border-t border-border/50">
                  <blockquote className="italic text-sm text-foreground relative pl-4 border-l-2 border-primary">
                    {project.outcome_profit.client_testimonial}
                  </blockquote>
                </div>
              )}
            </div>

            {/* Tech Stack */}
            {project.tech_stack && (
              <div className="bg-muted/10 border border-border/50 rounded-2xl p-6">
                <h3 className="font-bold text-base mb-4 pb-2 border-b border-border/50 text-foreground">{t('techStack')}</h3>
                <div className="space-y-5">
                  {Object.entries(project.tech_stack).map(([category, items]) => {
                    if (!Array.isArray(items)) return null;
                    return (
                      <div key={category}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                          {category.replace(/_/g, ' ')}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((item, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-md bg-muted/50 text-foreground text-xs font-medium border border-border/50">
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

          </div>
        </div>
      </article>
      <Footer />
    </PageWrapper>
  );
}
