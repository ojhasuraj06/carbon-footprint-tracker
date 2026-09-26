import { useEffect, useState } from "react"

function History() {
  const [activities, setActivities] = useState([])
  const [typeFilter, setTypeFilter] = useState("All")
  const [dateFilter, setDateFilter] = useState("")

  const loadActivities = () => {
    const saved =
      JSON.parse(localStorage.getItem("activities")) || []

    setActivities(saved)
  }

  useEffect(() => {
    loadActivities()

    const handleUpdate = () => loadActivities()

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

  const activityTypes = [
    "All",
    ...new Set(
      activities.map((activity) => activity.activityName)
    ),
  ]

  const filteredActivities = activities
    .filter((activity) => {
      const typeMatch =
        typeFilter === "All" ||
        activity.activityName === typeFilter

      const dateMatch =
        !dateFilter ||
        new Date(activity.date)
          .toISOString()
          .slice(0, 10) === dateFilter

      return typeMatch && dateMatch
    })
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )

  const totalFiltered = filteredActivities.reduce(
    (sum, activity) =>
      sum + Number(activity.carbonEmission || 0),
    0
  )

  return (
    <main className="min-h-screen bg-[#f5fbf8] pb-24 pt-20 md:ml-60 md:pb-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <p className="text-sm font-semibold text-emerald-600">
            📋 Your activity records
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
            History
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            View and filter all your logged activities.
          </p>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Filter by Activity
              </label>

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                {activityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Filter by Date
              </label>

              <input
                type="date"
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {(typeFilter !== "All" || dateFilter) && (
            <button
              onClick={() => {
                setTypeFilter("All")
                setDateFilter("")
              }}
              className="mt-4 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Activities Found
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-800">
              {filteredActivities.length}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Filtered CO₂
            </p>

            <p className="mt-1 text-3xl font-bold text-emerald-600">
              {totalFiltered.toFixed(2)} kg
            </p>
          </div>
        </div>

        {/* Desktop / Mobile Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                    Activity
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                    Quantity
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                    CO₂
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <tr
                      key={activity.id}
                      className="transition hover:bg-emerald-50/40"
                    >
                      <td className="px-5 py-4 font-semibold text-slate-700">
                        {activity.activityName}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {activity.quantity}{" "}
                        {activity.unit}
                      </td>

                      <td className="px-5 py-4 font-semibold text-emerald-600">
                        {Number(
                          activity.carbonEmission
                        ).toFixed(2)}{" "}
                        kg
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {new Date(
                          activity.date
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 py-12 text-center"
                    >
                      <div className="text-4xl">🌱</div>

                      <p className="mt-3 font-semibold text-slate-700">
                        No activities found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your filters or add a new activity.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default History