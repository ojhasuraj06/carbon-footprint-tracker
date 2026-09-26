function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 break-words text-2xl font-bold text-slate-800 sm:text-3xl">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl sm:h-12 sm:w-12">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard