import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container px-4 py-10">
      <section className="card p-8 text-center">
        <div className="mx-auto h-12 w-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
          404
        </div>
        <h1 className="text-2xl font-bold mt-3">Page Not Found</h1>
        <p className="text-gray-500 mt-1">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <Link className="btn btn-primary mt-6 inline-flex" href="/">
          Go back home
        </Link>
      </section>
    </main>
  );
}
