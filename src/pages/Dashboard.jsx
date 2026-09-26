import { useEffect, useState } from "react"
import StatCard from "../components/StatCard"

function Dashboard() {
  const [activities, setActivities] = useState([])
  const [weeklyTarget, setWeeklyTarget] = useState(0)

  const loadData = () => {
    const savedActivities =
      JSON.parse(localStorage.getItem("activities")) || []

    const savedTarget =
      Number(localStorage.getItem("weeklyTarget")) || 0

    setActivities(savedActivities)
    setWeeklyTarget(savedTarget)
  }

  useEffect(() => {
    loadData()

    const handleUpdate = () => loadData()

    window.addEventListener(
      "activitiesUpdated",
      handleUpdate
    )

    window.addEventListener("storage", handleUpdate)

    return () => {
      window.removeEventListener(
        "activitiesUpdated",
        handleUpdate
      )

      window.removeEventListener(
        "storage",
        handleUpdate
      )
    }
  }, [])

  const totalFootprint = activities.reduce(
    (sum, activity) =>
      sum + Number(activity.carbonEmission || 0),
    0
  )

  // Current week starts Monday
  const now = new Date()
  const day = now.getDay()
  const diff = day === 0 ? 6 : day - 1

  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - diff)
  weekStart.setHours(0, 0, 0, 0)

  const weeklyActivities = activities.filter(
    (activity) =>
      new Date(activity.date) >= weekStart
  )

  const weeklyTotal = weeklyActivities.reduce(
    (sum, activity) =>
      sum + Number(activity.carbonEmission || 0),
    0
  )

  const weeklyProgress =
    weeklyTarget > 0
      ? Math.min(
          (weeklyTotal / weeklyTarget) * 100,
          100
        )
      : 0

  const targetExceeded =
    weeklyTarget > 0 && weeklyTotal > weeklyTarget

  // Category totals
  const categoryTotals = {}

  activities.forEach((activity) => {
    if (!categoryTotals[activity.activityName]) {
      categoryTotals[activity.activityName] = 0
    }

    categoryTotals[activity.activityName] +=
      Number(activity.carbonEmission || 0)
  })

  const categoryData = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )

  return (
    <main className="min-h-screen bg-[#f5fbf8] pb-24 pt-20 md:ml-60 md:pb-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-5 text-white shadow-sm sm:p-7 lg:p-9">
          
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-semibold text-emerald-50">
              🌱 Welcome to CarbonTrack
            </p>

            <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              Track your carbon footprint.
              <br className="hidden sm:block" />
              Make greener choices.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50 sm:text-base">
              Turn your everyday activities into meaningful environmental insights.
            </p>

            <a
              href="/activity"
              className="mt-5 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-600 shadow-sm transition hover:bg-emerald-50"
            >
              ＋ Log Activity
            </a>
          </div>

          <div className="absolute -right-5 -top-5 text-7xl opacity-20 sm:text-9xl">
            🌍
          </div>

          <div className="absolute -bottom-8 right-20 text-6xl opacity-10">
            🌿
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Footprint"
            value={`${totalFootprint.toFixed(2)} kg`}
            subtitle="All recorded activities"
            icon="🌍"
          />

          <StatCard
            title="This Week"
            value={`${weeklyTotal.toFixed(2)} kg`}
            subtitle="Current week's footprint"
            icon="📅"
          />

          <StatCard
            title="Activities"
            value={activities.length}
            subtitle="Total activities logged"
            icon="📋"
          />

          <StatCard
            title="Weekly Target"
            value={
              weeklyTarget > 0
                ? `${weeklyTarget.toFixed(1)} kg`
                : "Not Set"
            }
            subtitle="Your weekly goal"
            icon="🎯"
          />
        </section>

        {/* Weekly Progress + Quick Actions */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Weekly Progress */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
            
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Weekly Progress
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Track your current week's CO₂ usage.
                </p>
              </div>

              {weeklyTarget > 0 && (
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                    targetExceeded
                      ? "bg-red-100 text-red-600"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {targetExceeded
                    ? "⚠ Target Exceeded"
                    : "✓ Within Target"}
                </span>
              )}
            </div>

            {weeklyTarget > 0 ? (
              <>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-bold text-slate-800">
                      {weeklyTotal.toFixed(2)}
                    </p>

                    <p className="text-sm text-slate-500">
                      kg CO₂ used
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-slate-500">
                    of {weeklyTarget.toFixed(2)} kg
                  </p>
                </div>

                <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all ${
                      targetExceeded
                        ? "bg-red-500"
                        : "bg-gradient-to-r from-emerald-400 to-green-500"
                    }`}
                    style={{
                      width: `${weeklyProgress}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-right text-xs text-slate-500">
                  {weeklyProgress.toFixed(0)}% used
                </p>
              </>
            ) : (
              <div className="mt-6 rounded-xl bg-emerald-50 p-5 text-center">
                <div className="text-3xl">🎯</div>

                <p className="mt-2 font-semibold text-slate-700">
                  No weekly target set
                </p>

                <a
                  href="/target"
                  className="mt-3 inline-block text-sm font-bold text-emerald-600 hover:text-emerald-700"
                >
                  Set Weekly Target →
                </a>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-800">
              Quick Actions
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href="/activity"
                className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 transition hover:-translate-y-1 hover:shadow-sm"
              >
                <div className="text-2xl">➕</div>
                <p className="mt-2 font-bold text-slate-800">
                  Log Activity
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Add a new activity
                </p>
              </a>

              <a
                href="/target"
                className="rounded-xl border border-blue-100 bg-blue-50 p-4 transition hover:-translate-y-1 hover:shadow-sm"
              >
                <div className="text-2xl">🎯</div>
                <p className="mt-2 font-bold text-slate-800">
                  Set Target
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Manage weekly goal
                </p>
              </a>

              <a
                href="/history"
                className="rounded-xl border border-purple-100 bg-purple-50 p-4 transition hover:-translate-y-1 hover:shadow-sm sm:col-span-2"
              >
                <div className="text-2xl">📋</div>
                <p className="mt-2 font-bold text-slate-800">
                  View History
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Review and filter your activities
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* Category Breakdown */}
        <section className="mt-6 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
          
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Category Breakdown
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                CO₂ emissions by activity type.
              </p>
            </div>

            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {categoryData.length} categories
            </span>
          </div>

          {categoryData.length > 0 ? (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-[600px] w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      Category
                    </th>

                    <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      CO₂ Emission
                    </th>

                    <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      Share
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {categoryData.map(
                    ([category, emission]) => {
                      const share =
                        totalFootprint > 0
                          ? (emission /
                              totalFootprint) *
                            100
                          : 0

                      return (
                        <tr
                          key={category}
                          className="hover:bg-emerald-50/40"
                        >
                          <td className="px-3 py-4 font-semibold text-slate-700">
                            {category}
                          </td>

                          <td className="px-3 py-4 font-semibold text-emerald-600">
                            {emission.toFixed(2)} kg
                          </td>

                          <td className="px-3 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-emerald-500"
                                  style={{
                                    width: `${share}%`,
                                  }}
                                />
                              </div>

                              <span className="text-xs font-medium text-slate-500">
                                {share.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      )
                    }
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-emerald-50 p-8 text-center">
              <div className="text-4xl">🌱</div>

              <p className="mt-3 font-semibold text-slate-700">
                No activities recorded yet
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Start by logging your first activity.
              </p>

              <a
                href="/activity"
                className="mt-4 inline-block rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                Log Activity
              </a>
            </div>
          )}
        </section>

        {/* Footer message */}
        <div className="mt-6 pb-4 text-center">
          <p className="text-sm text-slate-500">
            🌿 Small actions make a big impact.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Dashboard