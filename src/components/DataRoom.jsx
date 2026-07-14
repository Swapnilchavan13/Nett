import React, { useState, useEffect } from 'react';

const LAP_REPORTS = [
  { 
    name: 'Sitamarhi Lab Report', 
    fileName: 'Sitamarhi_Lab_Report.pdf', 
    path: '/assets/Sitamarhi_Lab_Report.pdf', 
    size: '2.4 MB',
    type: 'pdf'
  },
  { 
    name: 'Bhoomitra Bandhavgarh Lab Results', 
    fileName: 'Lab_Results_1_Bhoomitra_Bandhavgarh.jpeg', 
    path: '/assets/Lab_Results_1_Bhoomitra_Bandhavgarh.jpeg', 
    size: '3.1 MB',
    type: 'image'
  },
  { 
    name: 'Laboratory Testing Note', 
    fileName: 'Laboratory_Testing_Note.docx', 
    path: '/assets/Laboratory_Testing_Note.docx', 
    size: '1.8 MB',
    type: 'doc'
  },
  { 
    name: 'Biochar Himachal Lab Report', 
    fileName: 'Biochar ( orchard prunings)Lab Report_NZ_Himachal.pdf', 
    path: '/assets/Biochar ( orchard prunings)Lab Report_NZ_Himachal.pdf', 
    size: '4.2 MB',
    type: 'pdf'
  },
   { 
    name: 'Elite Lab Report', 
    fileName: 'Elite lab.pdf', 
    path: '/assets/Elite lab.pdf', 
    size: '4.2 MB',
    type: 'pdf'
  }

];

const getFileIcon = (type) => {
  switch (type) {
    case 'pdf': return '📄';
    case 'image': return '🖼️';
    case 'doc': return '📝';
    default: return '📁';
  }
};

export const DataRoom = () => {
  const [selectedSection, setSelectedSection] = useState(null); 
  const [showLoginPopup, setShowLoginPopup] = useState(false);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Explicitly force the underlying web page body background to white
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#0f172a';
    document.body.style.margin = '0';
    
    return () => {
      // Cleanup styles if component unmounts
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  const sections = [
    { id: 'compliance', label: 'Compliance', icon: '📋' },
    { id: 'labReports', label: 'Lab Reports', icon: '🔬' },
    { id: 'marketing', label: 'Marketing Materials', icon: '📢' },
    { id: 'franchisee', label: 'Franchisee Materials', icon: '🏢' }
  ];

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    if (!isLoggedIn) {
      setShowLoginPopup(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'KDM_VBL' && password === 'B3_VBL') {
      setIsLoggedIn(true);
      setShowLoginPopup(false); 
      setError('');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  const handleReset = () => {
    setIsLoggedIn(false);
    setSelectedSection(null);
    setUsername('');
    setPassword('');
    setError('');
  };

  const triggerDownload = (filePath, fileName) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.pageWrapper}>
<div className="flex flex-col items-start text-center gap-3 p-[50px]">
      <img
    src="https://i.postimg.cc/bYCvM6fv/nett.webp"
    alt="NettZero Logo"
    className="w-40 h-auto object-contain rounded-lg opacity-90 transition-opacity duration-300 group-hover:opacity-100"
  />

</div>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.mainTitle}>Secure Data Room</h2>
          <p style={styles.mainSubtitle}>Select a section below to authenticate and view files.</p>
        </div>

        {/* 1. STARTING BUTTONS */}
        {!isLoggedIn && (
          <div style={styles.grid}>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleSectionClick(sec)}
                style={styles.actionButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.1)';
                  e.currentTarget.style.borderColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <span style={styles.buttonIcon}>{sec.icon}</span>
                <span style={styles.buttonLabel}>{sec.label}</span>
                <span style={styles.arrowIcon}>Access Section →</span>
              </button>
            ))}
          </div>
        )}

        {/* 2. SECURE MODAL POPUP */}
        {showLoginPopup && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <button 
                style={styles.closeBtn} 
                onClick={() => { setShowLoginPopup(false); setSelectedSection(null); }}
              >
                ✕
              </button>
              
              <div style={styles.loginCard}>
                <h3 style={styles.title}>Secure Access Required</h3>
                <p style={styles.subtitle}>Please log in to unlock <strong>{selectedSection?.label}</strong></p>
                
                <form onSubmit={handleLogin} style={styles.form}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={styles.input}
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={styles.input}
                      placeholder="Enter password"
                      required
                    />
                  </div>

                  {error && <p style={styles.errorText}>{error}</p>}

                  <button type="submit" style={styles.submitButton}>
                    Unlock and View Files
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 3. DOCUMENT VIEW */}
        {isLoggedIn && selectedSection && (
          <div style={styles.dashboardCard}>
            <div style={styles.dashboardHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={styles.badge}>✓ Authenticated</span>
                <h3 style={styles.title}>{selectedSection.label}</h3>
              </div>
              <button onClick={handleReset} style={styles.logoutBtn}>
                Back to Sections
              </button>
            </div>

            <hr style={styles.divider} />

          {selectedSection.id === 'labReports' ? (
            <div>
              <p style={styles.desc}>Select a report to download the official documentation:</p>
              <div style={styles.fileGrid}>
                {LAP_REPORTS.map((file, idx) => (
                  <div key={idx} style={styles.fileCard}>
                    <div style={styles.fileIcon}>{getFileIcon(file.type)}</div>
                    <div style={styles.fileInfo}>
                      <h4 style={styles.fileName}>{file.name}</h4>
                      <span style={styles.fileSize}>{file.fileName} ({file.size})</span>
                    </div>
                    <button 
                      onClick={() => triggerDownload(file.path, file.fileName)} 
                      style={styles.downloadBtn}
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>⏳</div>
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b' }}>No Files Uploaded Yet</h4>
              <p style={{ margin: 0 }}>Documents for this section are currently being processed. Check back soon.</p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);
};

// Stylesheet Mapping
const styles = {
  pageWrapper: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  },
  container: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '80px 24px',
    backgroundColor: '#ffffff',
    color: '#0f172a',
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px'
  },
  mainTitle: {
    fontSize: '34px',
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: '-0.02em',
    margin: '0 0 10px 0'
  },
  mainSubtitle: {
    fontSize: '16px',
    color: '#475569',
    margin: 0
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px'
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '36px 24px',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)'
  },
  buttonIcon: {
    fontSize: '44px',
    marginBottom: '16px',
  },
  buttonLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: '12px'
  },
  arrowIcon: {
    fontSize: '13px',
    color: '#2563eb',
    fontWeight: '600'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(8px)'
  },
  modalContent: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    position: 'relative',
    border: '1px solid #f1f5f9'
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: '4px'
  },
  loginCard: {
    textAlign: 'center'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: '-0.01em',
    margin: '0 0 6px 0'
  },
  subtitle: {
    fontSize: '14px',
    color: '#475569',
    marginBottom: '28px'
  },
  form: {
    textAlign: 'left'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    background: '#f8fafc',
    color: '#000000',
    transition: 'border-color 0.15s ease',
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background-color 0.15s ease',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '13px',
    margin: '0 0 14px 0',
    fontWeight: '500'
  },
  dashboardCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.02)'
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  badge: {
    background: '#e2fbe8',
    color: '#15803d',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600'
  },
  logoutBtn: {
    background: '#f1f5f9',
    color: '#334155',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #f1f5f9',
    margin: '28px 0'
  },
  desc: {
    color: '#475569',
    fontSize: '15px',
    marginBottom: '28px'
  },
  fileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
    gap: '20px'
  },
  fileCard: {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: '#f8fafc'
  },
  fileIcon: {
    fontSize: '26px'
  },
  fileInfo: {
    flex: 1
  },
  fileName: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '600',
    color: '#0f172a'
  },
  fileSize: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '4px',
    display: 'block'
  },
  downloadBtn: {
    padding: '8px 14px',
    background: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    color: '#334155',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  },
  emptyState: {
    textAlign: 'center',
    padding: '50px 20px',
    color: '#64748b'
  },
  emptyIcon: {
    fontSize: '54px',
    marginBottom: '16px'
  }
};