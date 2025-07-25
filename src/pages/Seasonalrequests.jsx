"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Custom SVG Icons as components
const PencilIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
    <path d="M12,11L16,15H13V19H11V15H8L12,11Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
  </svg>
);

const PaymentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.11,4 20,4M20,18H4V12H20V18M20,8H4V6H20V8Z" />
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5H5.21L4.27,3H1M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
  </svg>
);

const LogOutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
);

const Homarequests = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(
    "Online Prayer Requests"
  );
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [gratitudeTo, setGratitudeTo] = useState([]);
  const [reasonTo, setReasonTo] = useState({
    division: "",
    lineage_no: "",
    lineage_parent: "",
    request_name: "",
    total_offering: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [detailsTo, setDetailsTo] = useState({
    division: "",
    lineage_no: "",
    lineage_parent: "",
    request_name: "",
    total_offering: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [customReason, setCustomReason] = useState("");

  const [meritTransferTo, setMeritTransferTo] = useState({
    spiritual_consolation_1: "",
    spiritual_consolation_2: "",
    spiritual_consolation_3: "",
    spiritual_consolation_4: "",
    division: "",
    lineage_no: "",
    lineage_parent: "",
    request_name: "",
    total_offering: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Home", icon: HomeIcon, hasSubmenu: true },
    { name: "Online Prayer Requests", icon: PencilIcon, hasSubmenu: true },
    { name: "Upload Prayer Forms", icon: UploadIcon, hasSubmenu: false },
    { name: "Download Prayer Forms", icon: DownloadIcon, hasSubmenu: true },
    { name: "Payments & Offerings", icon: PaymentIcon, hasSubmenu: false },
    { name: "My Basket", icon: ShoppingCartIcon, hasSubmenu: false },
    { name: "Sign Out", icon: LogOutIcon, hasSubmenu: false },
  ];

  const gratitudeOptions = [
    "Buddha",
    "Seiryo-Daigongen",
    "Bodhisattva Metsakutsu",
    "Bezaiten",
    "Kasanori",
    "Ususoma Myo-o",
  ];

  const reasonOptions = [
    { value: "recovery_illness", label: "Recovery From Illness" },
    { value: "family_wellbeing", label: "Family Well-Being" },
    { value: "business_prosperity", label: "Business Prosperity" },
    { value: "safe_delivery", label: "Safe Delivery Of Baby" },
    { value: "education_success", label: "Education Success" },
    { value: "heartfelt_wish", label: "Fulfillment of heartfelt Wish" },
    { value: "long_without_misfortune", label: "Long without Misfortune" },
    { value: "accident_free_travel", label: "Accident-free Travel" },
    { value: "purification", label: "Purification Of" },
    { value: "various_prayer", label: "Various prayer" },
    { value: "custom", label: "Other (please specify)" },
  ];

  const handleGratitudeChange = (option, checked) => {
    if (checked) {
      setGratitudeTo([...gratitudeTo, option]);
    } else {
      setGratitudeTo(gratitudeTo.filter((item) => item !== option));
    }
    // Clear gratitude error when user makes selection
    if (errors.gratitude_to) {
      setErrors((prev) => ({ ...prev, gratitude_to: null }));
    }
  };

  const handleDetailsChange = (field, value) => {
    setDetailsTo((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleMeritTransferChange = (field, value) => {
    setMeritTransferTo((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user types
    if (errors[`merit_${field}`]) {
      setErrors((prev) => ({ ...prev, [`merit_${field}`]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate gratitude_to (must select at least one)
    if (gratitudeTo.length === 0) {
      newErrors.gratitude_to = "Please select at least one gratitude option";
    }

    // Validate reason_to fields (all required)
    if (!reasonTo.division?.trim()) {
      newErrors.reason_division = "Division is required";
    }
    if (!reasonTo.lineage_no?.trim()) {
      newErrors.reason_lineage_no = "Lineage No is required";
    }
    if (!reasonTo.lineage_parent?.trim()) {
      newErrors.reason_lineage_parent = "Lineage Parent is required";
    }
    if (!reasonTo.request_name?.trim()) {
      newErrors.reason_request_name = "Request Name is required";
    }
    if (!reasonTo.total_offering?.trim()) {
      newErrors.reason_total_offering = "Total Offering is required";
    }

    // Validate details_to (all fields required)
    if (!detailsTo.division.trim()) {
      newErrors.division = "Division is required";
    }
    if (!detailsTo.lineage_no.trim()) {
      newErrors.lineage_no = "Lineage No is required";
    }
    if (!detailsTo.lineage_parent.trim()) {
      newErrors.lineage_parent = "Lineage Parent is required";
    }
    if (!detailsTo.request_name.trim()) {
      newErrors.request_name = "Request Name is required";
    }
    if (!detailsTo.total_offering.trim()) {
      newErrors.total_offering = "Total Offering is required";
    }

    // Add Merit Transfer validation in validateForm function
    if (!meritTransferTo.spiritual_consolation_1.trim()) {
      newErrors.merit_spiritual_consolation_1 =
        "First spiritual consolation field is required";
    }
    if (!meritTransferTo.division.trim()) {
      newErrors.merit_division = "Division is required";
    }
    if (!meritTransferTo.lineage_no.trim()) {
      newErrors.merit_lineage_no = "Lineage No is required";
    }
    if (!meritTransferTo.lineage_parent.trim()) {
      newErrors.merit_lineage_parent = "Lineage Parent is required";
    }
    if (!meritTransferTo.request_name.trim()) {
      newErrors.merit_request_name = "Request Name is required";
    }
    if (!meritTransferTo.total_offering.trim()) {
      newErrors.merit_total_offering = "Total Offering is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        gratitude_to: gratitudeTo,
        reason_to: reasonTo,
        details_to: detailsTo,
        merit_transfer_to: meritTransferTo,
      };

      // Here you would send the data to your backend
      console.log("Form Data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Regular Homa Request submitted successfully!");

      // Reset form
      setGratitudeTo([]);
      setReasonTo({
        division: "",
        lineage_no: "",
        lineage_parent: "",
        request_name: "",
        total_offering: "",
        date: new Date().toISOString().split("T")[0],
      });
      setDetailsTo({
        division: "",
        lineage_no: "",
        lineage_parent: "",
        request_name: "",
        total_offering: "",
        date: new Date().toISOString().split("T")[0],
      });
      setMeritTransferTo({
        spiritual_consolation_1: "",
        spiritual_consolation_2: "",
        spiritual_consolation_3: "",
        spiritual_consolation_4: "",
        division: "",
        lineage_no: "",
        lineage_parent: "",
        request_name: "",
        total_offering: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif",
      position: "relative",
    },
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "80px",
      backgroundColor: "#6b7280",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    menuButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "1.5rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: "8px",
    },
    goBackButton: {
      background: "none",
      border: "none",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      padding: "8px 12px",
    },
    cartIcon: {
      position: "relative",
      color: "white",
      fontSize: "1.5rem",
      cursor: "pointer",
      padding: "8px",
    },
    cartBadge: {
      position: "absolute",
      top: "0px",
      right: "0px",
      backgroundColor: "#ef4444",
      color: "white",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      fontSize: "0.75rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    signOutButton: {
      backgroundColor: "#9ca3af",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.9rem",
    },
    sidebar: {
      backgroundColor: "#7fb3a3",
      paddingTop: "80px",
      minHeight: "100vh",
      position: "fixed",
      width: isMobile ? "80%" : "250px",
      left: isMobile ? (sidebarOpen ? "0" : "-100%") : "0",
      transition: "left 0.3s ease",
      zIndex: 999,
      overflowY: "auto",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 998,
      display: isMobile && sidebarOpen ? "block" : "none",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 20px",
      color: "white",
      cursor: "pointer",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      fontSize: "0.95rem",
      transition: "background-color 0.2s",
      borderTopLeftRadius: "30px",
      borderBottomLeftRadius: "30px",
      marginBottom: "20px",
    },
    menuItemActive: {
      backgroundColor: "#4b5563",
    },
    menuItemLeft: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    mainContent: {
      marginLeft: isMobile ? "0" : "250px",
      paddingTop: "80px",
      flex: 1,
      padding: isMobile ? "20px" : "30px",
      width: isMobile ? "100%" : "calc(100% - 250px)",
    },
    formContainer: {
      maxWidth: "1000px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "32px",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "16px",
      textAlign: "center",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      padding: "24px",
      marginBottom: "24px",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "16px",
    },
    errorMessage: {
      color: "#ef4444",
      backgroundColor: "#fee2e2",
      padding: "8px 12px",
      borderRadius: "4px",
      fontSize: "14px",
      marginBottom: "16px",
    },
    checkboxGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "16px",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    checkbox: {
      width: "18px",
      height: "18px",
      accentColor: "#7fb3a3",
      cursor: "pointer",
    },
    checkboxLabel: {
      fontSize: "14px",
      color: "#374151",
      cursor: "pointer",
    },
    radioGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "16px",
    },
    radioContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    radio: {
      width: "18px",
      height: "18px",
      accentColor: "#7fb3a3",
      cursor: "pointer",
    },
    radioLabel: {
      fontSize: "14px",
      color: "#374151",
      cursor: "pointer",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "16px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
    },
    input: {
      padding: "10px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      fontSize: "14px",
      width: "100%",
      outline: "none",
    },
    inputError: {
      border: "1px solid #ef4444",
    },
    errorText: {
      color: "#ef4444",
      fontSize: "12px",
      marginTop: "4px",
    },
    submitButton: {
      backgroundColor: "#7fb3a3",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      display: "block",
      margin: "32px auto 0",
      width: "fit-content",
      minWidth: "200px",
      textAlign: "center",
    },
    submitButtonDisabled: {
      opacity: "0.7",
      cursor: "not-allowed",
    },
    pageTitle: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#374151",
      textAlign: "center",
      marginBottom: "8px",
    },
    pageSubtitle: {
      fontSize: "16px",
      color: "#6b7280",
      textAlign: "center",
      marginBottom: "32px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button
            style={styles.menuButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <img
            src="/logo.png"
            alt="Shinnyo Logo"
            style={{
              height: "60px",
              objectFit: "contain",
              display: isMobile && sidebarOpen ? "none" : "block",
            }}
          />
          {!isMobile && (
            <button
              style={styles.goBackButton}
              onClick={() => window.history.back()}
            >
              <ArrowLeftIcon />
              Go Back
            </button>
          )}
        </div>
        <div style={styles.headerRight}>
          <div style={styles.cartIcon} onClick={() => navigate("/basket")}>
            <ShoppingCartIcon />
            <span style={styles.cartBadge}>0</span>
          </div>
          <button
            style={styles.signOutButton}
            onClick={() => navigate("/login")}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isMobile && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <nav style={styles.sidebar}>
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              style={{
                ...styles.menuItem,
                ...(activeMenuItem === item.name ? styles.menuItemActive : {}),
              }}
              onClick={() => {
                setActiveMenuItem(item.name);
                if (isMobile) setSidebarOpen(false);
                if (item.name === "My Basket") {
                  navigate("/basket");
                } else if (item.name === "Home") {
                  navigate("/home");
                } else if (item.name === "Sign Out") {
                  navigate("/login");
                } else if (item.name === "Online Prayer Requests") {
                  navigate("/prayer-requests");
                } else if (item.name === "Upload Prayer Forms") {
                  navigate("/upload-forms");
                } else if (item.name === "Download Prayer Forms") {
                  navigate("/download-forms");
                } else if (item.name === "Payments & Offerings") {
                  navigate("/Paymentsellection");
                }
              }}
              onMouseEnter={(e) => {
                if (activeMenuItem !== item.name) {
                  e.target.style.backgroundColor = "#4b5563";
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenuItem !== item.name) {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              <div style={styles.menuItemLeft}>
                <IconComponent />
                <span>{item.name}</span>
              </div>
              {item.hasSubmenu && <ChevronRightIcon />}
            </div>
          );
        })}
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            {/* Merit Transfer Request Form */}
            <div
              style={{
                marginTop: "50px",
                borderTop: "2px solid #e5e7eb",
                paddingTop: "30px",
              }}
            >
              <h1 style={styles.pageTitle}>Sesonal </h1>

              <div style={styles.card}>
                <h2 style={styles.cardTitle}>01) Regular Merit Request</h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#374151",
                    marginBottom: "20px",
                  }}
                >
                  I respectfully request spiritual consolation for:
                </p>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <input
                      type="text"
                      value={meritTransferTo.spiritual_consolation_1}
                      onChange={(e) =>
                        handleMeritTransferChange(
                          "spiritual_consolation_1",
                          e.target.value
                        )
                      }
                      placeholder="Enter first spiritual consolation request"
                      style={{
                        ...styles.input,
                        ...(errors.merit_spiritual_consolation_1
                          ? styles.inputError
                          : {}),
                      }}
                    />
                    {errors.merit_spiritual_consolation_1 && (
                      <p style={styles.errorText}>
                        {errors.merit_spiritual_consolation_1}
                      </p>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <input
                      type="text"
                      value={meritTransferTo.spiritual_consolation_2}
                      onChange={(e) =>
                        handleMeritTransferChange(
                          "spiritual_consolation_2",
                          e.target.value
                        )
                      }
                      placeholder="Enter second spiritual consolation request"
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <input
                      type="text"
                      value={meritTransferTo.spiritual_consolation_3}
                      onChange={(e) =>
                        handleMeritTransferChange(
                          "spiritual_consolation_3",
                          e.target.value
                        )
                      }
                      placeholder="Enter third spiritual consolation request"
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <input
                      type="text"
                      value={meritTransferTo.spiritual_consolation_4}
                      onChange={(e) =>
                        handleMeritTransferChange(
                          "spiritual_consolation_4",
                          e.target.value
                        )
                      }
                      placeholder="Enter fourth spiritual consolation request"
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="merit_division" style={styles.label}>
                      Division *
                    </label>
                    <input
                      type="text"
                      id="merit_division"
                      value={meritTransferTo.division}
                      onChange={(e) =>
                        handleMeritTransferChange("division", e.target.value)
                      }
                      placeholder="Enter division"
                      style={{
                        ...styles.input,
                        ...(errors.merit_division ? styles.inputError : {}),
                      }}
                    />
                    {errors.merit_division && (
                      <p style={styles.errorText}>{errors.merit_division}</p>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="merit_lineage_no" style={styles.label}>
                      Lineage No *
                    </label>
                    <input
                      type="text"
                      id="merit_lineage_no"
                      value={meritTransferTo.lineage_no}
                      onChange={(e) =>
                        handleMeritTransferChange("lineage_no", e.target.value)
                      }
                      placeholder="Enter lineage number"
                      style={{
                        ...styles.input,
                        ...(errors.merit_lineage_no ? styles.inputError : {}),
                      }}
                    />
                    {errors.merit_lineage_no && (
                      <p style={styles.errorText}>{errors.merit_lineage_no}</p>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="merit_lineage_parent" style={styles.label}>
                      Lineage Parent *
                    </label>
                    <input
                      type="text"
                      id="merit_lineage_parent"
                      value={meritTransferTo.lineage_parent}
                      onChange={(e) =>
                        handleMeritTransferChange(
                          "lineage_parent",
                          e.target.value
                        )
                      }
                      placeholder="Enter lineage parent"
                      style={{
                        ...styles.input,
                        ...(errors.merit_lineage_parent
                          ? styles.inputError
                          : {}),
                      }}
                    />
                    {errors.merit_lineage_parent && (
                      <p style={styles.errorText}>
                        {errors.merit_lineage_parent}
                      </p>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="merit_request_name" style={styles.label}>
                      Request Name *
                    </label>
                    <input
                      type="text"
                      id="merit_request_name"
                      value={meritTransferTo.request_name}
                      onChange={(e) =>
                        handleMeritTransferChange(
                          "request_name",
                          e.target.value
                        )
                      }
                      placeholder="Enter request name"
                      style={{
                        ...styles.input,
                        ...(errors.merit_request_name ? styles.inputError : {}),
                      }}
                    />
                    {errors.merit_request_name && (
                      <p style={styles.errorText}>
                        {errors.merit_request_name}
                      </p>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="merit_total_offering" style={styles.label}>
                      Total Offering *
                    </label>
                    <input
                      type="text"
                      id="merit_total_offering"
                      value={meritTransferTo.total_offering}
                      onChange={(e) =>
                        handleMeritTransferChange(
                          "total_offering",
                          e.target.value
                        )
                      }
                      placeholder="Enter total offering amount"
                      style={{
                        ...styles.input,
                        ...(errors.merit_total_offering
                          ? styles.inputError
                          : {}),
                      }}
                    />
                    {errors.merit_total_offering && (
                      <p style={styles.errorText}>
                        {errors.merit_total_offering}
                      </p>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="merit_date" style={styles.label}>
                      Date
                    </label>
                    <input
                      type="date"
                      id="merit_date"
                      value={meritTransferTo.date}
                      onChange={(e) =>
                        handleMeritTransferChange("date", e.target.value)
                      }
                      style={{
                        ...styles.input,
                        backgroundColor: "#f9fafb",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Merit Transfer Submit Button */}
              <button
                type="button"
                onClick={async () => {
                  // Validate Merit Transfer form
                  const meritErrors = {};
                  if (!meritTransferTo.spiritual_consolation_1.trim()) {
                    meritErrors.merit_spiritual_consolation_1 =
                      "First spiritual consolation field is required";
                  }
                  if (!meritTransferTo.division.trim()) {
                    meritErrors.merit_division = "Division is required";
                  }
                  if (!meritTransferTo.lineage_no.trim()) {
                    meritErrors.merit_lineage_no = "Lineage No is required";
                  }
                  if (!meritTransferTo.lineage_parent.trim()) {
                    meritErrors.merit_lineage_parent =
                      "Lineage Parent is required";
                  }
                  if (!meritTransferTo.request_name.trim()) {
                    meritErrors.merit_request_name = "Request Name is required";
                  }
                  if (!meritTransferTo.total_offering.trim()) {
                    meritErrors.merit_total_offering =
                      "Total Offering is required";
                  }

                  if (Object.keys(meritErrors).length > 0) {
                    setErrors(meritErrors);
                    return;
                  }

                  setIsSubmitting(true);
                  try {
                    console.log("Merit Transfer Data:", meritTransferTo);
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    alert("Merit Transfer Request submitted successfully!");

                    // Reset Merit Transfer form
                    setMeritTransferTo({
                      spiritual_consolation_1: "",
                      spiritual_consolation_2: "",
                      spiritual_consolation_3: "",
                      spiritual_consolation_4: "",
                      division: "",
                      lineage_no: "",
                      lineage_parent: "",
                      request_name: "",
                      total_offering: "",
                      date: new Date().toISOString().split("T")[0],
                    });
                  } catch (error) {
                    console.error(
                      "Error submitting Merit Transfer form:",
                      error
                    );
                    alert("Error submitting form. Please try again.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                disabled={isSubmitting}
                style={{
                  ...styles.submitButton,
                  ...(isSubmitting ? styles.submitButtonDisabled : {}),
                }}
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Merit Transfer Request"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Homarequests;
