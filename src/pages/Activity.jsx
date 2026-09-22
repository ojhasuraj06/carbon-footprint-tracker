import ActivityForm from "../components/ActivityForm"

function Activity() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5fbf8] via-white to-[#eef8ff] px-6 py-8 pt-24 md:ml-60">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            🌱 Track your impact
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Log an <span className="text-emerald-600">Activity</span>
          </h1>

          <p className="mt-2 text-slate-500">
            Add your daily activity and calculate its carbon footprint.
          </p>
        </div>

        {/* Activity Form */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8">

          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-3xl">
              🌿
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Add New Activity
              </h2>

              <p className="text-sm text-slate-500">
                Enter your activity details below.
              </p>
            </div>
          </div>

          <ActivityForm />

        </div>

        {/* Nature Tip */}
        <div className="mt-6 rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-5">
          <div className="flex gap-4">
            <div className="text-3xl">🌱</div>

            <div>
              <h3 className="font-semibold text-emerald-800">
                Small actions make a difference
              </h3>

              <p className="mt-1 text-sm text-emerald-700">
                Track your daily activities to understand your environmental
                impact and make greener choices.
              </p>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}

export default Activity