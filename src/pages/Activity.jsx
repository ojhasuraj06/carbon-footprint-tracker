import ActivityForm from "../components/ActivityForm"

function Activity() {
  return (
    <main className="min-h-screen bg-[#f5fbf8] pb-24 pt-20 md:ml-60 md:pb-8">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            
            <div>
              <p className="text-sm font-semibold text-emerald-600">
                🌱 Track your impact
              </p>

              <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                Log Activity
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                Add your daily activities and calculate their carbon footprint.
              </p>
            </div>

            <div className="hidden rounded-2xl bg-emerald-50 px-5 py-4 text-center sm:block">
              <div className="text-3xl">🌍</div>
              <p className="mt-1 text-xs font-semibold text-emerald-700">
                Every action counts
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6 md:p-8">
          
          <div className="mb-6 border-b border-slate-100 pb-5">
            <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
              Add a new activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select an activity and enter the quantity.
            </p>
          </div>

          <ActivityForm />
        </div>

        {/* Factors */}
        <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-800 sm:text-lg">
            CO₂ Factors
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3">
              🚗 <span className="font-medium">Car:</span> 0.20 kg/km
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              🚌 <span className="font-medium">Bus:</span> 0.08 kg/km
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              ✈️ <span className="font-medium">Flight:</span> 0.25 kg/km
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              ⚡ <span className="font-medium">Electricity:</span> 0.80 kg/kWh
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              🥗 <span className="font-medium">Veg Meal:</span> 0.50 kg
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              🍗 <span className="font-medium">Non-Veg:</span> 2.00 kg
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Activity