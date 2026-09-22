import { useEffect, useState } from "react"
import StatCard from "../components/StatCard"

function Dashboard() {
  const [activities, setActivities] = useState([])

  // Weekly target
  const [weeklyTarget, setWeeklyTarget] = useState(() => {
    const savedTarget = localStorage.getItem("weeklyTarget")
    return savedTarget ? Number(savedTarget) : 20
  })

  // Load activities
  const loadActivities = () => {
    const savedActivities =
      JSON.parse(localStorage.getItem("activities")) || []

    setActivities(savedActivities)
  }

  useEffect(() => {
    loadActivities()

    const handleTargetUpdate = () => {
      const savedTarget = localStorage.getItem("weeklyTarget")

      if (savedTarget) {
        setWeeklyTarget(Number(savedTarget))
      }
    }

    window.addEventListener("storage", loadActivities)
    window.addEventListener("activitiesUpdated", loadActivities)
    window.addEventListener("targetUpdated", handleTargetUpdate)

    return () => {
      window.removeEventListener("storage", loadActivities)
      window.removeEventListener("activitiesUpdated", loadActivities)
      window.removeEventListener("targetUpdated", handleTargetUpdate)
    }
  }, [])

  // Total footprint
  const totalFootprint = activities.reduce(
    (total, activity) =>
      total + Number(activity.carbonEmission || 0),
    0
  )

  // Current week's Monday
  const today = new Date()
  const day = today.getDay()

  const difference = day === 0 ? 6 : day - 1

  const weekStart = new Date(today)

  weekStart.setDate(today.getDate() - difference)
  weekStart.setHours(0, 0, 0, 0)

  // This week's footprint
  const thisWeekFootprint = activities
    .filter((activity) => {
      const activityDate = new Date(activity.date)

      return activityDate >= weekStart
    })
    .reduce(
      (total, activity) =>
        total + Number(activity.carbonEmission || 0),
      0
    )

  // Category totals
  const categoryTotals = {}

  activities.forEach((activity) => {
    const category = activity.activityName || "Other"

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0
    }

    categoryTotals[category] += Number(
      activity.carbonEmission || 0
    )
  })

  // Weekly progress
  const progressPercentage =
    weeklyTarget > 0
      ? (thisWeekFootprint / weeklyTarget) * 100
      : 0

  const progressWidth = Math.min(progressPercentage, 100)

  const targetExceeded = thisWeekFootprint > weeklyTarget

  const remaining =
    weeklyTarget - thisWeekFootprint

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5fbf8] via-white to-[#eef8ff] px-6 py-8 pt-24 md:ml-60">

      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-blue-50 p-8 shadow-sm">

          <div className="relative z-10">

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              🌱 Small actions make a difference
            </div>

            <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">
              Your{" "}
              <span className="text-emerald-600">
                Carbon
              </span>{" "}
              Footprint
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              Track your daily activities and understand your
              environmental impact.
            </p>

          </div>

          {/* Nature decoration */}
          <div className="absolute right-8 top-5 text-7xl opacity-20">
            🌿
          </div>

          <div className="absolute -bottom-10 right-20 h-32 w-32 rounded-full bg-emerald-100 opacity-50" />

        </div>


        {/* ================= STAT CARDS ================= */}

        <div className="grid gap-5 md:grid-cols-3">

          <StatCard
            title="Total Footprint"
            value={totalFootprint.toFixed(2)}
            unit="kg CO₂"
            icon="🌿"
          />

          <StatCard
            title="This Week"
            value={thisWeekFootprint.toFixed(2)}
            unit="kg CO₂"
            icon="📊"
          />

          <StatCard
            title="Weekly Target"
            value={weeklyTarget.toFixed(2)}
            unit="kg CO₂"
            icon="🎯"
          />

        </div>


        {/* ================= WEEKLY PROGRESS ================= */}

        <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 md:flex-row md:items-center">

            {/* Percentage Circle */}

            <div
              className={`flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[10px] ${
                targetExceeded
                  ? "border-red-100"
                  : "border-emerald-100"
              }`}
            >

              <span
                className={`text-2xl font-bold ${
                  targetExceeded
                    ? "text-red-500"
                    : "text-emerald-600"
                }`}
              >
                {Math.round(progressPercentage)}%
              </span>

            </div>


            {/* Progress Information */}

            <div className="flex-1">

              <div className="flex flex-col justify-between gap-3 md:flex-row">

                <div>

                  <h2 className="text-xl font-bold text-slate-800">
                    Weekly Progress
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {thisWeekFootprint.toFixed(2)} kg of{" "}
                    {weeklyTarget.toFixed(2)} kg CO₂ used this week
                  </p>

                </div>


                {/* Status */}

                {targetExceeded ? (
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-500">
                    ⚠️ Target exceeded
                  </span>
                ) : (
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
                    🌱 On track · Keep going!
                  </span>
                )}

              </div>


              {/* Progress Bar */}

              <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-100">

                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    targetExceeded
                      ? "bg-red-400"
                      : "bg-gradient-to-r from-emerald-400 to-emerald-500"
                  }`}
                  style={{
                    width: `${progressWidth}%`,
                  }}
                />

              </div>


              {/* Message */}

              <div className="mt-3 text-sm">

                {targetExceeded ? (
                  <p className="font-medium text-red-500">
                    You exceeded your target by{" "}
                    {Math.abs(remaining).toFixed(2)} kg CO₂.
                  </p>
                ) : (
                  <p className="font-medium text-emerald-600">
                    You have{" "}
                    {remaining.toFixed(2)} kg CO₂ remaining
                    this week.
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>


        {/* ================= CATEGORY BREAKDOWN ================= */}

        <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl">
              📊
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                Carbon Footprint by Category
              </h2>

              <p className="text-sm text-slate-500">
                Breakdown of your total CO₂ emissions.
              </p>

            </div>

          </div>


          {Object.keys(categoryTotals).length === 0 ? (

            <div className="rounded-xl bg-slate-50 p-8 text-center">

              <div className="text-4xl">
                🌱
              </div>

              <p className="mt-3 font-medium text-slate-600">
                No activities logged yet.
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Go to Log Activity to add your first activity.
              </p>

            </div>

          ) : (

            <div className="overflow-hidden rounded-xl border border-slate-100">

              {/* Table Header */}

              <div className="grid grid-cols-2 bg-slate-50 px-5 py-4 text-sm font-semibold uppercase text-slate-500">

                <span>
                  Category
                </span>

                <span>
                  CO₂ Emission
                </span>

              </div>


              {/* Categories */}

              {Object.entries(categoryTotals).map(
                ([category, emission]) => {

                  const percentage =
                    totalFootprint > 0
                      ? (emission / totalFootprint) * 100
                      : 0

                  return (

                    <div
                      key={category}
                      className="border-t border-slate-100 px-5 py-5"
                    >

                      <div className="grid grid-cols-2 items-center">

                        <span className="font-medium text-slate-700">
                          {category}
                        </span>

                        <span className="font-semibold text-slate-700">
                          {emission.toFixed(2)} kg CO₂
                        </span>

                      </div>


                      {/* Category Progress */}

                      <div className="mt-3 flex items-center gap-3">

                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className="h-full rounded-full bg-emerald-400"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                        <span className="w-12 text-right text-xs font-medium text-slate-400">
                          {percentage.toFixed(1)}%
                        </span>

                      </div>

                    </div>

                  )
                }
              )}

            </div>

          )}

        </div>


        {/* ================= NATURE MESSAGE ================= */}

        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-6">

          <div className="flex items-center gap-5">

            <div className="text-5xl">
              🌱
            </div>

            <div>

              <h3 className="font-bold text-emerald-800">
                Every small action counts
              </h3>

              <p className="mt-1 text-sm text-emerald-700">
                Keep tracking your activities and make
                environmentally conscious choices.
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}

export default Dashboard