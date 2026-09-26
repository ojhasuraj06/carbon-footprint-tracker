import { useState } from "react"

const activityOptions = [
  {
    name: "Car Travel",
    emoji: "🚗",
    factor: 0.20,
    unit: "km",
  },
  {
    name: "Bus Travel",
    emoji: "🚌",
    factor: 0.08,
    unit: "km",
  },
  {
    name: "Flight",
    emoji: "✈️",
    factor: 0.25,
    unit: "km",
  },
  {
    name: "Electricity",
    emoji: "⚡",
    factor: 0.80,
    unit: "kWh",
  },
  {
    name: "Vegetarian Meal",
    emoji: "🥗",
    factor: 0.50,
    unit: "meal",
  },
  {
    name: "Non-Vegetarian Meal",
    emoji: "🍗",
    factor: 2.00,
    unit: "meal",
  },
]

function ActivityForm() {
  const [selectedActivity, setSelectedActivity] = useState(activityOptions[0])
  const [quantity, setQuantity] = useState("")

  const emission =
    quantity && Number(quantity) > 0
      ? Number(quantity) * selectedActivity.factor
      : 0

  const handleActivityChange = (e) => {
    const selected = activityOptions.find(
      (activity) => activity.name === e.target.value
    )

    setSelectedActivity(selected)
    setQuantity("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!quantity || Number(quantity) <= 0) {
      alert("Please enter a valid quantity.")
      return
    }

    const newActivity = {
      id: Date.now(),
      activityName: selectedActivity.name,
      quantity: Number(quantity),
      unit: selectedActivity.unit,
      carbonEmission: emission,
      date: new Date().toISOString(),
    }

    const existingActivities =
      JSON.parse(localStorage.getItem("activities")) || []

    const updatedActivities = [
      ...existingActivities,
      newActivity,
    ]

    localStorage.setItem(
      "activities",
      JSON.stringify(updatedActivities)
    )

    window.dispatchEvent(new Event("activitiesUpdated"))

    alert(
      `${selectedActivity.name} added successfully!\n\n` +
      `Quantity: ${quantity} ${selectedActivity.unit}\n` +
      `CO₂ Emission: ${emission.toFixed(2)} kg`
    )

    setQuantity("")
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Activity Type */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Activity Type
        </label>

        <div className="relative">
          <select
            value={selectedActivity.name}
            onChange={handleActivityChange}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:py-4 sm:text-base"
          >
            {activityOptions.map((activity) => (
              <option
                key={activity.name}
                value={activity.name}
              >
                {activity.emoji} {activity.name}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            ▼
          </span>
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-5 sm:mt-6">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Quantity
        </label>

        <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
          <input
            type="number"
            min="0"
            step="any"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder={`Enter quantity in ${selectedActivity.unit}`}
            className="min-w-0 w-full px-4 py-3.5 text-sm text-slate-700 outline-none sm:py-4 sm:text-base"
          />

          <div className="flex min-w-16 shrink-0 items-center justify-center border-l border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-600 sm:px-4 sm:text-sm">
            {selectedActivity.unit}
          </div>
        </div>
      </div>

      {/* Emission Factor */}
      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:mt-5 sm:p-5">
        <p className="text-xs font-medium text-slate-500">
          Emission Factor
        </p>

        <p className="mt-1 text-sm font-bold text-emerald-600 sm:text-base">
          {selectedActivity.factor.toFixed(2)} kg CO₂ /{" "}
          {selectedActivity.unit}
        </p>
      </div>

      {/* Estimated CO2 */}
      {quantity && Number(quantity) > 0 && (
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-500">
            Estimated CO₂
          </p>

          <p className="mt-1 text-xl font-bold text-emerald-600 sm:text-2xl">
            {emission.toFixed(2)} kg CO₂
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {quantity} {selectedActivity.unit} ×{" "}
            {selectedActivity.factor.toFixed(2)}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="mt-5 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-600 hover:to-green-600 sm:py-4 sm:text-base"
      >
        ＋ Add Activity
      </button>
    </form>
  )
}

export default ActivityForm