import React, { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mapping for back-calculation logic
const CONVERSION_RATES: any = {
  "Electricity": 8, "Petrol": 105, "Diesel": 93, "LPG": 950,
  "Vegetables": 50, "Chicken": 250, "Meat": 450, "Milk": 60, "Fruits": 100
};

// Fixed Primary Fields (Old Design)
const FIXED_FIELDS = [
  { id: "fixed_elec", name: "Electricity Consumption", ef: 0.00082, unit: "kWh", group: "Scope 2", icon: "⚡", isSpend: true },
  { id: "fixed_petrol", name: "Petrol", ef: 0.0022, unit: "Litres", group: "Scope 1", icon: "⛽", isSpend: true },
  { id: "fixed_diesel", name: "Diesel", ef: 0.0025, unit: "Litres", group: "Scope 1", icon: "🚜", isSpend: true },
  { id: "fixed_lpg", name: "LPG (kg)", ef: 0.00298, unit: "kg", group: "Scope 1", icon: "🔥", isSpend: true },
];

// JSON Library for Scope 3 / Custom Items
 const MASTER_LIBRARY = [
  {
    "id": "660d76d5712bd75ea5d72049",
    "name": "Public Transport (Bus)",
    "ef": 1.5161e-05,
    "unit": "tCO2/pax-km",
    "group": "Scope 3",
    "cat": "Employee Commuting"
  },
  {
    "id": "660d77e0712bd75ea5d72054",
    "name": "Public Transport (Non-Suburban Rail)",
    "ef": 7.837e-06,
    "unit": "tCO2 / Passenger-km",
    "group": "Scope 3",
    "cat": "Employee Commuting"
  },
  {
    "id": "660d77ef712bd75ea5d72056",
    "name": "Public Transport (Suburban Rail)",
    "ef": 7.976e-06,
    "unit": "tCO2 / Passenger-km",
    "group": "Scope 3",
    "cat": "Employee Commuting"
  },
  {
    "id": "660d78b7712bd75ea5d72058",
    "name": "Chicken",
    "ef": 0.0069,
    "unit": "tCO2 / kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "660d78c8712bd75ea5d7205a",
    "name": "Egg",
    "ef": 0.0016,
    "unit": "tCO2 / kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "660d78d7712bd75ea5d7205c",
    "name": "Fish",
    "ef": 0.0032,
    "unit": "tCO2 / kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "660d7ac3712bd75ea5d7206c",
    "name": "Car (Large)",
    "ef": 0.0002,
    "unit": "tCo2e/ km",
    "group": "Scope 3",
    "cat": "Business Travel"
  },
  {
    "id": "66152cbf712bd75ea5d7236a",
    "name": "Air Travel (economy)",
    "ef": 0.00013464,
    "unit": "tCO2e/passenger.km",
    "group": "Scope 3",
    "cat": "Business Travel"
  },
  {
    "id": "66152d04712bd75ea5d7236c",
    "name": "Air Travel",
    "ef": 0.00021542,
    "unit": "tCO2e/passenger.km",
    "group": "Scope 3",
    "cat": "Business Travel"
  },
  {
    "id": "66152d19712bd75ea5d7236e",
    "name": "Air Travel ",
    "ef": 0.00039044,
    "unit": "tCO2e/passenger.km",
    "group": "Scope 3",
    "cat": "Business Travel"
  },
  {
    "id": "66152d31712bd75ea5d72370",
    "name": "Air Travel",
    "ef": 0.00053854,
    "unit": "tCO2e/passenger.km",
    "group": "Scope 3",
    "cat": "Business Travel"
  },
  {
    "id": "66155996712bd75ea5d723a2",
    "name": "cheese",
    "ef": 0.00279,
    "unit": "tCo2e",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "66155aa2712bd75ea5d723a6",
    "name": "Tortilla wrap",
    "ef": 0.00079,
    "unit": "tCo2e/kg",
    "group": "Scope 3",
    "cat": ""
  },
  {
    "id": "66155b05712bd75ea5d723a8",
    "name": "Jalapeno Peppers",
    "ef": 0.0005,
    "unit": "tCo2e/kg",
    "group": "Scope 3",
    "cat": ""
  },
  {
    "id": "66155b70712bd75ea5d723aa",
    "name": "Bell Peppers",
    "ef": 0.00165,
    "unit": "tCo2e/kg",
    "group": "Scope 3",
    "cat": ""
  },
  {
    "id": "66155bbe712bd75ea5d723ac",
    "name": "Onions",
    "ef": 0.00026,
    "unit": "tCo2e/kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "66155c48712bd75ea5d723ae",
    "name": "Greenpeas",
    "ef": 0.00053,
    "unit": "tCo2e/kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "66155d40712bd75ea5d723b0",
    "name": "Pesto",
    "ef": 0.00359,
    "unit": "tCo2e/kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "66156027712bd75ea5d723b2",
    "name": "Tomatoes",
    "ef": 0.0032,
    "unit": "tCo2e/kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "66156156712bd75ea5d723b4",
    "name": "Mozzarella Cheese ",
    "ef": 0.0182,
    "unit": "tCo2e/kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "661563b0712bd75ea5d723b6",
    "name": "Multigrain Ciabatta Rolls",
    "ef": 8.9e-05,
    "unit": "tCo2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "66156496712bd75ea5d723b8",
    "name": "Multigrain Bread",
    "ef": 0.001244,
    "unit": "tCo2e/ loaf ",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "66156681712bd75ea5d723ba",
    "name": "Brownie",
    "ef": 0.00263,
    "unit": "tCo2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "66166156712bd75ea5d7241f",
    "name": "Waste (organic mixed)",
    "ef": 0.00013,
    "unit": "tCO2e/kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6616654b712bd75ea5d72426",
    "name": "Lemon Tea Cake",
    "ef": 0.0014,
    "unit": "tCO2e per cake",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "66166564712bd75ea5d72428",
    "name": "Ragi Banana Walnut Tea Cake",
    "ef": 0.0018,
    "unit": "tCO2e per cake",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "661667c0712bd75ea5d72431",
    "name": "Taxi (CNG)",
    "ef": 0.00016,
    "unit": "tCo2e/ km",
    "group": "Scope 3",
    "cat": "Employee Commuting"
  },
  {
    "id": "661669a8712bd75ea5d72437",
    "name": "Travel (Metro)",
    "ef": 1.1e-07,
    "unit": "tCO2 / Passenger-km",
    "group": "Scope 3",
    "cat": "Employee Commuting"
  },
  {
    "id": "6618e568d0a3c9b720d09021",
    "name": "Pasta",
    "ef": 0.00088,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618e623d0a3c9b720d09023",
    "name": "Sandwich",
    "ef": 0.000757,
    "unit": "tco2e/ piece",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618e6c5d0a3c9b720d09025",
    "name": "Chicken Roll",
    "ef": 0.00155,
    "unit": "tco2e/ piece",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618e750d0a3c9b720d09027",
    "name": "Mushroom Risotto",
    "ef": 0.00068,
    "unit": "tco2e/ plate",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618e803d0a3c9b720d09029",
    "name": "Som Tum",
    "ef": 0.00085,
    "unit": "tco2e/ plate",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618e9b7d0a3c9b720d0902b",
    "name": "Poh Pia Je",
    "ef": 0.0005,
    "unit": "tco2e/ plate",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618e9ced0a3c9b720d0902d",
    "name": "Thai Curry Veg Green",
    "ef": 0.0008,
    "unit": "tco2e/ plate",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618ea54d0a3c9b720d0902f",
    "name": "Dal Makhni",
    "ef": 0.0015,
    "unit": "tco2e/ plate",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618ea71d0a3c9b720d09031",
    "name": "Classic Caesar Salad",
    "ef": 0.012,
    "unit": "tco2e/ plate",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618ea89d0a3c9b720d09033",
    "name": "Steamed Rice",
    "ef": 0.0025,
    "unit": "tco2e/ plate",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f3a7d0a3c9b720d09035",
    "name": "Quinoa Salad",
    "ef": 0.0025,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f3b6d0a3c9b720d09037",
    "name": "Crispy Shiitake",
    "ef": 0.0035,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f3ccd0a3c9b720d09039",
    "name": "Poke Bowl",
    "ef": 0.0065,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f3e8d0a3c9b720d0903b",
    "name": "Pad Thai Chicken",
    "ef": 0.009,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f445d0a3c9b720d0903d",
    "name": "Pad Thai Chicken",
    "ef": 0.0065,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f455d0a3c9b720d0903f",
    "name": "Gai Pad Prik",
    "ef": 0.007,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f46fd0a3c9b720d09041",
    "name": "Pepperoni Pizza",
    "ef": 0.012,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f486d0a3c9b720d09043",
    "name": "Mushroom Gilawat",
    "ef": 0.0015,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f4a3d0a3c9b720d09045",
    "name": "Veg Panini",
    "ef": 0.002,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f4b1d0a3c9b720d09047",
    "name": "Thai Green Chicken",
    "ef": 0.008,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f4bdd0a3c9b720d09049",
    "name": "Pad Thai Veg",
    "ef": 0.0045,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f4ccd0a3c9b720d0904b",
    "name": "Ranjitshahi Paneer",
    "ef": 0.007,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f4d9d0a3c9b720d0904d",
    "name": "Khow Suey Veg",
    "ef": 0.006,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "6618f4e9d0a3c9b720d0904f",
    "name": "Khow Suey Chicken",
    "ef": 0.009,
    "unit": "tco2e/ serving",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "661ceb18d0a3c9b720d0908c",
    "name": "Air Travel (Average Passenger)",
    "ef": 0.0001758,
    "unit": "tCO2 / Passenger-km",
    "group": "Scope 3",
    "cat": ""
  },
  {
    "id": "6666f1bf366d42e383f183dd",
    "name": "Aluminum Bottle",
    "ef": 0.000699,
    "unit": "tCO2e/USD, purchaser price",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6666f2de366d42e383f183e2",
    "name": "Medium Chain Triglyceride( Ultracide - 64)",
    "ef": 0.000579,
    "unit": "tCO2e/USD, purchaser price",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6666ff87366d42e383f183e6",
    "name": "Freight Transport (Tempo)",
    "ef": 0.000307,
    "unit": "tCO2 /km",
    "group": "Scope 3",
    "cat": "Upstream Transportation and Distribution"
  },
  {
    "id": "66699751366d42e383f18436",
    "name": "HDPE Drums",
    "ef": 0.31,
    "unit": "tCO2e/tons",
    "group": "Scope 3",
    "cat": "Waste Generated in Operations"
  },
  {
    "id": "66699852366d42e383f1843a",
    "name": "HDPE Drums (Waste)",
    "ef": 0.0089,
    "unit": "tCO2e/tons",
    "group": "Scope 3",
    "cat": "Waste Generated in Operations"
  },
  {
    "id": "666998cf366d42e383f18442",
    "name": "Corrugated boxes",
    "ef": 0.001164,
    "unit": "tCo2e/ tonnes",
    "group": "Scope 3",
    "cat": "Waste Generated in Operations"
  },
  {
    "id": "66b1e034be79ba40e173d7bd",
    "name": "Water motor",
    "ef": 2.875,
    "unit": "(tCO2e/Item)",
    "group": "Scope 3",
    "cat": "Capital Goods"
  },
  {
    "id": "66b1e0a0be79ba40e173d7c2",
    "name": "Concealed fittings diverter ",
    "ef": 0.0846,
    "unit": "(tCO2e/Item)",
    "group": "Scope 3",
    "cat": "Capital Goods"
  },
  {
    "id": "66b5fbcfbe79ba40e173d945",
    "name": "Ultracide ",
    "ef": 0.00057,
    "unit": "tCO2e/USD, purchaser price",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "66b5ff01be79ba40e173d948",
    "name": "Poly Can ",
    "ef": 0.00064,
    "unit": "tCO2e/USD, purchaser price",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "66b600afbe79ba40e173d94a",
    "name": "TBHQ",
    "ef": 0.00057,
    "unit": "tCO2e/USD, purchaser price",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "66b60157be79ba40e173d94c",
    "name": "2,2- Diphenyl- 1- Picrylhydrazyl, 98%",
    "ef": 0.00063,
    "unit": "tCO2e/USD, purchaser price",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "66b602efbe79ba40e173d94e",
    "name": "Sunflower Oil",
    "ef": 0.00038,
    "unit": "tCO2e/USD, purchaser price",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "66b60305be79ba40e173d950",
    "name": "Rice Bran Oil ",
    "ef": 0.00038,
    "unit": "tCO2e/USD, purchaser price",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "66b60726be79ba40e173d952",
    "name": "Stainless Steel Soap Dye",
    "ef": 0.001849,
    "unit": "tCO2e/USD, purchaser price",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "66b732a0be79ba40e173d955",
    "name": "Mug And Round Badges ",
    "ef": 0.00074,
    "unit": "tCO2e/USD, purchaser price",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "66b734bbbe79ba40e173d957",
    "name": "Aluminium Partition ",
    "ef": 0.00025,
    "unit": "tCO2e/USD, purchaser price",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "66c46c5dbe79ba40e173dac5",
    "name": "Water Consumption",
    "ef": 1.06e-05,
    "unit": "tCO2e/ Litres",
    "group": "Scope 3",
    "cat": "Consumption"
  },
  {
    "id": "674daf69787f8982cdfcc223",
    "name": "Mutton",
    "ef": 0.0392,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "674db04b787f8982cdfcc226",
    "name": "Pork",
    "ef": 0.006,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "67581ffa787f8982cdfcc551",
    "name": "Plastic Waste",
    "ef": 0.0006,
    "unit": "tCO2e/Kg",
    "group": "Scope 3",
    "cat": "Waste Generated in Operations"
  },
  {
    "id": "676cf892787f8982cdfcc99f",
    "name": "Email",
    "ef": 3e-07,
    "unit": "tco2e ",
    "group": "Scope 3",
    "cat": "Marketing"
  },
  {
    "id": "676cfd24787f8982cdfcc9a1",
    "name": "Social Media Ad",
    "ef": 1e-07,
    "unit": "tco2e ",
    "group": "Scope 3",
    "cat": "Marketing"
  },
  {
    "id": "676cfd42787f8982cdfcc9a3",
    "name": "Whatsapp App",
    "ef": 4e-08,
    "unit": "tco2e ",
    "group": "Scope 3",
    "cat": "Marketing"
  },
  {
    "id": "676d1f24787f8982cdfcc9b4",
    "name": "Washing",
    "ef": 0.0054,
    "unit": "tco2e/ load",
    "group": "Scope 3",
    "cat": "Fuel- and Energy-Related Activities"
  },
  {
    "id": "676d1f4b787f8982cdfcc9b6",
    "name": "Drying",
    "ef": 0.0072,
    "unit": "tco2e/ load",
    "group": "Scope 3",
    "cat": "Fuel- and Energy-Related Activities"
  },
  {
    "id": "676d1f65787f8982cdfcc9b9",
    "name": "Ironing",
    "ef": 0.0027,
    "unit": "tco2e/ load",
    "group": "Scope 3",
    "cat": "Fuel- and Energy-Related Activities"
  },
  {
    "id": "676d219d787f8982cdfcc9d1",
    "name": "Truck ",
    "ef": 0.0006,
    "unit": "tCo2e/ km",
    "group": "Scope 3",
    "cat": "Upstream Transportation and Distribution"
  },
  {
    "id": "676e5a3b787f8982cdfcca39",
    "name": "Milk Product",
    "ef": 0.0009,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "676e5a5c787f8982cdfcca3b",
    "name": "Dairy Product",
    "ef": 0.0015,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "676e5ab8787f8982cdfcca3e",
    "name": "Oil & Fats (ltr)",
    "ef": 0.002,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "676e5acd787f8982cdfcca40",
    "name": "Vegetables",
    "ef": 0.0003,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "676e5ae9787f8982cdfcca42",
    "name": "Seafood",
    "ef": 0.0018,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "676e5b00787f8982cdfcca44",
    "name": "Fruits",
    "ef": 0.0003,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "676e5b1e787f8982cdfcca46",
    "name": "Meat",
    "ef": 0.0004,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "676e5b4d787f8982cdfcca4a",
    "name": "Bakery",
    "ef": 0.0015,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "676e5b8f787f8982cdfcca4e",
    "name": "Ready to Cook Products",
    "ef": 0.0012,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "676e5bc6787f8982cdfcca50",
    "name": "Grocery Product (Kg)",
    "ef": 0.0002,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "676e5bec787f8982cdfcca52",
    "name": "Spices",
    "ef": 0.0005,
    "unit": "tco2e/ kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "676e758c787f8982cdfcca58",
    "name": "Tin- Can & Bottle Products ",
    "ef": 0.001,
    "unit": "tco2e/ NOS",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "676e75c0787f8982cdfcca5a",
    "name": "Gas (kg) ",
    "ef": 0.003,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "676e75e8787f8982cdfcca5c",
    "name": "AC & REFRIGERATOR (kg)",
    "ef": 0.0025,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "676e7611787f8982cdfcca5e",
    "name": "ELECTRICALS (NOS)",
    "ef": 0.001,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "676e76a3787f8982cdfcca60",
    "name": "Painting ",
    "ef": 0.001,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "676e76e1787f8982cdfcca63",
    "name": "PLUMBING (NOS)",
    "ef": 0.001,
    "unit": "tco2e/ Unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "676e7709787f8982cdfcca65",
    "name": "BUILDING",
    "ef": 0.01,
    "unit": "tco2e/ Unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "676e772c787f8982cdfcca67",
    "name": "Computer",
    "ef": 0.0012,
    "unit": "tco2e/ Unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "676e774c787f8982cdfcca69",
    "name": "Tools",
    "ef": 0.001,
    "unit": "tco2e/ Unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "676e776d787f8982cdfcca6b",
    "name": "Carpentry",
    "ef": 0.0015,
    "unit": "tco2e/ Unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754a0a787f8982cdfccc98",
    "name": "Hardware",
    "ef": 0.001,
    "unit": "tco2e/ Unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754a20787f8982cdfccc9a",
    "name": "Chemical",
    "ef": 0.0025,
    "unit": "tco2e/ L",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754a3b787f8982cdfccc9c",
    "name": "Electronics",
    "ef": 0.001,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754a57787f8982cdfccc9e",
    "name": "Clean Supply",
    "ef": 0.001,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754a5d787f8982cdfccca0",
    "name": "Guest Supply",
    "ef": 0.001,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754a6d787f8982cdfccca2",
    "name": "Garden Supply",
    "ef": 0.0005,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754a90787f8982cdfccca4",
    "name": "Uniform",
    "ef": 0.001,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754aa0787f8982cdfccca6",
    "name": "Linen",
    "ef": 0.0012,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754ad4787f8982cdfccca8",
    "name": "Crockery",
    "ef": 0.001,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754ae6787f8982cdfcccaa",
    "name": "Printing Stationary",
    "ef": 0.001,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754afa787f8982cdfcccac",
    "name": "Spa Consumables",
    "ef": 0.0015,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754b0a787f8982cdfcccae",
    "name": "Personal Care",
    "ef": 0.001,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754b1c787f8982cdfcccb0",
    "name": "Gift Item",
    "ef": 0.001,
    "unit": "tco2e/unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67754b54787f8982cdfcccb3",
    "name": "Brass Items",
    "ef": 0.003,
    "unit": "tCo2e/ Unit",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "67a075cdb6802b0f907ef54a",
    "name": "Travel (Medium Car)",
    "ef": 0.00016,
    "unit": "tCo2e/ km",
    "group": "Scope 3",
    "cat": "Upstream Transportation and Distribution"
  },
  {
    "id": "680351b8b6802b0f907f09fd",
    "name": "Rice",
    "ef": 0.0035,
    "unit": "t CO₂e/kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680351cdb6802b0f907f09ff",
    "name": "Wheat Flour",
    "ef": 0.0008,
    "unit": "t CO₂e/kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680351dfb6802b0f907f0a01",
    "name": "Pulses",
    "ef": 0.0011,
    "unit": "t CO₂e/kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680351eab6802b0f907f0a03",
    "name": "Ghee",
    "ef": 0.0025,
    "unit": "t CO₂e/kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035204b6802b0f907f0a05",
    "name": "Salt",
    "ef": 4e-05,
    "unit": "t CO₂e/kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035262b6802b0f907f0a07",
    "name": "Spices",
    "ef": 0.00039,
    "unit": "t CO₂e/kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803527ab6802b0f907f0a09",
    "name": "Toilet Roll",
    "ef": 0.0013,
    "unit": "t CO₂e/roll",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803528db6802b0f907f0a0b",
    "name": "Kitchen Roll",
    "ef": 6e-05,
    "unit": "t CO₂e/roll",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680352a6b6802b0f907f0a0d",
    "name": "Sugar",
    "ef": 0.0008,
    "unit": "t CO₂e/kg ",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680352b8b6802b0f907f0a0f",
    "name": "Paneer",
    "ef": 0.0078,
    "unit": "t CO₂e/kg ",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680352e3b6802b0f907f0a11",
    "name": "Mustard Oil",
    "ef": 0.002,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680352f2b6802b0f907f0a13",
    "name": "Refined Oil",
    "ef": 0.0038,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803532eb6802b0f907f0a15",
    "name": "Washing Powder",
    "ef": 0.00076,
    "unit": "t CO₂e/kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803536cb6802b0f907f0a17",
    "name": "Olive Oil",
    "ef": 0.002,
    "unit": "t CO₂e/l ",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680353abb6802b0f907f0a19",
    "name": "Dry Fruits",
    "ef": 0.0035,
    "unit": "t CO₂e/kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803589ab6802b0f907f0a1c",
    "name": "Potatoes",
    "ef": 0.00029,
    "unit": "t CO₂e/kg",
    "group": "Scope 3",
    "cat": "Food"
  },
  {
    "id": "680358f9b6802b0f907f0a1e",
    "name": "Plywood (Softwood)",
    "ef": 0.00061,
    "unit": "t CO₂e/kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035924b6802b0f907f0a20",
    "name": "Hardware Items (e.g., bolts, screws)",
    "ef": 0.00033,
    "unit": "t CO₂e/ Nos",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035946b6802b0f907f0a22",
    "name": "Solar PV System (10 kVA)",
    "ef": 8.9,
    "unit": "t CO₂e/ system",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035969b6802b0f907f0a24",
    "name": "Cement (Portland)",
    "ef": 0.006,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803596fb6802b0f907f0a26",
    "name": "Cement (Portland)",
    "ef": 0.006,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035993b6802b0f907f0a28",
    "name": "TMT Bar (Steel Rebar)",
    "ef": 0.0019,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035d62b6802b0f907f0a30",
    "name": "Tea",
    "ef": 0.032,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035d78b6802b0f907f0a37",
    "name": "Bread",
    "ef": 0.00088,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035d8ab6802b0f907f0a39",
    "name": "Jam",
    "ef": 0.00045,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035d9fb6802b0f907f0a3b",
    "name": "Ketchup",
    "ef": 0.0016,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035db1b6802b0f907f0a3d",
    "name": "Butter",
    "ef": 0.009,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035dc1b6802b0f907f0a3f",
    "name": "Cheese",
    "ef": 0.0135,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035dd2b6802b0f907f0a41",
    "name": "Cornflakes",
    "ef": 0.00063,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035deab6802b0f907f0a43",
    "name": "Biscuits",
    "ef": 0.0015,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035e03b6802b0f907f0a45",
    "name": "Pickle",
    "ef": 0.0011,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035e16b6802b0f907f0a47",
    "name": "Oats",
    "ef": 0.00085,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035e2eb6802b0f907f0a49",
    "name": "Vermicelli",
    "ef": 0.00065,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035e3ab6802b0f907f0a4b",
    "name": "Poha",
    "ef": 0.0006,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035e58b6802b0f907f0a4d",
    "name": "Coffee",
    "ef": 0.045,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035f58b6802b0f907f0a50",
    "name": "Soyabean Oil",
    "ef": 0.0035,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035f6fb6802b0f907f0a52",
    "name": "Soya Nuggets",
    "ef": 0.0012,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035f83b6802b0f907f0a54",
    "name": "Vinegar",
    "ef": 0.0001,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035fa3b6802b0f907f0a56",
    "name": "Maida (Refined Flour)",
    "ef": 0.00085,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035fb5b6802b0f907f0a58",
    "name": "Pasta/Macaroni",
    "ef": 0.0011,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035fd1b6802b0f907f0a5a",
    "name": "Noodles",
    "ef": 0.0013,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035fe7b6802b0f907f0a5c",
    "name": "Mayonnaise",
    "ef": 0.0018,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68035ff6b6802b0f907f0a5e",
    "name": "Honey",
    "ef": 0.0005,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803600ab6802b0f907f0a60",
    "name": "Papads",
    "ef": 0.0009,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803601eb6802b0f907f0a62",
    "name": "Squash/Syrups",
    "ef": 0.0004,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036034b6802b0f907f0a64",
    "name": "Coconut Milk",
    "ef": 0.0009,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036043b6802b0f907f0a66",
    "name": "Custard Powder",
    "ef": 0.0006,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803606ab6802b0f907f0a68",
    "name": "Food Color",
    "ef": 0.0002,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036087b6802b0f907f0a6a",
    "name": "Baking Powder",
    "ef": 0.0001,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803608fb6802b0f907f0a6c",
    "name": "Besan (Gram Flour)",
    "ef": 0.00095,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680360abb6802b0f907f0a6e",
    "name": "Atta (Whole Wheat Flour)",
    "ef": 0.0008,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680360bfb6802b0f907f0a70",
    "name": "Suwa (Aniseed)",
    "ef": 0.0004,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036109b6802b0f907f0a73",
    "name": "Bura (Castor Sugar)",
    "ef": 0.00085,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803611fb6802b0f907f0a75",
    "name": "Cold Drinks (Aerated Water)",
    "ef": 0.00045,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036130b6802b0f907f0a77",
    "name": "Juices (Packaged)",
    "ef": 0.0005,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803614ab6802b0f907f0a79",
    "name": "Mineral Water",
    "ef": 5e-05,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803615eb6802b0f907f0a7b",
    "name": "Dalia (Broken Wheat)",
    "ef": 0.00075,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803616fb6802b0f907f0a7d",
    "name": "Basmati Rice",
    "ef": 0.0042,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036183b6802b0f907f0a7f",
    "name": "Roasted Chana",
    "ef": 0.0009,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036199b6802b0f907f0a81",
    "name": "Suji (Semolina)",
    "ef": 0.00085,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680361adb6802b0f907f0a83",
    "name": "Chura (Flattened Rice)",
    "ef": 0.0006,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680361bfb6802b0f907f0a85",
    "name": "Corn (Kernel)",
    "ef": 0.00035,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680361d7b6802b0f907f0a87",
    "name": "Muesli",
    "ef": 0.00095,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680361edb6802b0f907f0a89",
    "name": "Yeast",
    "ef": 5e-05,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680361fbb6802b0f907f0a8b",
    "name": "Cornflour",
    "ef": 0.00055,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036214b6802b0f907f0a8d",
    "name": "Papad Khar",
    "ef": 0.0001,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036222b6802b0f907f0a8f",
    "name": "Cereal Health Drinks",
    "ef": 0.0008,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803622cb6802b0f907f0a91",
    "name": "Tamarind",
    "ef": 0.00025,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036240b6802b0f907f0a93",
    "name": "Liquid Glucose",
    "ef": 0.0006,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036254b6802b0f907f0a95",
    "name": "Bakery Items (General)",
    "ef": 0.0015,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036262b6802b0f907f0a97",
    "name": "Rusk",
    "ef": 0.0012,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803626cb6802b0f907f0a99",
    "name": "Wafers/Chips",
    "ef": 0.0018,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036284b6802b0f907f0a9b",
    "name": "Vermicelli (Roasted)",
    "ef": 0.0007,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036293b6802b0f907f0a9d",
    "name": "Chocolate",
    "ef": 0.0125,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680362a9b6802b0f907f0a9f",
    "name": "Sugar Cube",
    "ef": 0.0009,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680362bab6802b0f907f0aa1",
    "name": "Mishri",
    "ef": 0.00085,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680362cab6802b0f907f0aa3",
    "name": "Molasses/Jaggery",
    "ef": 0.00055,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680362dbb6802b0f907f0aa5",
    "name": "Tea Leaf",
    "ef": 0.021,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680362ebb6802b0f907f0aa7",
    "name": "Tea Bag",
    "ef": 0.023,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680362fbb6802b0f907f0aa9",
    "name": "Coffee Beans",
    "ef": 0.045,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803630cb6802b0f907f0aab",
    "name": "Coffee Powder",
    "ef": 0.048,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036323b6802b0f907f0aad",
    "name": "Milk (Pasteurized)",
    "ef": 0.0015,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036336b6802b0f907f0aaf",
    "name": "Curd/Yogurt",
    "ef": 0.0018,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803634ab6802b0f907f0ab1",
    "name": "Ice Cream",
    "ef": 0.0025,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036357b6802b0f907f0ab3",
    "name": "Khoa/Mawa",
    "ef": 0.0065,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036369b6802b0f907f0ab5",
    "name": "Milk Powder",
    "ef": 0.0085,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803637db6802b0f907f0ab7",
    "name": "Dairy Whitener",
    "ef": 0.0078,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036391b6802b0f907f0ab9",
    "name": "Lassi/Buttermilk",
    "ef": 0.0012,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680363a0b6802b0f907f0abb",
    "name": "Cream",
    "ef": 0.007,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680363b6b6802b0f907f0abd",
    "name": "Eggs",
    "ef": 0.0016,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680363ccb6802b0f907f0abf",
    "name": "Chicken Meat",
    "ef": 0.0069,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680363dbb6802b0f907f0ac1",
    "name": "Mutton Meat",
    "ef": 0.039,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680363ebb6802b0f907f0ac3",
    "name": "Fish/Seafood",
    "ef": 0.0055,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036401b6802b0f907f0ac5",
    "name": "Bacon/Pork meat",
    "ef": 0.012,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036410b6802b0f907f0ac7",
    "name": "Sausages",
    "ef": 0.01,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036421b6802b0f907f0ac9",
    "name": "Salami",
    "ef": 0.011,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036437b6802b0f907f0acb",
    "name": "Cold Cuts (Meat)",
    "ef": 0.0105,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803644bb6802b0f907f0acd",
    "name": "Potatoes",
    "ef": 0.00029,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036459b6802b0f907f0acf",
    "name": "Onions",
    "ef": 0.00025,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803646ab6802b0f907f0ad1",
    "name": "Tomatoes",
    "ef": 0.0011,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803647ab6802b0f907f0ad3",
    "name": "Ginger",
    "ef": 0.00045,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803648bb6802b0f907f0ad5",
    "name": "Garlic",
    "ef": 0.0005,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680364a5b6802b0f907f0ad7",
    "name": "Green Chillies",
    "ef": 0.00065,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680364b6b6802b0f907f0ad9",
    "name": "Vegetables (Misc.)",
    "ef": 0.0005,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680364c6b6802b0f907f0adb",
    "name": "Fruits (Misc.)",
    "ef": 0.00045,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680364d9b6802b0f907f0add",
    "name": "Lemon",
    "ef": 0.00035,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680364ebb6802b0f907f0adf",
    "name": "Mushrooms",
    "ef": 0.0013,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680364fab6802b0f907f0ae1",
    "name": "Fresh Herbs (Coriander, Mint)",
    "ef": 0.0003,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803650eb6802b0f907f0ae3",
    "name": "Frozen Veg (Peas, Corn)",
    "ef": 0.0015,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803651db6802b0f907f0ae5",
    "name": "Apples",
    "ef": 0.0004,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803652db6802b0f907f0ae7",
    "name": "Bananas",
    "ef": 0.00075,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803653cb6802b0f907f0ae9",
    "name": "Citrus Fruits (Oranges, Sweet Lime)",
    "ef": 0.0004,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803654db6802b0f907f0aeb",
    "name": "Mangoes",
    "ef": 0.0008,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036560b6802b0f907f0aed",
    "name": "Grapes",
    "ef": 0.00065,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036574b6802b0f907f0aef",
    "name": "Other Fruits",
    "ef": 0.0005,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680365a6b6802b0f907f0af2",
    "name": "Washing Soap",
    "ef": 0.0007,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680365b6b6802b0f907f0af4",
    "name": "Dishwash Bar/Liquid",
    "ef": 0.00085,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680365c7b6802b0f907f0af6",
    "name": "Glass Cleaner",
    "ef": 0.0005,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680365dbb6802b0f907f0af8",
    "name": "Floor Cleaner",
    "ef": 0.0006,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680365eeb6802b0f907f0afa",
    "name": "Toilet Cleaner",
    "ef": 0.00075,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036605b6802b0f907f0afc",
    "name": "Multipurpose Cleaner",
    "ef": 0.00065,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803661eb6802b0f907f0afe",
    "name": "Napkins/Paper Towels",
    "ef": 0.0015,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036634b6802b0f907f0b00",
    "name": "Bath Soap",
    "ef": 0.00095,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036647b6802b0f907f0b02",
    "name": "Shampoo",
    "ef": 0.0012,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036657b6802b0f907f0b04",
    "name": "Moisturizer/Lotion",
    "ef": 0.0015,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803666bb6802b0f907f0b06",
    "name": "Toothpaste",
    "ef": 0.0008,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803667eb6802b0f907f0b08",
    "name": "Hand Wash",
    "ef": 0.00065,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036691b6802b0f907f0b0a",
    "name": "Sanitary Pads/Liners",
    "ef": 0.0018,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680366a6b6802b0f907f0b0c",
    "name": "Room Freshener",
    "ef": 0.002,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680366b5b6802b0f907f0b0e",
    "name": "Insecticides",
    "ef": 0.0035,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680366c8b6802b0f907f0b10",
    "name": "Disinfectants",
    "ef": 0.001,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680366d7b6802b0f907f0b12",
    "name": "Napkins/Tissues",
    "ef": 0.0013,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "680366ecb6802b0f907f0b14",
    "name": "Garbage Bags",
    "ef": 0.0025,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036712b6802b0f907f0b16",
    "name": "Cotton Buds/Cotton",
    "ef": 0.0008,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "68036729b6802b0f907f0b18",
    "name": "Laundry Detergent",
    "ef": 0.0011,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803673ab6802b0f907f0b1a",
    "name": "Softener (Laundry)",
    "ef": 0.0008,
    "unit": "t CO₂e/ l",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "6803674bb6802b0f907f0b1c",
    "name": "Bleaching Powder/Liquid",
    "ef": 0.0012,
    "unit": "t CO₂e/ kg",
    "group": "Scope 3",
    "cat": "Purchase Goods and Services"
  },
  {
    "id": "660d6a2f712bd75ea5d72023",
    "name": "Coal",
    "ef": 0.0026,
    "unit": "tCO2e/ kg",
    "group": "Scope 1",
    "cat": "On site fuel consumption"
  },
  {
    "id": "660d6a77712bd75ea5d72027",
    "name": "LPG (kg)",
    "ef": 0.00298,
    "unit": "tCO2e/ kg",
    "group": "Scope 1",
    "cat": "On site fuel consumption"
  },
  {
    "id": "660d6ac3712bd75ea5d7202b",
    "name": "Diesel (Biofuel blended)",
    "ef": 0.0025,
    "unit": "tCO2e/ Litres",
    "group": "Scope 1",
    "cat": "On site fuel consumption"
  },
  {
    "id": "660d6ad6712bd75ea5d7202d",
    "name": "Petrol (Biofuel blended)",
    "ef": 0.0022,
    "unit": "tCO2e/ Litres",
    "group": "Scope 1",
    "cat": "On site fuel consumption"
  },
  {
    "id": "660d6b12712bd75ea5d7202f",
    "name": "Petrol (100%mineral fuel)",
    "ef": 0.0023,
    "unit": "tCO2e/ Litres",
    "group": "Scope 1",
    "cat": "On site fuel consumption"
  },
  {
    "id": "660d6b29712bd75ea5d72031",
    "name": "Diesel (100% mineral fuel)",
    "ef": 0.0027,
    "unit": "tCO2e/ Litres",
    "group": "Scope 1",
    "cat": "On site fuel consumption"
  },
  {
    "id": "6615024d712bd75ea5d7334a",
    "name": "Electricity Consumption",
    "ef": 0.00082,
    "unit": "tCO2e/ kWh",
    "group": "Scope 2",
    "cat": "Electricity consumption"
  },
  {
    "id": "661503c1712bd75ea5d73356",
    "name": "Electricity Consumption (State - Bihar)",
    "ef": 0.00075,
    "unit": "tCO2e/ kWh",
    "group": "Scope 2",
    "cat": "Electricity consumption"
  },
  {
    "id": "661503db712bd75ea5d73358",
    "name": "Electricity Consumption (State - Tamil Nadu)",
    "ef": 0.00078,
    "unit": "tCO2e/ kWh",
    "group": "Scope 2",
    "cat": "Electricity consumption"
  },
  {
    "id": "66151478712bd75ea5d73455",
    "name": "Water Consumption",
    "ef": 1.1e-05,
    "unit": "tCO2e/ Litres",
    "group": "Scope 3",
    "cat": "Water consumption"
  },
  {
    "id": "661517f6712bd75ea5d7348e",
    "name": "Plastic Waste",
    "ef": 0.0006,
    "unit": "tCO2e/ kg",
    "group": "Scope 3",
    "cat": "Waste Management"
  },
  {
    "id": "66151817712bd75ea5d73490",
    "name": "Mixed Waste",
    "ef": 0.00045,
    "unit": "tCO2e/ kg",
    "group": "Scope 3",
    "cat": "Waste Management"
  },
  {
    "id": "66151829712bd75ea5d73492",
    "name": "E-Waste",
    "ef": 0.0015,
    "unit": "tCO2e/ kg",
    "group": "Scope 3",
    "cat": "Waste Management"
  },
  {
    "id": "6615215c712bd75ea5d7349e",
    "name": "Paper (Waste)",
    "ef": 0.00085,
    "unit": "tCO2e/ kg",
    "group": "Scope 3",
    "cat": "Waste Management"
  },
  {
    "id": "6954d94d3556fa899c98e7e0",
    "name": "Hotel accommodation ",
    "ef": 15,
    "unit": "night",
    "group": "Scope 3",
    "cat": "Business Travel"
  },
  {
    "id": "6954d94d3556fa899c98e7e1",
    "name": "Kiln Wood (Dry)",
    "ef": 1.9e-06,
    "unit": "tCO\u2082e/kg",
    "group": "Scope 1",
    "cat": "Stationary Combustion"
  },
  {
    "id": "6954d94d3556fa899c98e7e2",
    "name": "Kiln Wood (Dry) \u2013 Biogenic CO\u2082",
    "ef": 0.00183,
    "unit": "tCO\u2082e/kg",
    "group": "Scope 1",
    "cat": "Stationary Combustion"
  },
  {
    "id": "695765cdb0cb077e5b690d0b",
    "name": "R600a (Refrigerants)",
    "ef": 0.003,
    "unit": "tCO\u2082e/kg",
    "group": "Scope 1",
    "cat": "Onsite fuel consumption"
  },
  {
    "id": "695765cdb0cb077e5b690d0c",
    "name": "Train",
    "ef": 3.4e-05,
    "unit": "tCO\u2082e/tonne-km",
    "group": "Scope 3",
    "cat": "Business Travel"
  },
  {
    "id": "695cb157d9f0eda8fb71da8a",
    "name": "A4 Paper (Ream)",
    "ef": 0.0025,
    "unit": "tCO\u2082e/kg",
    "group": "Scope 3",
    "cat": "Purchased Goods & Services"
  },
  {
    "id": "695cb23fd9f0eda8fb71da8d",
    "name": "Upstream Freight (Auto)",
    "ef": 0.00021,
    "unit": "tCO\u2082e/tonne-km",
    "group": "Scope 3",
    "cat": "Upstream Transportation & Distribution"
  },
  {
    "id": "695dfbc0d9f0eda8fb71da91",
    "name": "Auto",
    "ef": 0.00017,
    "unit": "tCO\u2082e/tonne-km",
    "group": "Scope 3",
    "cat": "Upstream Transportation & Distribution"
  }
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

const Calculator = () => {
  const [fixedInputs, setFixedInputs] = useState<any>({
    fixed_elec: { val: "", unit: "monthly" },
    fixed_petrol: { val: "", unit: "monthly" },
    fixed_diesel: { val: "", unit: "monthly" },
    fixed_lpg: { val: "", unit: "monthly" },
  });
  const [customItems, setCustomItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<any>(null);

  const normalize = (val: number, unit: string) => {
    if (unit === "daily") return val * 30;
    if (unit === "weekly") return val * 4.34;
    if (unit === "yearly") return val / 12;
    return val;
  };

  const filteredLibrary = useMemo(() => {
    if (!searchTerm) return [];
    return MASTER_LIBRARY.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !customItems.find(c => c.id === item.id)
    ).slice(0, 5);
  }, [searchTerm, customItems]);

  const addCustom = (item: any) => {
    setCustomItems([...customItems, { ...item, val: "", timeUnit: "monthly" }]);
    setSearchTerm("");
  };

  const calculate = () => {
    let totals = { "Scope 1": 0, "Scope 2": 0, "Scope 3": 0 };
    let breakdown: any[] = [];
    let grandTotal = 0;

    const process = (item: any, userVal: string, timeUnit: string) => {
      const monthly = normalize(Number(userVal || 0), timeUnit);
      const rateKey = Object.keys(CONVERSION_RATES).find(k => item.name.includes(k));
      const qty = rateKey ? monthly / CONVERSION_RATES[rateKey] : monthly;
      const ef = item.ef < 0.1 ? item.ef * 1000 : item.ef; // Convert tCO2 to kg
      const emission = qty * ef;

      
      if (emission > 0) {
        totals[item.group as keyof typeof totals] += emission;
        grandTotal += emission;
        breakdown.push({ name: item.name, value: parseFloat(emission.toFixed(2)) });
      }
    };

    FIXED_FIELDS.forEach(f => process(f, fixedInputs[f.id].val, fixedInputs[f.id].unit));
    customItems.forEach(c => process(c, c.val, c.unit));

    setResult({
      total: grandTotal.toFixed(2),
      chartData: Object.entries(totals).filter(t => t[1] > 0).map(t => ({ name: t[0], value: t[1] })),
      breakdown
    });
  };



  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 text-black">
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-black mb-8 text-gray-800">Carbon Footprint Calculator</h1>

          {/* Scope 1 & 2 Fixed Fields */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Direct Emissions (Scope 1 & 2)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FIXED_FIELDS.map(field => (
                <div key={field.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-700">{field.icon} {field.name}</label>
                    <div className="flex bg-gray-200 p-1 rounded-lg">
                      {["daily", "weekly", "monthly", "yearly"].map(u => (
                        <button key={u} onClick={() => setFixedInputs({...fixedInputs, [field.id]: {...fixedInputs[field.id], unit: u}})}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded ${fixedInputs[field.id].unit === u ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}>
                          {u[0].toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input type="number" placeholder={field.isSpend ? "Amount (₹)" : "Usage"} className="w-full p-2 rounded-xl border bg-white font-bold"
                    value={fixedInputs[field.id].val} onChange={e => setFixedInputs({...fixedInputs, [field.id]: {...fixedInputs[field.id], val: e.target.value}})} />
                </div>
              ))}
            </div>
          </div>

          {/* Scope 3 Searchable Library */}
          <div className="mt-10 space-y-4">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest">Indirect Emissions (Scope 3 Library)</h2>
            <div className="relative">
              <input type="text" placeholder="Search and add from 170+ items (Food, Travel, Waste...)" 
                className="w-full p-4 rounded-2xl border-2 border-gray-100 outline-none focus:border-green-500 transition text-black"
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              {searchTerm && (
                <div className="absolute w-full mt-2 bg-white border rounded-2xl shadow-xl z-20 text-black">
                  {filteredLibrary.map(item => (
                    <button key={item.id} onClick={() => addCustom(item)} className="w-full text-left p-4 hover:bg-green-50 border-b last:border-none flex justify-between">
                      <span className="font-bold">{item.name}</span>
                      <span className="text-xs text-blue-500 font-bold">+ ADD</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Added Scope 3 Items */}
            <div className="space-y-3 pt-2 text-black">
              {customItems.map((item, idx) => (
                <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-4 bg-green-50/50 p-4 rounded-2xl border border-green-100">
                  <div className="flex-1">
                    <p className="text-black font-bold text-green-600 uppercase">Scope 3</p>
                    <h4 className="font-bold">{item.name}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
  type="number"
  placeholder={`Enter ${item.unit}`}
  className="p-2 w-38 rounded-lg border bg-white"
  value={item.val}
  onChange={(e) => {
    const next = [...customItems];
    next[idx].val = e.target.value;
    setCustomItems(next);
  }}
/>
                    <select className="p-2 rounded-lg border bg-white text-black font-bold" value={item.timeUnit} onChange={e => {
                      const next = [...customItems];
                      next[idx].timeUnit = e.target.value;
                      setCustomItems(next);
                    }}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                    <button onClick={() => setCustomItems(customItems.filter(c => c.id !== item.id))} className="text-red-400 font-bold px-2">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={calculate} className="w-full mt-10 py-5 bg-gray-900 text-white rounded-2xl text-xl font-black hover:bg-black transition-all shadow-xl">
            Calculate Footprint
          </button>
        </div>

        {/* Results - Displayed Below */}
        {result && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
            <div className="text-center">
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-2">Total Monthly Impact</p>
              <h2 className="text-7xl font-black text-gray-900">{result.total} <span className="text-xl font-normal text-gray-400">kg CO₂e</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={result.chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {result.chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} cornerRadius={8} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase border-b pb-2">Item Breakdown</h3>
                <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                  {result.breakdown.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-bold">{item.value} kg</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;