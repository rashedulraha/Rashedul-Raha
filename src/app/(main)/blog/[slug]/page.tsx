import React from "react";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "@/routing";
import { getBlogBySlug } from "@/services/apiService";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let post = null;
  try {
    const res = await getBlogBySlug(slug);
    if (res.data?.success && res.data?.data) {
      post = res.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
  }

  if (!post) {
    notFound();
  }

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <PageWrapper className="max-w-3xl">
      <article>
        
        {/* Back to Blog */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 transition-all group-hover:bg-foreground/10">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to Blog
        </Link>

        {/* Header / Meta */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider border border-primary/20">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt || post.createdAt}>{formatDate(post.publishedAt || post.createdAt)}</time>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <h1 className="font-instrument-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight text-balance">
            {post.title}
          </h1>
        </div>

        {/* Hero Image */}
        {post.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl mb-12 border border-border bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Content Body */}
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80 whitespace-pre-wrap leading-relaxed text-foreground/90 text-[15px] sm:text-base">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {post.description}
          </p>
          
          {post.content}
        </div>
      </article>
      <Footer />
    </PageWrapper>
  );
}
