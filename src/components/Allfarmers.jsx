import React, { useState, useEffect } from 'react';

const API_URL = 'https://microoffsets.nettzero.world/api/getfarmers';
const ACTIVITY_API_BASE = 'https://microoffsets.nettzero.world/api/activity';

const TABS = [
  { key: 'profile', label: 'Profile', icon: '👤' },
  { key: 'fertilizer', label: 'Fertilizer', icon: '🌱' },
  { key: 'water', label: 'Water', icon: '💧' },
  { key: 'harvest', label: 'Harvest', icon: '🌾' },
  { key: 'soil', label: 'Soil', icon: '🧪' },
];

// Fallback sample data in case API request is blocked
const fallbackData = [
  {
    _id: '6a609560f14032992ac13c6f',
    farmerId: 'NZ-421316',
    formDate: '2026-07-22T10:03:12.212Z',
    fieldOfficer: 'Varun singh',
    fieldOfficerMobile: '9198998175',
    name: 'Suresh bind',
    fatherName: 'Aanika prasad',
    mobileNumber: '7318323761',
    whatsappNumber: '7318323761',
    village: 'Paigaha',
    post: 'Tela',
    tehsil: 'Handia',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    totalLandAcre: 0.5,
    b3AreaAcre: 0.5,
    cropName: 'धान',
    soilType: 'बलुई-दोमट',
    soilTestDone: false,
    irrigationSource: 'ट्यूबवेल',
    pumpType: 'बिजली',
    irrigationHours: 3,
    batchNumber: '10',
    distributionDate: '16/7/26',
  },
  {
    _id: '6a609490f14032992ac13c6d',
    farmerId: 'NZ-244397',
    formDate: '2026-07-22T09:59:44.534Z',
    fieldOfficer: 'Varun singh',
    fieldOfficerMobile: '9198998175',
    name: 'Sandeep mishra',
    fatherName: 'Ramakant mishra',
    mobileNumber: '7318250824',
    whatsappNumber: '7318250824',
    village: 'Paigaha',
    post: 'Tela',
    tehsil: 'Handia',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    totalLandAcre: 6,
    b3AreaAcre: 1,
    cropName: 'धान',
    soilType: 'बलुई-दोमट',
    soilTestDone: false,
    irrigationSource: 'नहर',
    pumpType: 'None',
    irrigationHours: null,
    batchNumber: '10',
    distributionDate: '16/7/26',
  },
];

export const Allfarmers = () => {
  const [farmersList, setFarmersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  // New Date Filter States
  const [selectedDate, setSelectedDate] = useState('');
  const [last30Days, setLast30Days] = useState([]);

  // Tab & Activity State
  const [activeTab, setActiveTab] = useState('profile');
  const [activityRecords, setActivityRecords] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);
  
  // Track expanded row ID for showing details on click
  const [expandedRowId, setExpandedRowId] = useState(null);

  // Generate array of YYYY-MM-DD for the last 30 days
  useEffect(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    setLast30Days(dates);
  }, []);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setFarmersList(result.data);
        } else {
          setFarmersList(fallbackData);
        }
      } catch (error) {
        console.warn('API call failed or restricted. Using fallback data.', error);
        setFarmersList(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  // Fetch Activity Data on Tab Switch
  useEffect(() => {
    if (!selectedFarmer || activeTab === 'profile') return;

    const fetchActivityData = async () => {
      setActivityLoading(true);
      setExpandedRowId(null); // Reset expanded row on tab change
      try {
        const res = await fetch(`${ACTIVITY_API_BASE}/${selectedFarmer._id}/${activeTab}`);
        const result = await res.json();
        setActivityRecords(result.data || []);
      } catch (err) {
        console.error(`Error fetching ${activeTab} records:`, err);
        setActivityRecords([]);
      } finally {
        setActivityLoading(false);
      }
    };

    fetchActivityData();
  }, [activeTab, selectedFarmer]);

  const handleOpenModal = (farmer) => {
    setSelectedFarmer(farmer);
    setActiveTab('profile');
  };

  const handleCloseModal = () => {
    setSelectedFarmer(null);
    setActiveTab('profile');
    setActivityRecords([]);
    setExpandedRowId(null);
  };

  const toggleRowExpansion = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  // Filter farmers by Name, Mobile, and Selected Registration Date (formDate)
  const filteredFarmers = farmersList.filter((farmer) => {
    const query = searchQuery.toLowerCase().trim();
    const nameMatch = farmer.name && farmer.name.toLowerCase().includes(query);
    const mobileMatch = farmer.mobileNumber && farmer.mobileNumber.toLowerCase().includes(query);
    const searchMatch = nameMatch || mobileMatch;

    let dateMatch = true;
    if (selectedDate && farmer.formDate) {
      const farmerFormattedDate = new Date(farmer.formDate).toISOString().split('T')[0];
      dateMatch = farmerFormattedDate === selectedDate;
    }

    return searchMatch && dateMatch;
  });

  // Calculate registrations count for selected date specifically
  const countOnSelectedDate = selectedDate
    ? farmersList.filter((f) => f.formDate && new Date(f.formDate).toISOString().split('T')[0] === selectedDate).length
    : 0;

  const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleDateString('en-IN') : 'N/A');
  const formatTime = (dateStr) => (dateStr ? new Date(dateStr).toLocaleTimeString('en-IN') : 'N/A');

  const getVolumeOrSummary = (item, tabKey) => {
    if (item.volume !== undefined && item.volume !== null) {
      return `${item.volume} ${tabKey === 'water' ? 'Litres' : 'Units/L'}`;
    }
    if (tabKey === 'harvest' && item.grainsPerPanicle) {
      return `${item.grainsPerPanicle} Grains/Panicle`;
    }
    if (tabKey === 'soil' && item.soilReport) {
      return 'Report Uploaded';
    }
    return 'N/A';
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.headerH1}>Farmer Directory</h1>
          <p style={styles.headerP}>Search and manage registered farmer details</p>
        </header>

        {/* CONTROLS BAR WITH DATE DROPDOWN */}
        <div style={styles.controls}>
          {/* SEARCH INPUT */}
          <div style={styles.searchBox}>
            <svg style={styles.searchIcon} fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search by name or mobile number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* DATE DROPDOWN (LAST 30 DAYS) */}
          <div style={styles.dateFilterBox}>
            <select
              style={styles.dateSelect}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">All Dates (Last 30 Days)</option>
              {last30Days.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>

          {/* COUNTERS */}
          <div style={styles.countBadgeGroup}>
            {selectedDate && (
              <div style={styles.dateBadge}>
                Registered on {selectedDate}: <strong>{countOnSelectedDate}</strong>
              </div>
            )}
            <div style={styles.countBadge}>
              {loading ? 'Loading...' : `Showing: ${filteredFarmers.length}`}
            </div>
          </div>
        </div>

        {/* FARMER CARDS GRID */}
        <div style={styles.grid}>
          {loading ? (
            <div style={styles.spinnerContainer}>
              <div style={styles.spinner}></div>
            </div>
          ) : filteredFarmers.length === 0 ? (
            <div style={styles.noData}>No farmers found matching your search or date criteria.</div>
          ) : (
            filteredFarmers.map((farmer, index) => {
              const name = farmer.name ? farmer.name.trim() : 'N/A';
              const mobile = farmer.mobileNumber ? farmer.mobileNumber.trim() : 'N/A';
              const village = farmer.village ? farmer.village.trim() : 'N/A';
              const crop = farmer.cropName ? farmer.cropName.trim() : 'N/A';

              return (
                <div key={farmer._id || index} style={styles.card}>
                  <div>
                    <div style={styles.cardHeader}>
                      <div style={styles.farmerName}>{name}</div>
                      <span style={styles.idBadge}>{farmer.farmerId || 'N/A'}</span>
                    </div>
                    <div style={styles.cardBody}>
                      <div style={styles.infoRow}>
                        <strong style={styles.infoStrong}>Registered Date:</strong>
                        <span>{formatDate(farmer.formDate)}</span>
                      </div>
                      <div style={styles.infoRow}>
                        <strong style={styles.infoStrong}>Mobile:</strong>
                        <span>{mobile}</span>
                      </div>
                      <div style={styles.infoRow}>
                        <strong style={styles.infoStrong}>Village:</strong>
                        <span>{village}</span>
                      </div>
                      <div style={styles.infoRow}>
                        <strong style={styles.infoStrong}>Crop:</strong>
                        <span>{crop}</span>
                      </div>
                      <div style={styles.infoRow}>
                        <strong style={styles.infoStrong}>Total Land:</strong>
                        <span>{farmer.totalLandAcre ? `${farmer.totalLandAcre} Acre` : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  <div style={styles.cardFooter}>
                    <button style={styles.btn} onClick={() => handleOpenModal(farmer)}>
                      See More Details
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Details & Activity Modal */}
      {selectedFarmer && (
        <div
          style={{ ...styles.modalOverlay, opacity: 1, pointerEvents: 'auto' }}
          onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
        >
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalHeaderH2}>{selectedFarmer.name ? selectedFarmer.name.trim() : 'Farmer Details'}</h2>
                <div style={styles.modalSubHeader}>ID: {selectedFarmer.farmerId || 'N/A'}</div>
              </div>
              <button style={styles.closeBtn} onClick={handleCloseModal}>
                &times;
              </button>
            </div>

            {/* TAB NAVIGATION BAR */}
            <div style={styles.tabBar}>
              {TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    style={{
                      ...styles.tabBtn,
                      ...(isActive ? styles.tabBtnActive : {}),
                    }}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <span style={{ marginRight: '6px' }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div style={styles.modalBody}>
              {/* TAB 1: PROFILE */}
              {activeTab === 'profile' && (
                <>
                  <div style={styles.detailSection}>
                    <div style={styles.detailSectionTitle}>Personal Information</div>
                    <div style={styles.detailGrid}>
                      <div style={styles.detailItem}><span style={styles.label}>Farmer ID</span><span style={styles.value}>{selectedFarmer.farmerId || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Father's Name</span><span style={styles.value}>{selectedFarmer.fatherName || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Mobile Number</span><span style={styles.value}>{selectedFarmer.mobileNumber || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>WhatsApp Number</span><span style={styles.value}>{selectedFarmer.whatsappNumber || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Age</span><span style={styles.value}>{selectedFarmer.age || 'N/A'}</span></div>
                    </div>
                  </div>

                  <div style={styles.detailSection}>
                    <div style={styles.detailSectionTitle}>Location Details</div>
                    <div style={styles.detailGrid}>
                      <div style={styles.detailItem}><span style={styles.label}>Village</span><span style={styles.value}>{selectedFarmer.village || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Post</span><span style={styles.value}>{selectedFarmer.post || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Tehsil</span><span style={styles.value}>{selectedFarmer.tehsil || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>District</span><span style={styles.value}>{selectedFarmer.district || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>State</span><span style={styles.value}>{selectedFarmer.state || 'N/A'}</span></div>
                    </div>
                  </div>

                  <div style={styles.detailSection}>
                    <div style={styles.detailSectionTitle}>Farming & Land Information</div>
                    <div style={styles.detailGrid}>
                      <div style={styles.detailItem}><span style={styles.label}>Total Land (Acre)</span><span style={styles.value}>{selectedFarmer.totalLandAcre ?? 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>B3 Area (Acre)</span><span style={styles.value}>{selectedFarmer.b3AreaAcre ?? 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Crop Name</span><span style={styles.value}>{selectedFarmer.cropName || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Soil Type</span><span style={styles.value}>{selectedFarmer.soilType || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Soil Test Done</span><span style={styles.value}>{selectedFarmer.soilTestDone ? 'Yes' : 'No'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Irrigation Source</span><span style={styles.value}>{selectedFarmer.irrigationSource || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Pump Type</span><span style={styles.value}>{selectedFarmer.pumpType || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Irrigation Hours</span><span style={styles.value}>{selectedFarmer.irrigationHours ?? 'N/A'}</span></div>
                    </div>
                  </div>

                  <div style={styles.detailSection}>
                    <div style={styles.detailSectionTitle}>Field Officer & Scheme Details</div>
                    <div style={styles.detailGrid}>
                      <div style={styles.detailItem}><span style={styles.label}>Field Officer</span><span style={styles.value}>{selectedFarmer.fieldOfficer || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Officer Mobile</span><span style={styles.value}>{selectedFarmer.fieldOfficerMobile || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Batch Number</span><span style={styles.value}>{selectedFarmer.batchNumber || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Distribution Date</span><span style={styles.value}>{selectedFarmer.distributionDate || 'N/A'}</span></div>
                      <div style={styles.detailItem}><span style={styles.label}>Form Date</span><span style={styles.value}>{formatDate(selectedFarmer.formDate)}</span></div>
                    </div>
                  </div>
                </>
              )}

              {/* TABS 2-5: ACTIVITY CONTENT IN TABLE FORM */}
              {activeTab !== 'profile' && (
                <div>
                  {activityLoading ? (
                    <div style={styles.spinnerContainer}>
                      <div style={styles.spinner}></div>
                    </div>
                  ) : activityRecords.length === 0 ? (
                    <div style={styles.noActivity}>
                      No {activeTab.toUpperCase()} records filled yet for this farmer.
                    </div>
                  ) : (
                    <div style={styles.tableWrapper}>
                      <table style={styles.table}>
                        <thead>
                          <tr style={styles.thRow}>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Volume / Value</th>
                            <th style={{ ...styles.th, textAlign: 'right' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activityRecords.map((item, index) => {
                            const recordId = item._id || index;
                            const isExpanded = expandedRowId === recordId;

                            return (
                              <React.Fragment key={recordId}>
                                <tr
                                  style={{
                                    ...styles.tr,
                                    backgroundColor: isExpanded ? '#f0fdf4' : '#ffffff',
                                  }}
                                  onClick={() => toggleRowExpansion(recordId)}
                                >
                                  <td style={styles.td}>
                                    <strong>{formatDate(item.activityDate || item.createdAt)}</strong>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                      {formatTime(item.activityDate || item.createdAt)}
                                    </div>
                                  </td>
                                  <td style={styles.td}>{getVolumeOrSummary(item, activeTab)}</td>
                                  <td style={{ ...styles.td, textAlign: 'right' }}>
                                    <span style={styles.expandBadge}>
                                      {isExpanded ? 'Hide Details ▲' : 'View Details ▼'}
                                    </span>
                                  </td>
                                </tr>

                                {isExpanded && (
                                  <tr>
                                    <td colSpan="3" style={styles.expandedTd}>
                                      <div style={styles.expandedBox}>
                                        <div style={styles.activityTitle}>
                                          Full Details — {item.activityType || activeTab} Record #{index + 1}
                                        </div>

                                        {item.image && (
                                          <div style={styles.imageContainer}>
                                            <img
                                              src={`https://microoffsets.nettzero.world/api/${item.image}`}
                                              alt="Activity Attachment"
                                              style={styles.activityImg}
                                            />
                                          </div>
                                        )}

                                        <div style={{ ...styles.detailGrid, marginTop: '1rem' }}>
                                          <div style={styles.detailItem}>
                                            <span style={styles.label}>Date</span>
                                            <span style={styles.value}>{formatDate(item.activityDate || item.createdAt)}</span>
                                          </div>
                                          <div style={styles.detailItem}>
                                            <span style={styles.label}>Time</span>
                                            <span style={styles.value}>{formatTime(item.activityDate || item.createdAt)}</span>
                                          </div>

                                          {activeTab === 'fertilizer' && (
                                            <>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Volume</span>
                                                <span style={styles.value}>{item.volume ? `${item.volume} Litres` : 'N/A'}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Remarks</span>
                                                <span style={styles.value}>{item.remarks || 'N/A'}</span>
                                              </div>
                                            </>
                                          )}

                                          {activeTab === 'water' && (
                                            <>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Motor HP</span>
                                                <span style={styles.value}>{item.motorHP || 'N/A'}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Water Used</span>
                                                <span style={styles.value}>{item.volume ? `${item.volume} Litres` : 'N/A'}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Start Time</span>
                                                <span style={styles.value}>{formatTime(item.startTime)}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>End Time</span>
                                                <span style={styles.value}>{formatTime(item.endTime)}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Duration</span>
                                                <span style={styles.value}>
                                                  {item.durationHours ? `${Number(item.durationHours).toFixed(2)} Hours` : 'N/A'}
                                                </span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Remarks</span>
                                                <span style={styles.value}>{item.remarks || 'N/A'}</span>
                                              </div>
                                            </>
                                          )}

                                          {activeTab === 'harvest' && (
                                            <>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Panicles / m²</span>
                                                <span style={styles.value}>{item.paniclesPerSqm ?? 'N/A'}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Plant Height</span>
                                                <span style={styles.value}>{item.plantHeight ? `${item.plantHeight} cm` : 'N/A'}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Leaf Length</span>
                                                <span style={styles.value}>{item.leafLength ? `${item.leafLength} cm` : 'N/A'}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Leaf Width</span>
                                                <span style={styles.value}>{item.leafWidth ? `${item.leafWidth} cm` : 'N/A'}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Panicle Length</span>
                                                <span style={styles.value}>{item.panicleLength ? `${item.panicleLength} cm` : 'N/A'}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Grains / Panicle</span>
                                                <span style={styles.value}>{item.grainsPerPanicle ?? 'N/A'}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>1000 Seed Weight</span>
                                                <span style={styles.value}>{item.thousandSeedWeight ? `${item.thousandSeedWeight} g` : 'N/A'}</span>
                                              </div>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Remarks</span>
                                                <span style={styles.value}>{item.remarks || 'N/A'}</span>
                                              </div>
                                            </>
                                          )}

                                          {activeTab === 'soil' && (
                                            <>
                                              <div style={styles.detailItem}>
                                                <span style={styles.label}>Remarks</span>
                                                <span style={styles.value}>{item.remarks || 'N/A'}</span>
                                              </div>
                                              {item.soilReport && (
                                                <div style={{ ...styles.detailItem, gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                                                  <a
                                                    href={`https://microoffsets.nettzero.world/api/${item.soilReport}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={styles.actionBtn}
                                                  >
                                                    📄 Download / View Soil Report
                                                  </a>
                                                </div>
                                              )}
                                            </>
                                          )}

                                          {item.location?.latitude && (
                                            <div style={{ ...styles.detailItem, gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                                              <a
                                                href={`https://www.google.com/maps?q=${item.location.latitude},${item.location.longitude}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ ...styles.actionBtn, backgroundColor: '#059669' }}
                                              >
                                                📍 View Location on Google Maps
                                              </a>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS animation keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Inline Styles
const styles = {
  body: {
    backgroundColor: '#f4f7f6',
    color: '#1f2937',
    padding: '2rem 1rem',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  headerH1: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  headerP: {
    color: '#6b7280',
    fontSize: '1rem',
  },
  controls: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  searchBox: {
    position: 'relative',
    flex: 2,
    minWidth: '240px',
  },
  searchInput: {
    width: '100%',
    padding: '0.85rem 1rem 0.85rem 2.75rem',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: '#fff',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  searchIcon: {
    position: 'absolute',
    left: '0.85rem',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    stroke: '#6b7280',
  },
  dateFilterBox: {
    flex: 1,
    minWidth: '200px',
  },
  dateSelect: {
    width: '100%',
    padding: '0.85rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '0.95rem',
    outline: 'none',
    backgroundColor: '#fff',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    color: '#374151',
    cursor: 'pointer',
  },
  countBadgeGroup: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  dateBadge: {
    fontWeight: '600',
    color: '#065f46',
    background: '#d1fae5',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: '1px solid #a7f3d0',
    fontSize: '0.9rem',
  },
  countBadge: {
    fontWeight: '600',
    color: '#6b7280',
    background: '#ffffff',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '0.9rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  farmerName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#111827',
    lineHeight: '1.3',
  },
  idBadge: {
    backgroundColor: '#ecfdf5',
    color: '#047857',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.25rem 0.5rem',
    borderRadius: '6px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  cardBody: {
    fontSize: '0.9rem',
    color: '#6b7280',
    marginBottom: '1.25rem',
  },
  infoRow: {
    display: 'flex',
    justify: 'space-between',
    marginBottom: '0.4rem',
  },
  infoStrong: {
    color: '#374151',
  },
  cardFooter: {
    borderTop: '1px solid #f3f4f6',
    paddingTop: '1rem',
  },
  btn: {
    width: '100%',
    backgroundColor: '#059669',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.6rem 1rem',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  noData: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '3rem',
    color: '#9ca3af',
  },
  spinnerContainer: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem',
  },
  spinner: {
    width: '35px',
    height: '35px',
    border: '4px solid #e5e7eb',
    borderTopColor: '#059669',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justify: 'center',
    alignItems: 'center',
    padding: '1rem',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    maxWidth: '750px',
    width: '100%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
  },
  modalHeaderH2: {
    fontSize: '1.35rem',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
  },
  modalSubHeader: {
    fontSize: '0.85rem',
    color: '#059669',
    fontWeight: '600',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.75rem',
    color: '#9ca3af',
    cursor: 'pointer',
  },
  tabBar: {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    overflowX: 'auto',
  },
  tabBtn: {
    padding: '0.75rem 1rem',
    border: 'none',
    background: 'none',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#6b7280',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    whiteSpace: 'nowrap',
  },
  tabBtnActive: {
    color: '#059669',
    borderBottomColor: '#059669',
    backgroundColor: '#fff',
  },
  modalBody: {
    padding: '1.5rem',
    overflowY: 'auto',
  },
  detailSection: {
    marginBottom: '1.5rem',
  },
  detailSectionTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#374151',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '0.85rem',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    border: '1px solid #f3f4f6',
  },
  label: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  value: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#111827',
  },
  noActivity: {
    textAlign: 'center',
    padding: '2rem',
    color: '#9ca3af',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thRow: {
    borderBottom: '2px solid #e5e7eb',
  },
  th: {
    padding: '0.75rem',
    textAlign: 'left',
    fontSize: '0.85rem',
    color: '#374151',
  },
  tr: {
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer',
  },
  td: {
    padding: '0.75rem',
    fontSize: '0.875rem',
  },
  expandBadge: {
    fontSize: '0.75rem',
    color: '#059669',
    fontWeight: '600',
  },
  expandedTd: {
    padding: '0.75rem',
    backgroundColor: '#f9fafb',
  },
  expandedBox: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#fff',
  },
  activityTitle: {
    fontWeight: '700',
    marginBottom: '0.75rem',
    color: '#111827',
  },
  imageContainer: {
    marginBottom: '1rem',
  },
  activityImg: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  actionBtn: {
    display: 'inline-block',
    backgroundColor: '#2563eb',
    color: '#fff',
    padding: '0.5rem 0.85rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '600',
    textAlign: 'center',
  },
};