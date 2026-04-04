import { useState } from "react";

const Calculator = () => {
  const [mode, setMode] = useState<"home" | "individual">("home");

  const [data, setData] = useState({
    petrol: "",
    diesel: "",
    lpg: "",
    generator: "",

    electricity: "",
    greenElectricity: "",

    flights: "",
    transport: "",
    waste: "",
    internet: "",
    spend: "",
  });

  const [result, setResult] = useState<any>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 🔥 LOCAL CALCULATION (UPDATED)
  const localCalculation = () => {
    // 🔴 Scope 1
    const petrol = Number(data.petrol || 0) * 2.31;
    const diesel = Number(data.diesel || 0) * 2.68;
    const lpg = Number(data.lpg || 0) * 3.0;
    const generator = Number(data.generator || 0) * 2.5;

    const scope1 = petrol + diesel + lpg + generator;

    // 🔵 Scope 2
    const electricity = Number(data.electricity || 0) * 0.82;
    const greenElectricity = Number(data.greenElectricity || 0) * 0.1;

    const scope2 = electricity + greenElectricity;

    // 🟢 Scope 3
    const flights = Number(data.flights || 0) * 90;
    const transport = Number(data.transport || 0) * 0.1;
    const waste = Number(data.waste || 0) * 1.2;
    const internet = Number(data.internet || 0) * 0.06;
    const spend = Number(data.spend || 0) * 0.0005;

    const scope3 =
      flights + transport + waste + internet + spend;

    return {
      total: (scope1 + scope2 + scope3).toFixed(2),
      scope1: scope1.toFixed(2),
      scope2: scope2.toFixed(2),
      scope3: scope3.toFixed(2),
      breakdown: { flights, transport, waste, internet, spend },
    };
  };

  // 🌐 API CALL (Scope 2 enhanced)
  const calculateWithAPI = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        "https://www.carboninterface.com/api/v1/estimates",
        {
          method: "POST",
          headers: {
            Authorization: "BnHWm9ej9xSdCS5rIa4uaw",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "electricity",
            electricity_unit: "kwh",
            electricity_value: Number(data.electricity || 0),
            country: "IN",
          }),
        }
      );

      const apiData = await res.json();
      const local = localCalculation();

      const finalResult = {
        total: (
          Number(apiData.data.attributes.carbon_kg) +
          Number(local.scope1) +
          Number(local.scope3)
        ).toFixed(2),
        scope1: local.scope1,
        scope2: apiData.data.attributes.carbon_kg.toFixed(2),
        scope3: local.scope3,
        breakdown: local.breakdown,
      };

      setResult(finalResult);
      generateInsights(finalResult);
    } catch (err) {
      const fallback = localCalculation();
      setResult(fallback);
      generateInsights(fallback);
    }

    setLoading(false);
  };

  // 🧠 INSIGHTS
  const generateInsights = (res: any) => {
    const tips = [];

    if (Number(res.scope1) > Number(res.scope2)) {
      tips.push("🚗 High direct emissions — consider EV or fuel reduction.");
    }

    if (Number(res.scope2) > 100) {
      tips.push("⚡ Switch to renewable electricity to reduce Scope 2.");
    }

    if (Number(res.scope3) > Number(res.scope1)) {
      tips.push("✈️ Travel emissions dominate — reduce flights.");
    }

    if (res.breakdown.waste > 20) {
      tips.push("♻️ Reduce waste output.");
    }

    if (res.breakdown.internet > 200) {
      tips.push("🌐 Optimize digital consumption.");
    }

    if (tips.length === 0) {
      tips.push("✅ Your emissions are well optimized!");
    }

    setInsights(tips);
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center bg-background">

      {/* HOME */}
      {mode === "home" && (
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">

          <div
            onClick={() => setMode("individual")}
            className="p-8 rounded-2xl border hover:shadow-xl cursor-pointer bg-card"
          >
            Individual Calculator
          </div>

          <div
            onClick={() =>
              window.open("https://climescore.com/clientlogin", "_blank")
            }
            className="p-8 rounded-2xl border hover:shadow-xl cursor-pointer bg-card"
          >
            Corporate Calculator
          </div>
        </div>
      )}

      {/* INDIVIDUAL */}
      {mode === "individual" && (
        <div className="max-w-6xl w-full space-y-6">

          <button onClick={() => setMode("home")}>← Back</button>

          <h1 className="text-3xl font-bold">
            Advanced Carbon Calculator
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            {/* 🔴 Scope 1 */}
            <div className="p-5 border rounded-xl bg-card space-y-3">
              <h2 className="text-red-500 font-semibold">
                Scope 1 – Direct
              </h2>

              <input name="petrol" placeholder="Petrol (L)"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black" />

              <input name="diesel" placeholder="Diesel (L)"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black" />

              <input name="lpg" placeholder="LPG (kg)"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black" />

              <input name="generator" placeholder="Generator fuel (L)"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black" />
            </div>

            {/* 🔵 Scope 2 */}
            <div className="p-5 border rounded-xl bg-card space-y-3">
              <h2 className="text-blue-500 font-semibold">
                Scope 2 – Electricity
              </h2>

              <input name="electricity" placeholder="Grid Electricity (kWh)"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black" />

              <input name="greenElectricity" placeholder="Renewable (kWh)"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black" />
            </div>

            {/* 🟢 Scope 3 */}
            <div className="p-5 border rounded-xl bg-card space-y-2">
              <h2 className="text-green-500 font-semibold">
                Scope 3 – Indirect
              </h2>

              <input name="flights" placeholder="Flights/year"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black" />

              <input name="transport" placeholder="Transport km"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black" />

              <input name="waste" placeholder="Waste kg"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black" />

              <input name="internet" placeholder="Internet GB"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black" />

              <input name="spend" placeholder="₹ Purchases"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black" />
            </div>
          </div>

          <button
            onClick={calculateWithAPI}
            className="px-8 py-3 bg-primary text-white rounded-xl"
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>

          {result && (
            <div className="grid md:grid-cols-2 gap-6">

              <div className="p-6 rounded-xl bg-primary/10">
                <h2 className="text-3xl font-bold">
                  {result.total} kg CO₂
                </h2>

                <p>Scope 1: {result.scope1}</p>
                <p>Scope 2: {result.scope2}</p>
                <p>Scope 3: {result.scope3}</p>
              </div>

              <div className="p-6 border rounded-xl bg-card">
                <h3 className="font-semibold mb-3">
                  Insights
                </h3>

                {insights.map((tip, i) => (
                  <p key={i}>{tip}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Calculator;