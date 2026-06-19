import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-block rounded bg-foreground px-6 py-3 text-background font-medium hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </main>
  );
}
