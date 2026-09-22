function StatCard({ title, value, unit, icon, color = "green" }) {

  const colors = {
    green: {
      bg: "bg-emerald-50",
      icon: "bg-emerald-500",
      text: "text-emerald-600",
      border: "border-emerald-100",
    },

    blue: {
      bg: "bg-blue-50",
      icon: "bg-blue-500",
      text: "text-blue-600",
      border: "border-blue-100",
    },

    purple: {
      bg: "bg-purple-50",
      icon: "bg-purple-500",
      text: "text-purple-600",
      border: "border-purple-100",
    },
  }

  const style = colors[color]

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${style.border} bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md`}
    >

      {/* Decorative circle */}
      <div
        className={`absolute -right-8 -top-8 h-28 w-28 rounded-full ${style.bg}`}
      />

      <div className="relative flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <div className="mt-2 flex items-baseline gap-2">

            <h2 className="text-3xl font-bold text-slate-800">
              {value}
            </h2>

            <span className="text-sm font-medium text-slate-500">
              {unit}
            </span>

          </div>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${style.icon} text-2xl text-white shadow-md`}
        >
          {icon}
        </div>

      </div>

    </div>
  )
}

export default StatCard