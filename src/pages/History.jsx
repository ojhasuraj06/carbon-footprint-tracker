import { useEffect, useState } from "react"

function History() {

  const [activities, setActivities] = useState([])

  const [typeFilter, setTypeFilter] =
    useState("all")

  const [dateFilter, setDateFilter] =
    useState("")


  const loadActivities = () => {

    const saved =
      JSON.parse(
        localStorage.getItem("activities")
      ) || []

    setActivities(saved)

  }


  useEffect(() => {

    loadActivities()

    window.addEventListener(
      "activitiesUpdated",
      loadActivities
    )

    window.addEventListener(
      "storage",
      loadActivities
    )

    return () => {

      window.removeEventListener(
        "activitiesUpdated",
        loadActivities
      )

      window.removeEventListener(
        "storage",
        loadActivities
      )

    }

  }, [])


  const filteredActivities =
    activities.filter((activity) => {

      const typeMatch =
        typeFilter === "all" ||
        activity.type === typeFilter

      const dateMatch =
        !dateFilter ||
        activity.date.startsWith(dateFilter)

      return typeMatch && dateMatch

    })


  const clearFilters = () => {

    setTypeFilter("all")
    setDateFilter("")

  }


  return (

    <main className="min-h-screen bg-gradient-to-br from-[#f5fbf8] via-white to-[#eef8ff] pt-16 md:ml-60">

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">


        {/* HEADER */}

        <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-white to-emerald-50 px-7 py-8 shadow-sm">

          <div className="absolute right-10 top-3 text-6xl opacity-70">
            🌿
          </div>

          <div className="relative">

            <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Activity Records
            </div>

            <h1 className="mt-3 text-3xl font-extrabold text-slate-800 md:text-4xl">
              Activity History
            </h1>

            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Review your activities and track their
              carbon emissions over time.
            </p>

          </div>

        </section>


        {/* FILTER */}

        <section className="mt-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              Filter Activities
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Filter your records by type or date.
            </p>

          </div>


          <div className="mt-5 grid gap-5 md:grid-cols-3">

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Activity Type
              </label>

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
              >

                <option value="all">
                  All Activities
                </option>

                <option value="car">
                  Car Travel
                </option>

                <option value="bus">
                  Bus Travel
                </option>

                <option value="flight">
                  Flight
                </option>

                <option value="electricity">
                  Electricity
                </option>

                <option value="vegMeal">
                  Vegetarian Meal
                </option>

                <option value="nonVegMeal">
                  Non-Vegetarian Meal
                </option>

              </select>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Date
              </label>

              <input
                type="date"
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
              />

            </div>


            <div className="flex items-end">

              <button
                onClick={clearFilters}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-600"
              >
                Clear Filters
              </button>

            </div>

          </div>

        </section>


        {/* HISTORY */}

        <section className="mt-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                Logged Activities
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredActivities.length} activities found
              </p>

            </div>

            <div className="hidden rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600 sm:block">
              {filteredActivities.length} Records
            </div>

          </div>


          {filteredActivities.length === 0 ? (

            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 py-16 text-center">

              <div className="text-4xl">
                🌱
              </div>

              <h3 className="mt-3 font-bold text-slate-700">
                No activities found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Add an activity or change your filters.
              </p>

            </div>

          ) : (

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-100">

              <table className="w-full min-w-[800px]">

                <thead>

                  <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">

                    <th className="px-5 py-4">
                      Activity
                    </th>

                    <th className="px-5 py-4">
                      Quantity
                    </th>

                    <th className="px-5 py-4">
                      Emission Factor
                    </th>

                    <th className="px-5 py-4">
                      CO₂ Emission
                    </th>

                    <th className="px-5 py-4">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredActivities
                    .slice()
                    .reverse()
                    .map((activity) => (

                      <tr
                        key={activity.id}
                        className="border-t border-slate-100 transition hover:bg-emerald-50/40"
                      >

                        <td className="px-5 py-4 font-semibold text-slate-700">
                          {activity.activityName}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {activity.quantity}{" "}
                          {activity.unit}
                        </td>

                        <td className="px-5 py-4 text-slate-500">
                          {activity.emissionFactor} kg
                          CO₂/{activity.unit}
                        </td>

                        <td className="px-5 py-4">

                          <span className="font-bold text-emerald-600">
                            {Number(
                              activity.carbonEmission
                            ).toFixed(2)}{" "}
                            kg CO₂
                          </span>

                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">

                          {new Date(
                            activity.date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}

                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>

    </main>

  )
}

export default History