import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4 text-foreground">
        Page Not Found
      </h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Oops! The page you are looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full font-bold">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
