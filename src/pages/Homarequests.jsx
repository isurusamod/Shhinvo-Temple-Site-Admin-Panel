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

const PrayerIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
  </svg>
);

const StarIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
  </svg>
);

const Homarequests = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(
    "Online Prayer Requests"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Responsive state
  const [screen, setScreen] = useState({
    isMobile: window.innerWidth <= 600,
    isTablet: window.innerWidth > 600 && window.innerWidth <= 1024,
    isDesktop: window.innerWidth > 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreen({
        isMobile: window.innerWidth <= 600,
        isTablet: window.innerWidth > 600 && window.innerWidth <= 1024,
        isDesktop: window.innerWidth > 1024,
      });

      if (window.innerWidth > 768) {
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

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif",
      position: "relative",
      flexDirection: screen.isMobile ? "column" : "row",
    },
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: screen.isMobile ? "60px" : screen.isTablet ? "70px" : "80px",
      backgroundColor: "#6b7280",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: screen.isMobile ? "0 12px" : "0 20px",
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
      gap: screen.isMobile ? "10px" : "20px",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: screen.isMobile ? "10px" : "15px",
    },
    menuButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: screen.isMobile ? "1.2rem" : "1.5rem",
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
      fontSize: screen.isMobile ? "0.8rem" : "1rem",
      padding: "8px 12px",
    },
    cartIcon: {
      position: "relative",
      color: "white",
      fontSize: screen.isMobile ? "1.2rem" : "1.5rem",
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
      padding: screen.isMobile ? "6px 12px" : "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: screen.isMobile ? "0.8rem" : "0.9rem",
    },
    sidebar: {
      backgroundColor: "#7fb3a3",
      paddingTop: screen.isMobile ? "60px" : "80px",
      minHeight: "100vh",
      position: "fixed",
      width: screen.isMobile ? "80%" : screen.isTablet ? "200px" : "250px",
      left: screen.isMobile ? (sidebarOpen ? "0" : "-100%") : "0",
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
      display: screen.isMobile && sidebarOpen ? "block" : "none",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: screen.isMobile ? "12px 15px" : "15px 20px",
      color: "white",
      cursor: "pointer",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      fontSize: screen.isMobile ? "0.85rem" : "0.95rem",
      transition: "background-color 0.2s",
      borderTopLeftRadius: "30px",
      borderBottomLeftRadius: "30px",
      marginBottom: screen.isMobile ? "15px" : "20px",
    },
    menuItemActive: {
      backgroundColor: "#4b5563",
    },
    menuItemLeft: {
      display: "flex",
      alignItems: "center",
      gap: screen.isMobile ? "8px" : "12px",
    },
    mainContent: {
      marginLeft: screen.isMobile ? "0" : screen.isTablet ? "200px" : "250px",
      marginTop: screen.isMobile ? "60px" : "80px",
      paddingTop: "24px",
      flex: 10,
      padding: screen.isMobile ? "16px" : "24px",
      width: screen.isMobile
        ? "100%"
        : `calc(100% - ${screen.isTablet ? "200px" : "250px"})`,
    },
    pageTitle: {
      fontSize: screen.isMobile ? "24px" : screen.isTablet ? "28px" : "32px",
      fontWeight: "700",
      color: "#374151",
      textAlign: "center",
      marginBottom: "8px",
    },
    pageSubtitle: {
      fontSize: screen.isMobile ? "14px" : screen.isTablet ? "16px" : "18px",
      color: "#6b7280",
      textAlign: "center",
      marginBottom: screen.isMobile ? "24px" : "48px",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: screen.isMobile ? "column" : "row",
      gap: screen.isMobile ? "24px" : "32px",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "800px",
      margin: "0 auto",
      padding: screen.isMobile ? "20px 16px" : "40px 20px",
    },
    requestButton: {
      backgroundColor: "white",
      border: "2px solid #7fb3a3",
      borderRadius: "16px",
      padding: screen.isMobile ? "24px 16px" : "32px 24px",
      width: screen.isMobile ? "100%" : screen.isTablet ? "280px" : "320px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "16px",
    },
    regularButton: {
      backgroundColor: "white",
      border: "2px solid #7fb3a3",
    },
    specialButton: {
      backgroundColor: "white",
      border: "2px solid #f59e0b",
    },
    buttonIcon: {
      color: "#7fb3a3",
      marginBottom: "8px",
    },
    specialButtonIcon: {
      color: "#f59e0b",
      marginBottom: "8px",
    },
    buttonTitle: {
      fontSize: screen.isMobile ? "20px" : "24px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "8px",
    },
    buttonDescription: {
      fontSize: screen.isMobile ? "14px" : "16px",
      color: "#6b7280",
      lineHeight: "1.5",
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
              height: screen.isMobile ? "50px" : "60px",
              objectFit: "contain",
              display: screen.isMobile && sidebarOpen ? "none" : "block",
            }}
          />
          {!screen.isMobile && (
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
      {screen.isMobile && (
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
                if (screen.isMobile) setSidebarOpen(false);
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
                  e.currentTarget.style.backgroundColor = "#4b5563";
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenuItem !== item.name) {
                  e.currentTarget.style.backgroundColor = "transparent";
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
        <h1 style={styles.pageTitle}>Online Prayer Requests</h1>
        <p style={styles.pageSubtitle}>
          Choose the type of prayer request you would like to submit
        </p>

        <div style={styles.buttonContainer}>
          {/* Regular Home Request Button */}
          <div
            style={{
              ...styles.requestButton,
              ...styles.regularButton,
            }}
            onClick={() => navigate("/regular")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              e.currentTarget.style.borderColor = "#5f9ea0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              e.currentTarget.style.borderColor = "#7fb3a3";
            }}
          >
            <div style={styles.buttonIcon}>
              <PrayerIcon />
            </div>
            <h2 style={styles.buttonTitle}>Regular Home Request</h2>
            <p style={styles.buttonDescription}>
              Submit a standard prayer request for daily spiritual guidance,
              blessings, and support for your personal needs and family
              well-being.
            </p>
          </div>

          {/* Special Home Request Button */}
          <div
            style={{
              ...styles.requestButton,
              ...styles.specialButton,
            }}
            onClick={() => navigate("/special")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              e.currentTarget.style.borderColor = "#d97706";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              e.currentTarget.style.borderColor = "#f59e0b";
            }}
          >
            <div style={styles.specialButtonIcon}>
              <StarIcon />
            </div>
            <h2 style={styles.buttonTitle}>Special Home Request</h2>
            <p style={styles.buttonDescription}>
              Submit a special prayer request for urgent matters, significant
              life events, or specific spiritual ceremonies requiring dedicated
              attention.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homarequests;
