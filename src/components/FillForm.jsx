import React, { useEffect, useState } from "react";

export const FillForm = () => {
  // प्रारंभिक स्थिति (Initial Empty State)
  const emptyForm = {
    agreementDate: "",
    farmerName: "",
    fatherHusbandName: "",
    farmerMobile: "",
    landArea: "",
    aadhaar: "",
    village: "",
    taluka: "",
    district: "",
    state: "",
    buyerSignatory: "",
    buyerDesignation: "",
    witness1: "",
    witness2: "",
    formFilledBy: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [agreementPage1, setAgreementPage1] = useState(null);
  const [agreementPage2, setAgreementPage2] = useState(null);
  const [agreementPage3, setAgreementPage3] = useState(null);
  const [statesList, setStatesList] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

 useEffect(() => {
  setLoadingStates(true);

  const indianStates = [
    { name: "Andhra Pradesh" },
    { name: "Arunachal Pradesh" },
    { name: "Assam" },
    { name: "Bihar" },
    { name: "Chhattisgarh" },
    { name: "Goa" },
    { name: "Gujarat" },
    { name: "Haryana" },
    { name: "Himachal Pradesh" },
    { name: "Jharkhand" },
    { name: "Karnataka" },
    { name: "Kerala" },
    { name: "Madhya Pradesh" },
    { name: "Maharashtra" },
    { name: "Manipur" },
    { name: "Meghalaya" },
    { name: "Mizoram" },
    { name: "Nagaland" },
    { name: "Odisha" },
    { name: "Punjab" },
    { name: "Rajasthan" },
    { name: "Sikkim" },
    { name: "Tamil Nadu" },
    { name: "Telangana" },
    { name: "Tripura" },
    { name: "Uttar Pradesh" },
    { name: "Uttarakhand" },
    { name: "West Bengal" },
    { name: "Andaman and Nicobar Islands" },
    { name: "Chandigarh" },
    { name: "Dadra and Nagar Haveli and Daman and Diu" },
    { name: "Delhi" },
    { name: "Jammu and Kashmir" },
    { name: "Ladakh" },
    { name: "Lakshadweep" },
    { name: "Puducherry" },
  ];

  setStatesList(indianStates);
  setLoadingStates(false);
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    // 1. वैलिडेशन: केवल आवश्यक पाठ्य फ़ील्ड्स की जांच करें (फ़ोटो को छोड़कर)
    const emptyFields = Object.keys(formData).filter((key) => !formData[key] || formData[key].trim() === "");

    if (emptyFields.length > 0) {
      setSubmitStatus("⚠️ कृपया सभी फ़ील्ड्स भरें! कोई भी बॉक्स खाली नहीं छोड़ा जा सकता।");
      return;
    }

    setSubmitStatus("Saving to database...");

    // फ़ाइलों और पाठ्य डेटा को एक साथ भेजने के लिए FormData का उपयोग करना
    const dataToSend = new FormData();
    
    // सभी पाठ्य फ़ील्ड्स जोड़ें
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });

    // वैकल्पिक फ़ाइल फ़ील्ड्स जोड़ें (यदि चयनित हों)
    if (agreementPage1) dataToSend.append("agreementPage1", agreementPage1);
    if (agreementPage2) dataToSend.append("agreementPage2", agreementPage2);
    if (agreementPage3) dataToSend.append("agreementPage3", agreementPage3);

    try {
      // नोट: FormData भेजते समय "Content-Type" हेडर को खाली छोड़ दें
      const response = await fetch("https://microoffsets.nettzero.world/api/agreements", {
        method: "POST",
        body: dataToSend,
      });
      
      if (response.ok) {
        setSubmitStatus("✅ रिकॉर्ड सफलतापूर्वक सुरक्षित कर दिया गया है!");
        
        // फॉर्म रीसेट करना
        setFormData(emptyForm);
        setAgreementPage1(null);
        setAgreementPage2(null);
        setAgreementPage3(null);
        
        // फ़ाइल इनपुट तत्वों को मैन्युअली साफ़ करना
        document.getElementById("file1").value = "";
        document.getElementById("file2").value = "";
        document.getElementById("file3").value = "";

        setTimeout(() => setSubmitStatus(""), 4000);
      } else {
        setSubmitStatus("❌ बैकएंड सर्वर पर डेटा सहेजने में विफल।");
      }
    } catch (error) {
      console.error("Backend Error:", error);
      setSubmitStatus("⚠️ नेटवर्क त्रुटि: बैकएंड सर्वर से कनेक्ट नहीं हो सका।");
    }
  };

const styles = {
  container: { 
    padding: "10px", // Reduced slightly for maximum screen real-estate on small phones
    maxWidth: "100%", 
    margin: "0 auto", 
    fontFamily: "Arial, sans-serif", 
    backgroundColor: "#e8e9e9",
    boxSizing: "border-box"
  },
  headerCard: { 
    maxWidth: "650px",
    backgroundColor: "#fcfbfb", 
    padding: "15px", 
    borderRadius: "12px", 
    border: "2px solid #000000", 
    marginBottom: "15px", 
    textAlign: "center", 
    margin: '0 auto',
    boxSizing: "border-box"
  },
  title: { 
    color: "#000000", 
    fontSize: "18px", // Reduced slightly from 20px so titles don't wrap awkwardly on narrow screens
    fontWeight: "bold", 
    margin: "10px 0 0 0" 
  },
  formCard: {
    margin: '0 auto',
    maxWidth: "650px", 
    backgroundColor: "#ffffff", 
    border: "2px solid #000000", 
    borderRadius: "12px", 
    overflow: "hidden",
    boxSizing: "border-box"
  },
  formHeader: { 
    backgroundColor: "#e0dddd", 
    color: "#000000", 
    padding: "15px", 
    fontWeight: "bold", 
    fontSize: "15px", 
    borderBottom: "2px solid #000000" 
  },
  formBody: { 
    padding: "12px" // Slightly tighter padding to save vertical scrolling space on mobile
  },
  fieldGroup: { 
    display: "flex", 
    flexDirection: "column", 
    marginBottom: "15px" 
  },
  label: { 
    color: "#000000", 
    fontSize: "12px", 
    fontWeight: "bold", 
    marginBottom: "6px", 
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  input: { 
    height: "48px", // Increased to 48px for better mobile touch target (recommended mobile standard)
    border: "2px solid #000000", 
    borderRadius: "8px", 
    padding: "0 12px", 
    fontSize: "16px", // CRITICAL: Changed from 15px to 16px to stop iOS / Safari from auto-zooming on tap
    color: "#000000", 
    backgroundColor: "#ffffff", 
    fontWeight: "bold",
    boxSizing: "border-box",
    WebkitAppearance: "none" // Removes default iOS input styling shadows
  },
  fileInput: { 
    border: "2px dashed #000000", 
    borderRadius: "8px", 
    padding: "14px 10px", // Increased padding makes it a much easier target to tap on a touchscreen
    fontSize: "15px", 
    backgroundColor: "#fafafa",
    boxSizing: "border-box"
  },
  buttonRow: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "10px", 
    marginTop: "20px" 
  },
  btnSave: { 
    backgroundColor: "#16a34a", 
    color: "#ffffff", 
    border: "2px solid #000000", 
    padding: "14px", // Increased padding for a more solid, easily-tappable action button
    borderRadius: "8px", 
    fontWeight: "bold", 
    cursor: "pointer", 
    fontSize: "16px", 
    textTransform: "uppercase",
    width: "100%",
    boxSizing: "border-box"
  },
  status: { 
    marginTop: "15px", 
    padding: "12px", 
    border: "2px solid #000000", 
    borderRadius: "8px", 
    backgroundColor: "#eff6ff", 
    color: "#000000", 
    fontWeight: "bold", 
    fontSize: "14px",
    boxSizing: "border-box"
  }
};

  return (
    <div style={styles.container}>
      
      <div style={styles.headerCard}>
        <img src="https://i.postimg.cc/bYCvM6fv/nett.webp" alt="NettZero Logo" style={{ height: "45px", objectFit: "contain" }} />
        <h1 style={styles.title}>Biomass Provider Agreement Details Form</h1>
      </div>

      <div style={styles.formCard}>
        <div style={styles.formHeader}>Agreement Specification Parameters</div>
        
        <div style={styles.formBody}>
          
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Agreement Date</label>
            <input style={styles.input} type="date" name="agreementDate" value={formData.agreementDate} onChange={handleChange} />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Farmer Name (किसान का नाम)</label>
            <input style={styles.input} type="text" name="farmerName" value={formData.farmerName} onChange={handleChange} placeholder="किसान का नाम दर्ज करें" />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Father / Husband Name</label>
            <input style={styles.input} type="text" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} placeholder="पिता या पति का नाम" />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Farmer Mobile Number</label>
            <input style={styles.input} type="tel" name="farmerMobile" value={formData.farmerMobile} onChange={handleChange} placeholder="10 अंकों का मोबाइल नंबर" />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Land Area (Acres)</label>
            <input style={styles.input} type="text" name="landArea" value={formData.landArea} onChange={handleChange} placeholder="भूमि क्षेत्र एकड़ में" />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Aadhaar Number</label>
            <input style={styles.input} type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} placeholder="12 अंकों की आधार संख्या" />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Village (ग्राम)</label>
            <input style={styles.input} type="text" name="village" value={formData.village} onChange={handleChange} placeholder="ग्राम का नाम" />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Taluka (तहसील)</label>
            <input style={styles.input} type="text" name="taluka" value={formData.taluka} onChange={handleChange} placeholder="तहसील का नाम" />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>District (जिला)</label>
            <input style={styles.input} type="text" name="district" value={formData.district} onChange={handleChange} placeholder="जिला का नाम" />
          </div>

        <div style={styles.fieldGroup}>
  <label style={styles.label}>State (राज्य)</label>
  <select
    style={styles.input}
    name="state"
    value={formData.state}
    onChange={handleChange}
  >
    <option value="">-- Select State --</option>

    {statesList.map((state) => (
      <option key={state.name} value={state.name}>
        {state.name}
      </option>
    ))}
  </select>
</div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Buyer Signatory Name (NettZero Staff)</label>
            <input style={styles.input} type="text" name="buyerSignatory" value={formData.buyerSignatory} onChange={handleChange} placeholder="क्रेता हस्ताक्षरकर्ता का नाम" />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Buyer Designation</label>
            <input style={styles.input} type="text" name="buyerDesignation" value={formData.buyerDesignation} onChange={handleChange} placeholder="जैसे: समन्वयक, प्रबंधक" />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Witness 1 Name (प्रथम गवाह)</label>
            <input style={styles.input} type="text" name="witness1" value={formData.witness1} onChange={handleChange} placeholder="पहले गवाह का नाम" />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Witness 2 Name (द्वितीय गवाह)</label>
            <input style={styles.input} type="text" name="witness2" value={formData.witness2} onChange={handleChange} placeholder="दूसरे गवाह का नाम" />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Form Filled By (Staff Name)</label>
            <input style={styles.input} type="text" name="formFilledBy" value={formData.formFilledBy} onChange={handleChange} placeholder="फॉर्म भरने वाले का नाम" />
          </div>

          {/* --- नया फोटो अपलोड सेक्शन (वैकल्पिक) --- */}
          <hr style={{ border: "1px solid #000000", margin: "20px 0" }} />
          <h3 style={{ color: "#000000", fontSize: "14px", fontWeight: "bold", marginBottom: "10px" }}>UPLOAD AGREEMENT PHOTOS (OPTIONAL)</h3>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Agreement Page 1</label>
            <input id="file1" style={styles.fileInput} type="file" accept="image/*" onChange={(e) => setAgreementPage1(e.target.files[0])} />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Agreement Page 2</label>
            <input id="file2" style={styles.fileInput} type="file" accept="image/*" onChange={(e) => setAgreementPage2(e.target.files[0])} />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Agreement Page 3</label>
            <input id="file3" style={styles.fileInput} type="file" accept="image/*" onChange={(e) => setAgreementPage3(e.target.files[0])} />
          </div>

          {submitStatus && (
            <div style={styles.status}>
              {submitStatus}
            </div>
          )}

          <div style={styles.buttonRow}>
            <button style={styles.btnSave} onClick={handleSave}>💾 Submit & Save Agreement</button>
          </div>

        </div>
      </div>

    </div>
  );
};