import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="hero py-20">
      <div className="hero-content text-center">
        <div>
          <p className="font-mono text-sm text-primary">404</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Page not found</h1>
          <p className="mt-4 text-base-content/70">That page doesn&apos;t exist, or it moved.</p>
          <Link href="/" className="btn mt-8 btn-primary">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
