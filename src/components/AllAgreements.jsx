import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

export const AllAgreements = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API से लाइव डेटा प्राप्त करना
  useEffect(() => {
    fetch("https://microoffsets.nettzero.world/api/getagreements")
      .then((response) => {
        if (!response.ok) {
          throw new Error("नेटवर्क प्रतिक्रिया सफल नहीं रही");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setRecords(data.data);
        } else {
          setError("अनुबंध सूची प्राप्त करने में विफल।");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // अनुबंध के कंटेंट को पूरी तरह से एकीकृत रखने के लिए हेल्पर टेम्पलेट फ़ंक्शन
  const generateContractHTML = (data) => {
    const formattedDate = data.agreementDate 
      ? data.agreementDate.split("-").reverse().join("-") 
      : "________";

    return `
      <div style="text-align: center; margin-bottom: 15pt;">
        <img 
          src="https://i.postimg.cc/bYCvM6fv/nett.webp" 
          alt="NettZero Logo" 
          style="height: 55px; object-fit: contain;" 
        />
      </div>

      <div style="text-align: center; font-weight: bold; font-size: 14pt; margin-bottom: 3pt;">
        धान पराली (Rice Straw) क्रय अनुबंध
      </div>
      <div style="text-align: center; font-weight: bold; font-size: 11pt; margin-bottom: 20pt;">
        (Rice Straw Purchase Agreement)
      </div>

      <p style="text-align: justify; margin-bottom: 12pt;">
        यह धान पराली क्रय अनुबंध ("अनुबंध") आज दिनांक <strong style="text-decoration: underline;">${formattedDate}</strong> ("प्रभावी तिथि") को निम्न पक्षों के बीच संपादित किया जा रहा है:
      </p>

      <div style="margin-bottom: 12pt; padding-left: 5pt;">
        <strong>पक्ष - 1</strong><br/>
        <strong>NettZero Environmental Advisory Technologies Private Limited</strong><br/>
        सीआईएन: U90009MH2000PTC147117<br/>
        पंजीकृत कार्यालय: फर्स्ट फ्लोर, आनंद प्रिमाइसेस बिल्डिंग, गांधी ग्राम रोड, जुहू, मुंबई - 400049<br/>
        (आगे "क्रेता" या "एनज़ेड" कहलाएगा)
      </div>

      <div style="margin-bottom: 15pt; padding-left: 5pt;">
        <strong>पक्ष - 2</strong><br/>
        <strong>श्री/श्रीमती:</strong> <span style="border-bottom: 1px solid #000; font-weight: bold; padding: 0 5px;">${data.farmerName || "____________________"}</span><br/>
        <strong>पिता/पति का नाम:</strong> <span style="border-bottom: 1px solid #000; font-weight: bold; padding: 0 5px;">${data.fatherHusbandName || "____________________"}</span><br/>
        <strong>आधार संख्या:</strong> <span style="border-bottom: 1px solid #000; font-weight: bold; padding: 0 5px;">${data.aadhaar || "____________________"}</span><br/>
        <strong>भूमि क्षेत्र:</strong> <span style="border-bottom: 1px solid #000; font-weight: bold; padding: 0 5px;">${data.landArea || "____"}</span> एकड़<br/>
        <strong>पता:</strong> ग्राम <span style="border-bottom: 1px solid #000; font-weight: bold; padding: 0 5px;">${data.village || "________"}</span>, तहसील <span style="border-bottom: 1px solid #000; font-weight: bold; padding: 0 5px;">${data.taluka || "________"}</span>, जिला <span style="border-bottom: 1px solid #000; font-weight: bold; padding: 0 5px;">${data.district || "________"}</span>, <span style="border-bottom: 1px solid #000; font-weight: bold; padding: 0 5px;">${data.state || "________"}</span><br/>
        (आगे "किसान" कहलाएंगे)
      </div>

      <p style="margin-bottom: 12pt;">क्रेता और किसान को सामूहिक रूप से "पक्ष" कहा जाएगा।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">1. प्रस्तावना एवं उद्देश्य</h4>
      <p style="margin: 0 0 3pt 15pt; text-align: justify;">1.1 किसान अपने कृषि भू-भाग पर धान की खेती करता/करती है और उस भूमि के विधिसम्मत उपयोग का अधिकार रखता/रखती है।</p>
      <p style="margin: 0 0 3pt 15pt; text-align: justify;">1.2 क्रेता कृषि अपशिष्ट प्रबंधन, carbon न्यूनीकरण एवं जैव-कोयला (Biochar) उत्पादन हेतु धान पराली की खरीद करना चाहता है, या किसी अन्य उपयोग के लिए।</p>
      <p style="margin: 0 0 10pt 15pt; text-align: justify;">1.3 यह अनुबंध पराली जलाने की प्रथा को रोकने, पर्यावरण संरक्षण को बढ़ावा देने तथा विधिसम्मत ढंग से कृषि अवशेषों के उपयोग हेतु किया जा रहा है।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">2. अनुबंध की अवधि</h4>
      <p style="margin: 0 0 3pt 15pt;">2.1 यह अनुबंध प्रभावी तिथि से प्रारंभ होकर तीन (3) वर्ष की अवधि तक वैध रहेगा, जब तक कि इसे लिखित सहमति से विस्तारित या समाप्त न किया जाए।</p>
      <p style="margin: 0 0 3pt 15pt;">2.2 इस अवधि के दौरान किसान इस अनुबंध की शर्तों के अनुसार अपनी धान पराली की आपूर्ति करने हेतु बाध्य रहेगा/रहेगी।</p>
      <p style="margin: 0 0 10pt 15pt;">2.3 पक्ष आपसी लिखित सहमति से इसकी अवधि बढ़ा सकते हैं।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">3. पराली की आपूर्ति एवं मूल्य</h4>
      <p style="margin: 0 0 3pt 15pt; text-align: justify;">3.1 किसान इस अनुबंध के तहत सहमत होता/होती है कि वह अपनी भूमि पर उत्पादित संपूर्ण उपलब्ध धान पराली, जो बिक्री योग्य हो, प्राथमिकता से क्रेता को बेचेगा/बेचेगी।</p>
      <p style="margin: 0 0 3pt 15pt;">3.2 क्रेता किसान से धान पराली <strong>₹1,000/- (रुपये एक हजार मात्र) प्रति मीट्रिक टन</strong> की निश्चित दर पर खरीदेगा।</p>
      <p style="margin: 0 0 3pt 15pt; text-align: justify;">3.3 उपरोक्त राशि के अतिरिक्त, प्रत्येक मीट्रिक टन पराली की आपूर्ति पर किसान को <strong>50 (पचास) किलोग्राम जैविक उर्वरक निःशुल्क</strong> प्रदान किया जाएगा। यह उर्वरक नगद भुगतान से अतिरिक्त लाभ के रूप में दिया जाएगा।</p>
      <p style="margin: 0 0 10pt 15pt;">3.4 कुल देय राशि का 25% अग्रिम भुगतान पराली की तौल एवं सुपुर्दगी के समय, तथा 75% एक सप्ताह के भीतर, किसान के निर्दिष्ट बैंक खाते में किया जाएगा।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">4. किसान की बाध्यताएँ</h4>
      <p style="margin: 0 0 3pt 15pt;">4.1 किसान यह घोषित करता/करती है कि:</p>
      <ul style="margin: 0 0 3pt 30pt; padding: 0; list-style-type: disc;">
        <li style="margin-bottom: 1pt;">वह उस भूमि का विधिसम्मत स्वामी/पट्टेदार/अधिकारधारी है जिस पर पराली उत्पन्न हुई है;</li>
        <li style="margin-bottom: 1pt;">उसे उक्त पराली को बेचने का पूर्ण अधिकार है;</li>
        <li style="margin-bottom: 1pt;">पराली किसी तीसरे पक्ष के अधिकार या गिरवी से मुक्त है;</li>
        <li style="margin-bottom: 1pt;">वह पराली को जलाने से परहेज़ करेगा/करेगी;</li>
        <li style="margin-bottom: 1pt;">वह सभी लागू केंद्रीय, राज्य एवं स्थानीय कानूनों, पर्यावरणीय नियमों एवं पंचायत/राजस्व अनुमतियों का पालन करेगा/करेगी;</li>
        <li style="margin-bottom: 1pt;">वह अनुबंध की अवधि में उक्त पराली किसी अन्य खरीदार को नहीं बेचेगा/बेचेगी, जब तक कि क्रेता लिखित अनुमति न दे।</li>
      </ul>
      <p style="margin: 0 0 10pt 15pt;">4.2 किसान यह भी सुनिश्चित करेगा/करेगी कि पराली में मिट्टी, प्लास्टिक, पत्थर या अन्य अशुद्धियाँ न्यूनतम हों।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">5. तौल एवं गुणवत्ता</h4>
      <p style="margin: 0 0 3pt 15pt;">5.1 पराली की मात्रा का निर्धारण क्रेता द्वारा प्रमाणित तौल मशीन पर किया जाएगा।</p>
      <p style="margin: 0 0 10pt 15pt;">5.2 यदि गुणवत्ता अत्यधिक खराब पाई जाती है तो क्रेता को उचित कटौती या अस्वीकृति का अधिकार होगा।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">6. विशिष्टता (Exclusivity)</h4>
      <p style="margin: 0 0 3pt 15pt;">6.1 किसान इस अनुबंध की तीन वर्षीय अवधि में अपनी उपलब्ध धान पराली किसी अन्य खरीदार को बेचने के लिए सहमत नहीं होगा/होगी।</p>
      <p style="margin: 0 0 10pt 15pt;">6.2 यदि किसान इस प्रावधान का उल्लंघन करता/करती है, तो क्रेता को हुए वास्तविक वित्तीय नुकसान की क्षतिपूर्ति किसान द्वारा की जाएगी।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">7. गोपनीयता</h4>
      <p style="margin: 0 0 3pt 15pt;">7.1 इस अनुबंध की शर्तें, मूल्य, भुगतान व्यवस्था एवं व्यावसायिक जानकारी गोपनीय मानी जाएगी।</p>
      <p style="margin: 0 0 10pt 15pt;">7.2 किसान बिना पूर्व लिखित अनुमति के इन शर्तों का प्रकटीकरण नहीं करेगा/करेगी, सिवाय कानूनन आवश्यक परिस्थितियों में।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">8. स्वतंत्र पक्ष (No Partnership)</h4>
      <p style="margin: 0 0 3pt 15pt;">8.1 यह अनुबंध किसी प्रकार की साझेदारी, संयुक्त उपक्रम, एजेंसी या रोजगार संबंध स्थापित नहीं करता।</p>
      <p style="margin: 0 0 10pt 15pt;">8.2 दोनों पक्ष स्वतंत्र संविदात्मक पक्ष हैं।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">9. प्रतिकर एवं उत्तरदायित्व</h4>
      <p style="margin: 0 0 3pt 15pt;">9.1 किसान द्वारा गलत घोषणा, भूमि अधिकार विवाद, या कानूनी उल्लंघन की स्थिति में उत्पन्न किसी भी दावे, जुर्माने या हानि के लिए किसान स्वयं उत्तरदायी होगा/होगी।</p>
      <p style="margin: 0 0 10pt 15pt;">9.2 क्रेता केवल स्वीकृत पराली की खरीद तक सीमित उत्तरदायी रहेगा।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">10. अप्रत्याशित परिस्थितियों (Force Majeure)</h4>
      <p style="margin: 0 0 10pt 15pt; text-align: justify;">प्राकृतिक आपदा, सरकारी प्रतिबंध, युद्ध, महामारी या अन्य अप्रत्याशित घटनाओं की स्थिति में पक्ष दायित्वों के निर्वहन हेतु बाध्य नहीं होंगे, जब तक कि ऐसी स्थिति समाप्त न हो जाए।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">11. विवाद निवारण</h4>
      <p style="margin: 0 0 3pt 15pt;">11.1 विवाद की स्थिति में पक्ष पहले आपसी बातचीत से समाधान का प्रयास करेंगे।</p>
      <p style="margin: 0 0 10pt 15pt;">11.2 समाधान न होने पर न्यायालय का क्षेत्राधिकार जिला <span style="text-decoration: underline; font-weight: bold;">${data.district || "________"}</span>, मध्य प्रदेश होगा।</p>

      <h4 style="font-size: 11pt; margin-top: 10pt; margin-bottom: 2pt; font-weight: bold;">12. संशोधन</h4>
      <p style="margin: 0 0 20pt 15pt;">इस अनुबंध में कोई भी संशोधन तभी मान्य होगा जब वह लिखित रूप में दोनों पक्षों द्वारा हस्ताक्षरित हो।</p>

      <table style="width: 100%; margin-top: 25pt; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="width: 50%; vertical-align: top; font-size: 10.5pt;">
              <strong>क्रेता की ओर से:</strong><br/><br/><br/><br/>
              नाम: <span style="border-bottom: 1px dashed #000; font-weight: bold;">${data.buyerSignatory || "____________________"}</span><br/>
              पद: <span style="border-bottom: 1px dashed #000; font-weight: bold;">${data.buyerDesignation || "____________________"}</span><br/>
              हस्ताक्षर: ____________________
            </td>
            <td style="width: 50%; vertical-align: top; text-align: right; font-size: 10.5pt;">
              <strong>किसान की ओर से:</strong><br/><br/><br/><br/>
              नाम: <span style="border-bottom: 1px dashed #000; font-weight: bold;">${data.farmerName || "____________________"}</span><br/>
              हस्ताक्षर/अंगूठा निशान: ____________________
            </td>
          </tr>
        </tbody>
      </table>

      <table style="width: 100%; margin-top: 30pt; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="width: 50%; font-size: 10.5pt;">
              <strong>गवाह 1:</strong> <span style="border-bottom: 1px dashed #000; font-weight: bold;">${data.witness1 || "____________________"}</span>
            </td>
            <td style="width: 50%; text-align: right; font-size: 10.5pt;">
              <strong>गवाह 2:</strong> <span style="border-bottom: 1px dashed #000; font-weight: bold;">${data.witness2 || "____________________"}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 40pt; border-top: 1px solid #ccc; padding-top: 10pt; font-size: 10pt; color: #333; line-height: 1.5;">
        <strong>Gautam Shiknis</strong><br/>
        Founder<br/>
        NettZero Environmental Advisory Technologies Pvt. Ltd.<br/>
        1230, Hubtown Solaris, N.S. Phadke Marg, Andheri East, Mumbai
      </div>
    `;
  };

  // गुप्त कार्यक्षेत्र नोड उत्पन्न करना
  const createPrintElement = (data) => {
    const element = document.createElement("div");
    element.style.width = "500pt";
    element.style.padding = "20pt";
    element.style.fontFamily = "'Noto Sans', Arial, sans-serif";
    element.style.fontSize = "11pt";
    element.style.lineHeight = "1.6";
    element.style.color = "#000";
    element.style.backgroundColor = "#fff";
    element.innerHTML = generateContractHTML(data);
    return element;
  };

  // सीधे डाउनलोड करने की उपयोगिता (PDF डाउनलोड)
  const handlePrint = (data) => {
    const element = createPrintElement(data);
    const opt = {
      margin: [30, 40, 30, 40],
      filename: `${data.farmerName || "Agreement"}_Contract.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(element).save();
  };

  // ब्राउज़र-नेटिव प्रीव्यू कंट्रोलर
  const handlePreview = (data) => {
    const element = createPrintElement(data);
    const opt = {
      margin: [30, 40, 30, 40],
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }
    };

    // स्थानीय स्ट्रीम ब्लॉब उत्पन्न करता है और उसे सीधे नए व्यूपोर्ट टैब में खोलता है
    html2pdf().set(opt).from(element).outputPdf("blob").then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      window.open(blobURL, "_blank");
    });
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center", fontSize: "16px", color: "#4b5563" }}>अनुबंध सूची लोड हो रही है...</div>;
  if (error) return <div style={{ padding: "40px", textAlign: "center", color: "#ef4444", fontWeight: "bold" }}>त्रुटि: {error}</div>;

  return (
    <div style={{ padding: "32px", fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "2px solid #e5e7eb", paddingBottom: "16px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", margin: 0 }}>धान पराली क्रय अनुबंध रिकॉर्ड्स</h2>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>सिस्टम में पंजीकृत सभी किसानों के डिजिटल अनुबंधों की सूची</p>
        </div>
        <img 
          src="https://i.postimg.cc/bYCvM6fv/nett.webp" 
          alt="NettZero Logo" 
          style={{ height: "50px", objectFit: "contain" }} 
        />
      </div>

      {/* आधुनिक डेटाबेस तालिका लेआउट */}
      <div style={{ overflowX: "auto", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", borderRadius: "12px", backgroundColor: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", border: "none" }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6", color: "#374151", fontWeight: "600", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "16px 20px", borderBottom: "2px solid #e5e7eb" }}>Farmer Name</th>
              <th style={{ padding: "16px 20px", borderBottom: "2px solid #e5e7eb" }}>Village</th>
              <th style={{ padding: "16px 20px", borderBottom: "2px solid #e5e7eb" }}>Aadhaar</th>
              <th style={{ padding: "16px 20px", borderBottom: "2px solid #e5e7eb" }}>Land (Acres)</th>
              <th style={{ padding: "16px 20px", borderBottom: "2px solid #e5e7eb" }}>Agreement Date</th>
              <th style={{ padding: "16px 20px", borderBottom: "2px solid #e5e7eb", textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "15px" }}>
            {records.length > 0 ? (
              records.map((item, index) => (
                <tr 
                  key={item._id || index} 
                  style={{ 
                    borderBottom: "1px solid #f3f4f6", 
                    color: "#4b5563",
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f1f5f9"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f9fafb"}
                >
                  <td style={{ padding: "16px 20px", fontWeight: "600", color: "#111827" }}>{item.farmerName}</td>
                  <td style={{ padding: "16px 20px" }}>{item.village}</td>
                  <td style={{ padding: "16px 20px", fontFamily: "monospace", letterSpacing: "0.05em", color: "#1f2937", fontWeight: "500" }}>
                    {item.aadhaar || "________"}
                  </td>
                  <td style={{ padding: "16px 20px", fontWeight: "500" }}>{item.landArea} <span style={{ color: "#9ca3af", fontSize: "13px" }}>Acres</span></td>
                  <td style={{ padding: "16px 20px" }}>{item.agreementDate}</td>
                  <td style={{ padding: "16px 20px", display: "flex", justifyContent: "center", gap: "10px" }}>
                    <button 
                      onClick={() => handlePreview(item)} 
                      style={{
                        backgroundColor: "#0d9488",
                        color: "#fff",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#0f766e"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#0d9488"}
                    >
                      Preview Content
                    </button>
                    <button 
                      onClick={() => handlePrint(item)} 
                      style={{
                        backgroundColor: "#7c3aed",
                        color: "#fff",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#6d28d9"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#7c3aed"}
                    >
                      Print PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ padding: "32px", textAlign: "center", color: "#9ca3af" }} colSpan="6">No Records Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};