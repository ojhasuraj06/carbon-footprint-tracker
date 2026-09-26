function Navbar() {
  const currentPath = window.location.pathname

  const navItem = (path) => {
    return currentPath === path
      ? "bg-emerald-500 text-white shadow-md"
      : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-600"
  }

  return (
    <>
      {/* Top Header */}
      <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-emerald-100 bg-white">
        <div className="flex h-full items-center justify-between px-4 sm:px-6 md:px-8">
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-lg shadow-sm sm:h-10 sm:w-10 sm:text-xl">
              🌿
            </div>

            <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
              Carbon<span className="text-emerald-600">Track</span>
            </h1>
          </div>

          <div className="hidden items-center gap-2 text-sm font-semibold text-emerald-600 md:flex">
            <span>🌱</span>
            <span>Greener Today, Brighter Tomorrow</span>
          </div>

          {/* Mobile tagline */}
          <div className="text-xs font-medium text-emerald-600 sm:text-sm md:hidden">
            🌱 Green Living
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="fixed bottom-0 left-0 top-16 z-40 hidden w-60 border-r border-emerald-100 bg-white md:block">
        <div className="flex h-full flex-col p-5">
          
          <nav className="space-y-2">
            <a
              href="/"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${navItem("/")}`}
            >
              <span className="text-lg">🏠</span>
              Dashboard
            </a>

            <a
              href="/target"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${navItem("/target")}`}
            >
              <span className="text-lg">🎯</span>
              Weekly Target
            </a>

            <a
              href="/activity"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${navItem("/activity")}`}
            >
              <span className="text-lg">➕</span>
              Log Activity
            </a>

            <a
              href="/history"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${navItem("/history")}`}
            >
              <span className="text-lg">📋</span>
              History
            </a>
          </nav>

          {/* Sidebar bottom card */}
          <div className="mt-auto rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 p-5 text-center">
            <div className="text-4xl">🌱</div>

            <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
              Small actions
              <br />
              make a big impact
            </p>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-emerald-500" />
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-3 left-3 right-3 z-50 flex items-center justify-around rounded-2xl border border-emerald-100 bg-white/95 p-2 shadow-xl backdrop-blur md:hidden">
        
        <a
          href="/"
          className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition ${navItem("/")}`}
        >
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </a>

        <a
          href="/target"
          className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition ${navItem("/target")}`}
        >
          <span className="text-lg">🎯</span>
          <span>Target</span>
        </a>

        <a
          href="/activity"
          className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition ${navItem("/activity")}`}
        >
          <span className="text-lg">➕</span>
          <span>Activity</span>
        </a>

        <a
          href="/history"
          className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition ${navItem("/history")}`}
        >
          <span className="text-lg">📋</span>
          <span>History</span>
        </a>
      </div>
    </>
  )
}

export default Navbar