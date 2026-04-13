import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type TimeUnit = "daily" | "weekly" | "monthly" | "yearly";
type TransportType = "bus" | "train" | "car" | "flight";

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6"];

const scopeConfig = {
  scope1: {
    title: "Scope 1 (Direct Emissions)",
    fields: [
      { id: "petrol", label: "Petrol Spend (₹)", icon: "⛽" },
      { id: "diesel", label: "Diesel Spend (₹)", icon: "🚜" },
      { id: "lpg", label: "LPG Cylinders", icon: "🔥" },
    ],
  },
  scope2: {
    title: "Scope 2 (Electricity)",
    fields: [{ id: "electricity", label: "Electricity (kWh)", icon: "⚡" }],
  },
  scope3: {
    title: "Scope 3 (Indirect)",
    fields: [
      { id: "transport", label: "Transport (km)", icon: "🚌", hasDropdown: true },
      { id: "purchases", label: "Purchases (₹)", icon: "🛒" },
      { id: "waste", label: "Waste (kg)", icon: "🗑️" },
      { id: "logistics", label: "Logistics (km)", icon: "🚚" },
    ],
  },
};

const createDefaultData = () => {
  const obj: any = {};
  Object.keys(scopeConfig).forEach((scope) => {
    obj[scope] = {};
    scopeConfig[scope as keyof typeof scopeConfig].fields.forEach((f: any) => {
      obj[scope][f.id] = {
        value: "",
        unit: "monthly" as TimeUnit,
        type: f.hasDropdown ? "bus" : undefined,
      };
    });
  });
  return obj;
};

const Calculator = () => {
  const [selectedMode, setSelectedMode] = useState<null | "individual">(null);
  const [data, setData] = useState<any>(createDefaultData());
  const [result, setResult] = useState<any>(null);

  // 👉 FIRST SCREEN (Selection UI)
  if (!selectedMode) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center mb-10 absolute top-16">
        <h1 className="text-4xl font-extrabold text-white">
          Carbon Emission Calculator
        </h1>
        <p className="text-gray-400 mt-2">
          Choose your calculator type to get started
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full p-6">
        
        {/* Individual */}
        <div
          onClick={() => setSelectedMode("individual")}
          className="cursor-pointer p-10 rounded-3xl border border-green-500 bg-gradient-to-br from-gray-900 to-gray-800 hover:scale-105 hover:border-green-400 transition duration-300 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Individual Calculator
          </h2>
          <p className="text-gray-400 mb-6">
            Track and reduce your personal carbon footprint with smart insights.
          </p>

          <button className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-400 transition">
            Start Calculation
          </button>
        </div>

        {/* Industrial */}
        <div
          onClick={() =>
            window.open("https://climescore.com/clientlogin", "_blank")
          }
          className="cursor-pointer p-10 rounded-3xl border border-green-500 bg-gradient-to-br from-gray-900 to-gray-800 hover:scale-105 hover:border-green-400 transition duration-300 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Industrial Calculator
          </h2>
          <p className="text-gray-400 mb-6">
            Advanced emission tracking for businesses, factories, and enterprises.
          </p>

          <button className="px-6 py-3 rounded-xl bg-transparent border border-green-500 text-green-400 font-semibold hover:bg-green-500 hover:text-black transition">
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

  // 👉 YOUR EXISTING CALCULATOR BELOW (UNCHANGED)

  const PRICE = { petrol: 105, diesel: 93 };
  const EF = {
    petrol: 2.31,
    diesel: 2.68,
    lpg: 2.98,
    electricity: 0.82,
    purchases: 0.0005,
    waste: 0.45,
    logistics: 0.2,
  };

  const TRANSPORT_EF: any = {
    bus: 0.08,
    train: 0.05,
    car: 0.18,
    flight: 0.25,
  };

  const LPG_KG = 14.2;

  const handleInputChange = (scope: string, field: string, value: string) => {
    setData({
      ...data,
      [scope]: {
        ...data[scope],
        [field]: { ...data[scope][field], value },
      },
    });
  };

  const handleUnitChange = (scope: string, field: string, unit: TimeUnit) => {
    setData({
      ...data,
      [scope]: {
        ...data[scope],
        [field]: { ...data[scope][field], unit },
      },
    });
  };

  const handleTransportType = (scope: string, field: string, type: TransportType) => {
    setData({
      ...data,
      [scope]: {
        ...data[scope],
        [field]: { ...data[scope][field], type },
      },
    });
  };

  const normalizeToMonthly = (val: number, unit: TimeUnit) => {
    if (unit === "daily") return val * 30;
    if (unit === "weekly") return val * 4.34;
    if (unit === "yearly") return val / 12;
    return val;
  };

  const calculateScope = (scopeData: any) => {
    let total = 0;
    const breakdown: any = {};

    Object.keys(scopeData).forEach((field) => {
      const entry = scopeData[field];
      const val = normalizeToMonthly(Number(entry.value || 0), entry.unit);
      let emission = 0;

      switch (field) {
        case "petrol":
          emission = (val / PRICE.petrol) * EF.petrol;
          break;
        case "diesel":
          emission = (val / PRICE.diesel) * EF.diesel;
          break;
        case "lpg":
          emission = val * LPG_KG * EF.lpg;
          break;
        case "transport":
          emission = val * TRANSPORT_EF[entry.type || "bus"];
          break;
        default:
          emission = val * (EF as any)[field];
      }

      breakdown[field] = emission;
      total += emission;
    });

    return { total, breakdown };
  };

  const calculate = () => {
    const scopeTotals: any = {};
    let grandTotal = 0;

    Object.keys(scopeConfig).forEach((scope) => {
      const { total } = calculateScope(data[scope]);
      scopeTotals[scope] = total;
      grandTotal += total;
    });

    setResult({
      scopes: scopeTotals,
      total: grandTotal.toFixed(2),
    });
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="cursor-pointer p-10 rounded-3xl border border-green-500 bg-gradient-to-br from-gray-900 to-gray-800 hover:scale-105 hover:border-green-400 transition duration-300 shadow-lg">
          <h1 className="text-3xl font-bold">CO₂ Emission Calculator</h1>
        </div>

        <div className="p-8 space-y-10">
          {Object.entries(scopeConfig).map(([scopeKey, scope]: any) => (
            <div key={scopeKey} className="border rounded-2xl p-6 bg-gray-50 shadow-sm">
              <h2 className="text-lg font-bold mb-4 text-gray-800">{scope.title}</h2>

              {scope.fields.map((item: any) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-4 p-3 border-b">
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-700">{item.icon} {item.label}</label>
                    <input
                      type="number"
                      placeholder="Enter value"
                      className="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-white text-gray-900"
                      onChange={(e) => handleInputChange(scopeKey, item.id, e.target.value)}
                    />
                  </div>

                  {item.hasDropdown && (
                    <select
                      className="p-3 rounded-xl border bg-white text-black"
                      onChange={(e) => handleTransportType(scopeKey, item.id, e.target.value as TransportType)}
                    >
                      <option value="bus">Bus</option>
                      <option value="train">Train</option>
                      <option value="car">Car</option>
                      <option value="flight">Flight</option>
                    </select>
                  )}

                  <div className="flex gap-1 bg-gray-200 p-1 rounded-xl">
                    {["daily", "weekly", "monthly", "yearly"].map((u) => (
                      <button
                        key={u}
                        onClick={() => handleUnitChange(scopeKey, item.id, u as TimeUnit)}
                        className={`px-2 py-1 text-xs rounded ${
                          data[scopeKey][item.id].unit === u ? "bg-white text-blue-600 font-bold" : "text-gray-500"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <button onClick={calculate}  className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-400 transition">
            Calculate Emissions
          </button>

          {result && (
            <div className="space-y-10 text-black">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(result.total).map(([k, v]: any) => (
                  <div key={k} className="bg-white rounded-2xl p-6 shadow-lg border">
                    <p className="text-sm uppercase text-gray-500">{k}</p>
                    <p className="text-3xl font-extrabold">{v} kg</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={result.chartData} dataKey="value" outerRadius={100} label>
                      {result.chartData.map((entry: any, index: number) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* AI Suggestions */}
              <div className="bg-green-100 p-6 rounded-2xl text-black">
                <h3 className="font-bold mb-3 text-black">AI Insights</h3>
                {result.suggestions.map((s: string, i: number) => (
                  <p key={i}>• {s}</p>
                ))}
              </div>

              {/* Sub breakdown */}
          {/* Scope-wise breakdown (IMPROVED UI) */}
<div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    Scope-wise Emissions
  </h3>

  {Object.entries(result.breakdowns).map(([scope, fields]: any) => (
    <div
      key={scope}
      className="mb-5 last:mb-0 p-4 rounded-xl bg-gray-50 border border-gray-100"
    >
      {/* Scope Title */}
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold text-gray-800">
          {scopeConfig[scope as keyof typeof scopeConfig].title}
        </p>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
          Emission
        </span>
      </div>

      {/* Fields */}
      <div className="space-y-2">
        {Object.entries(fields).map(([f, val]: any) => (
          <div
            key={f}
            className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-1 last:border-none"
          >
            <span className="capitalize">{f}</span>
            <span className="font-medium text-gray-800">
              {val.toFixed(2)} kg
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-700">
          Total
        </p>
        <p className="text-lg font-bold text-blue-600">
          {result.scopes[scope].toFixed(2)} kg
        </p>
      </div>
    </div>
  ))}
</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;