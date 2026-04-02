import { useState } from "react";

const Calculator = () => {
  const [mode, setMode] = useState<"home" | "individual">("home");

  // form state for individual calculator
  const [data, setData] = useState({
    electricity: "",
    travel: "",
    diet: "",
    fuel: "",
    flights: "",
    waste: ""
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

 const calculateEmission = () => {
  const electricity = Number(data.electricity || 0) * 0.82;
  const travel = Number(data.travel || 0) * 0.21;
  const fuel = Number(data.fuel || 0) * 2.31;
  const flights = Number(data.flights || 0) * 90;
  const waste = Number(data.waste || 0) * 1.2;

  const dietFactor = {
    "1": 1.5,
    "2": 2,
    "3": 2.5,
    "4": 3.3,
  }[data.diet] || 0;

  return (
    electricity +
    travel +
    fuel +
    flights +
    waste +
    dietFactor
  ).toFixed(2);
};

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      
      {/* ================= HOME SCREEN ================= */}
      {mode === "home" && (
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
          
          {/* Individual */}
          <div
            onClick={() => setMode("individual")}
            className="p-8 rounded-2xl border hover:shadow-xl cursor-pointer transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              Calculate Individual Footprint
            </h2>
            <p className="text-sm text-muted-foreground">
              Measure your personal carbon emissions with advanced metrics.
            </p>
          </div>

          {/* Corporate */}
          <div
            onClick={() =>
              window.location.href =
                "https://climescore.com/clientlogin"
            }
            className="p-8 rounded-2xl border hover:shadow-xl cursor-pointer transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              Calculate Corporate Footprint
            </h2>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade emissions tracking for organizations.
            </p>
          </div>
        </div>
      )}

      {/* ================= INDIVIDUAL CALCULATOR ================= */}
    {/* ================= INDIVIDUAL CALCULATOR ================= */}
{mode === "individual" && (
  <div className="max-w-3xl w-full space-y-6">
    
    <button
      onClick={() => setMode("home")}
      className="text-sm text-primary"
    >
      ← Back
    </button>

    <h1 className="text-3xl font-bold">
      Advanced Carbon Calculator
    </h1>

    <div className="grid md:grid-cols-2 gap-4">
      
      {/* Electricity */}
      <input
        type="number"
        name="electricity"
        placeholder="Monthly Electricity (kWh)"
        onChange={handleChange}
        className="p-3 border rounded-lg bg-white text-black placeholder:text-gray-500"
      />

      {/* Travel */}
      <input
        type="number"
        name="travel"
        placeholder="Monthly Travel (km)"
        onChange={handleChange}
        className="p-3 border rounded-lg bg-white text-black placeholder:text-gray-500"
      />

      {/* Fuel */}
      <input
        type="number"
        name="fuel"
        placeholder="Fuel usage (litres/month)"
        onChange={handleChange}
        className="p-3 border rounded-lg bg-white text-black placeholder:text-gray-500"
      />

      {/* Flights */}
      <input
        type="number"
        name="flights"
        placeholder="Flights per year"
        onChange={handleChange}
        className="p-3 border rounded-lg bg-white text-black placeholder:text-gray-500"
      />

      {/* Waste */}
      <input
        type="number"
        name="waste"
        placeholder="Waste generated (kg/month)"
        onChange={handleChange}
        className="p-3 border rounded-lg bg-white text-black placeholder:text-gray-500"
      />

      {/* Diet */}
      <select
        name="diet"
        onChange={handleChange}
        className="p-3 border rounded-lg bg-white text-black"
      >
        <option value="">Select Diet Type</option>
        <option value="1">Vegan</option>
        <option value="2">Vegetarian</option>
        <option value="3">Mixed</option>
        <option value="4">Heavy Meat</option>
      </select>

    </div>

    {/* RESULT */}
    <div className="p-6 rounded-xl bg-primary/10">
      <p className="text-sm text-muted-foreground">
        Estimated Monthly Emissions
      </p>
      <h2 className="text-3xl font-bold">
        {calculateEmission()} kg CO₂
      </h2>
    </div>
  </div>
)}
    </div>
  );
};

export default Calculator;