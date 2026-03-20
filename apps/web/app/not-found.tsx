export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4" style={{ color: '#00ff9f' }}>404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-8">The page you are looking for does not exist.</p>
        <a
          href="/"
          className="px-6 py-3 rounded-lg transition-colors font-semibold"
          style={{ backgroundColor: '#00ff9f', color: '#000' }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
