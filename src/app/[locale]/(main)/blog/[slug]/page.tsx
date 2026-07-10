import React from "react";

import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import FolderStructure from "@/components/blog/FolderStructure";
import EnvBlock from "@/components/blog/EnvBlock";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div>

        
        {/* Background gradient from hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 z-40 h-22.5 w-full select-none lg:h-25 top-0"
          style={{
            maskImage: "linear-gradient(to bottom, black 50%, transparent)",
            WebkitBackdropFilter: "blur(2px)",
            backdropFilter: "blur(2px)",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        />

        <main className="min-h-screen pt-32 pb-20">
          <article className="container relative mx-auto max-w-3xl px-4 sm:px-6">
            
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
                  <time dateTime={post.date}>{post.date}</time>
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

            {/* Content Body - Hardcoded for demo to show UI components */}
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {post.description}
              </p>
              
              <p>
                When building a robust web application, maintaining a clean architecture is essential. One of the most important aspects is how you structure your folders and manage your secrets. Let&apos;s dive into the optimal setup.
              </p>

              <h2>Clean Architecture Setup</h2>
              <p>
                A well-organized codebase reduces cognitive load. Here is the folder structure I use for almost every production Next.js or Node application:
              </p>

              {/* Custom Component 1 */}
              <FolderStructure>
{`src/
├── config/
│   ├── database.ts
│   ├── logger.ts
│   └── constants.ts
├── models/
│   ├── User.ts
│   ├── Category.ts
│   ├── Gear.ts
│   ├── RentalOrder.ts
│   ├── Payment.ts
│   └── Review.ts
├── routes/
│   ├── auth.routes.ts
│   ├── gear.routes.ts
│   ├── rental.routes.ts
│   ├── payment.routes.ts
│   ├── review.routes.ts
│   ├── provider.routes.ts
│   └── admin.routes.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── gear.controller.ts
│   └── ...
├── services/
│   ├── auth.service.ts
│   ├── payment.service.ts
│   └── ...
├── middlewares/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   ├── validation.middleware.ts
│   └── error.middleware.ts
├── utils/
│   ├── bcrypt.util.ts
│   ├── jwt.util.ts
│   └── validation.util.ts
├── types/
│   └── index.ts
├── app.ts
└── server.ts`}
              </FolderStructure>

              <h2>Environment Configuration</h2>
              <p>
                Handling your environment variables carefully ensures that your secrets are never exposed to the client side inadvertently. Here is the typical <code>.env</code> file you will need for this setup:
              </p>

              {/* Custom Component 2 */}
              <EnvBlock>
{`# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/gearup"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# SSLCommerz
SSL_STORE_ID="test"
SSL_STORE_PASSWORD="test"

# Cloudinary (for images)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"`}
              </EnvBlock>

              <p>
                Remember to add <code>.env</code> to your <code>.gitignore</code> and provide a <code>.env.example</code> for your fellow developers. Keep shipping!
              </p>
            </div>
            
          </article>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
