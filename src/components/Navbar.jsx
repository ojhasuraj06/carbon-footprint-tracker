function Navbar() {
  const currentPath = window.location.pathname

  const navItem = (path) => {
    return currentPath === path
      ? "bg-emerald-500 text-white shadow-md"
      : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-600"
  }

  return (
    <>
      {/* ================= TOP HEADER ================= */}

      <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-emerald-100 bg-white">
        <div className="flex h-full items-center justify-between px-5 md:px-8">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-xl shadow-sm">
              🌿
            </div>

            <h1 className="text-xl font-bold text-slate-800">
              Carbon<span className="text-emerald-600">Track</span>
            </h1>
          </div>

          {/* Right Side */}
          <div className="hidden items-center gap-2 text-sm font-semibold text-emerald-600 md:flex">
            <span>🌱</span>
            <span>Greener Today, Brighter Tomorrow</span>
          </div>

        </div>
      </header>


      {/* ================= SIDEBAR ================= */}

      <aside className="fixed bottom-0 left-0 top-16 z-40 hidden w-60 border-r border-emerald-100 bg-white md:block">

        <div className="flex h-full flex-col p-5">

          <nav className="space-y-2">

            {/* 1. DASHBOARD */}
            <a
              href="/"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${navItem(
                "/"
              )}`}
            >
              <span className="text-lg">🏠</span>
              Dashboard
            </a>


            {/* 2. WEEKLY TARGET */}
            <a
              href="/target"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${navItem(
                "/target"
              )}`}
            >
              <span className="text-lg">🎯</span>
              Weekly Target
            </a>


            {/* 3. LOG ACTIVITY */}
            <a
              href="/activity"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${navItem(
                "/activity"
              )}`}
            >
              <span className="text-lg">➕</span>
              Log Activity
            </a>


            {/* 4. HISTORY */}
            <a
              href="/history"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${navItem(
                "/history"
              )}`}
            >
              <span className="text-lg">📋</span>
              History
            </a>

          </nav>


          {/* ================= NATURE CARD ================= */}

          <div className="mt-auto rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 p-5 text-center">

            <div className="text-4xl">
              🌱
            </div>

            <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
              Small actions
              <br />
              make a big impact
            </p>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-emerald-500" />

          </div>

        </div>

      </aside>


      {/* ================= MOBILE NAVIGATION ================= */}

      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-2xl border border-emerald-100 bg-white p-2 shadow-lg md:hidden">

        <a
          href="/"
          className="rounded-xl px-3 py-2 text-sm"
          title="Dashboard"
        >
          🏠
        </a>

        <a
          href="/target"
          className="rounded-xl px-3 py-2 text-sm"
          title="Weekly Target"
        >
          🎯
        </a>

        <a
          href="/activity"
          className="rounded-xl px-3 py-2 text-sm"
          title="Log Activity"
        >
          ➕
        </a>

        <a
          href="/history"
          className="rounded-xl px-3 py-2 text-sm"
          title="History"
        >
          📋
        </a>

      </div>
    </>
  )
}

export default Navbar