import { useEffect, useState } from "react"

function Target() {

  const [target, setTarget] = useState(20)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const savedTarget = localStorage.getItem("weeklyTarget")

    if (savedTarget) {
      setTarget(Number(savedTarget))
    }
  }, [])

  const handleSave = () => {

    if (!target || target <= 0) {
      setMessage("Please enter a valid target.")
      return
    }

    localStorage.setItem("weeklyTarget", target)

    window.dispatchEvent(new Event("targetUpdated"))

    setMessage("Weekly CO₂ target saved successfully! 🌱")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5fbf8] via-white to-[#eef8ff] px-6 py-8 pt-24 md:ml-60">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            🎯 Set your goal
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Weekly CO₂ <span className="text-emerald-600">Target</span>
          </h1>

          <p className="mt-2 text-slate-500">
            Set the maximum amount of CO₂ you want to emit this week.
          </p>

        </div>


        {/* Target Card */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-3xl">
              🎯
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Set Weekly Target
              </h2>

              <p className="text-sm text-slate-500">
                Choose a CO₂ limit for your current week.
              </p>
            </div>

          </div>


          {/* Input */}
          <div className="mt-8">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Weekly CO₂ Target
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">

              <input
                type="number"
                min="1"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-4 py-4 text-lg text-slate-800 outline-none"
                placeholder="Enter target"
              />

              <div className="flex items-center border-l border-slate-200 bg-emerald-50 px-5 font-semibold text-emerald-700">
                kg CO₂
              </div>

            </div>

          </div>


          {/* Save */}
          <button
            onClick={handleSave}
            className="mt-6 w-full rounded-xl bg-emerald-500 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-emerald-600"
          >
            ✓ Save Weekly Target
          </button>


          {/* Message */}
          {message && (
            <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
              {message}
            </div>
          )}

        </div>


        {/* Information Cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
            <div className="text-3xl">🌱</div>

            <h3 className="mt-3 font-semibold text-slate-800">
              Track
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Keep track of your daily carbon emissions.
            </p>
          </div>


          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="text-3xl">📊</div>

            <h3 className="mt-3 font-semibold text-slate-800">
              Monitor
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Check your weekly progress from the dashboard.
            </p>
          </div>


          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="text-3xl">🌍</div>

            <h3 className="mt-3 font-semibold text-slate-800">
              Improve
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Small changes can help reduce your carbon footprint.
            </p>
          </div>

        </div>

      </div>

    </main>
  )
}

export default Target