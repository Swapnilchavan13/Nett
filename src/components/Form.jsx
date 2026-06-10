import React, { useState } from "react";

export const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    mobileNumber: "",
    address: {
      plotNumber: "",
      village: "",
      block: "",
      district: "",
      pin: "",
    },
    aadharNumber: "",
    crop: "",
    landArea: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://microoffsets.nettzero.world/api/sitamarhiform",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-5 md:p-8">
        
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
          Sitamarhi Farmer Form
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Please fill all details carefully.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="First Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-4 text-base outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-4 text-base outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Mobile */}
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-4 text-base outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Address Section */}
          <div className="pt-2">
            <h2 className="font-semibold text-lg mb-3 text-gray-800">
              Address Details
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="plotNumber"
                placeholder="Plot Number (Khasra)"
                value={formData.address.plotNumber}
                onChange={handleAddressChange}
                required
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                name="village"
                placeholder="Village"
                value={formData.address.village}
                onChange={handleAddressChange}
                required
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                name="block"
                placeholder="Block"
                value={formData.address.block}
                onChange={handleAddressChange}
                required
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.address.district}
                onChange={handleAddressChange}
                required
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                name="pin"
                placeholder="PIN Code"
                value={formData.address.pin}
                onChange={handleAddressChange}
                required
                className="w-full border rounded-xl p-4"
              />
            </div>
          </div>

          {/* Aadhaar */}
          <input
            type="text"
            name="aadharNumber"
            placeholder="Aadhaar Number"
            value={formData.aadharNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-4"
          />

          {/* Crop & Land */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="crop"
              placeholder="Crop"
              value={formData.crop}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-4"
            />

            <input
              type="text"
              name="landArea"
              placeholder="Land Area (Acres)"
              value={formData.landArea}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-4"
            />
          </div>

          {/* Submit */}
         <button
  type="submit"
  className="w-full mt-6 border-2 border-green-700 bg-green-600 hover:bg-green-700 text-black font-semibold py-4 rounded-xl transition duration-200"
>
  Submit Form
</button>

        </form>
      </div>
    </div>
  );
};