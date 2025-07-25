"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Custom SVG Icons
const PencilIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V12H20V18M20,8H4V6H20V8Z" />
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

const QuestionMarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,12H10A2,2 0 0,1 12,10A2,2 0 0,1 14,12C14,13 13,13.5 12,15H10V14.5C10,13.5 11,13 12,12.5A4,4 0 0,0 12,6Z" />
  </svg>
);

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Home");
  const [deviceType, setDeviceType] = useState("desktop");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPrayerModal, setShowPrayerModal] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCartCount = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setError("No authentication token found. Please log in.");
          navigate("/login");
          return;
        }

        const API_URL = process.env.REACT_APP_API_URL || "/api";
        const response = await fetch(`${API_URL}/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Session expired. Please log in again.");
            localStorage.removeItem("jwtToken");
            navigate("/login");
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.user && typeof data.user.cart_count === "number") {
          setCartCount(data.user.cart_count);
        } else {
          setError(
            "Unexpected response structure. Expected 'user.cart_count'."
          );
          setCartCount(0);
        }
      } catch (err) {
        console.error("Error fetching cart count:", err);
        if (isMounted) {
          setError(
            err.message.includes("Failed to fetch")
              ? "Unable to connect to the server. Please check your network or contact the backend team."
              : `Failed to fetch cart count: ${err.message}`
          );
          setCartCount(0);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }

      if (width >= 768) {
        setSidebarOpen(false);
      }
    };

    fetchCartCount();
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);

  const menuItems = [
    { name: "Home", icon: HomeIcon, hasSubmenu: true },
    { name: "Prayer Requests", icon: PencilIcon, hasSubmenu: true },
    { name: "Reports", icon: LogOutIcon, hasSubmenu: false },
    { name: "Manage Forms", icon: UploadIcon, hasSubmenu: false },
    { name: "Manage Administrators", icon: DownloadIcon, hasSubmenu: true },
    { name: "While IP Address", icon: PaymentIcon, hasSubmenu: false },
    { name: "Profile", icon: ShoppingCartIcon, hasSubmenu: false },
    { name: "Sign Out", icon: LogOutIcon, hasSubmenu: false },
  ];

  const dashboardCards = [
    {
      title: "Total Prayer Requests for Today",
      value: 0,
      subText: "Total prayer requests for yesterday: 0\n08-07-2025",
    },
    {
      title: "Number of Unprinted Forms",
      value: 0,
      subText: "Last print-out by Hiro\n18-04-2025",
    },
  ];

  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";

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
      height: isMobile ? "70px" : "80px",
      backgroundColor: "#5C4033",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "0 10px" : "0 20px",
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "10px" : "20px",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "10px" : "15px",
    },
    menuButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: isMobile ? "1.2rem" : "1.5rem",
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
      fontSize: isMobile ? "0.8rem" : "1rem",
      padding: "8px 12px",
    },
    cartIcon: {
      position: "relative",
      color: "white",
      fontSize: isMobile ? "1.2rem" : "1.5rem",
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
      padding: isMobile ? "6px 12px" : "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: isMobile ? "0.8rem" : "0.9rem",
    },
    sidebar: {
      backgroundColor: "#5C4033",
      paddingTop: isMobile ? "70px" : "80px",
      minHeight: "100vh",
      position: "fixed",
      width: isMobile ? "80%" : isTablet ? "220px" : "250px",
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
      padding: isMobile ? "12px 15px" : "15px 20px",
      color: "white",
      cursor: "pointer",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      transition: "background-color 0.2s",
      borderTopLeftRadius: "30px",
      borderBottomLeftRadius: "30px",
      marginBottom: isMobile ? "15px" : "20px",
    },
    menuItemActive: {
      backgroundColor: "#4b5563",
    },
    menuItemLeft: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "8px" : "12px",
    },
    mainContent: {
      marginLeft: isMobile ? "0" : isTablet ? "220px" : "250px",
      paddingTop: isMobile ? "70px" : "80px",
      flex: 1,
      padding: isMobile ? "15px" : "25px",
      width: isMobile ? "100%" : `calc(100% - ${isTablet ? "220px" : "250px"})`,
    },
    breadcrumb: {
      display: "flex",
      alignItems: "center",
      marginBottom: isMobile ? "20px" : "30px",
      color: "#6b7280",
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      gap: "8px",
    },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: isMobile ? "15px" : "20px",
      width: "100%",
      marginTop: isMobile ? "20px" : "30px",
    },
    card: {
      backgroundColor: "#5C4033",
      borderRadius: "12px",
      padding: deviceType === "mobile" ? "15px" : "20px",
      textAlign: "center",
      color: "white",
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s, border 0.2s",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "3px solid transparent",
      height: deviceType === "mobile" ? "220px" : "380px", // 👈 added
      width: deviceType === "mobile" ? "95%" : "90%",
      margin: "0 auto",
      marginTop: deviceType === "mobile" ? "15px" : "20px",
    },
    cardTitle: {
      fontSize: deviceType === "mobile" ? "1.1rem" : "1.3rem",
      fontWeight: "600",
      marginBottom: deviceType === "mobile" ? "10px" : "15px",
      lineHeight: "1.3",
    },
    cardValue: {
      fontSize: deviceType === "mobile" ? "2.5rem" : "3rem",
      fontWeight: "700",
      marginBottom: deviceType === "mobile" ? "10px" : "15px",
    },
    cardDescription: {
      fontSize: deviceType === "mobile" ? "0.8rem" : "0.95rem",
      opacity: 0.9,
      lineHeight: "1.4",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1001,
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: deviceType === "mobile" ? "20px" : "30px",
      maxWidth: deviceType === "mobile" ? "95%" : "800px",
      width: "90%",
      position: "relative",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    },
    modalHeader: {
      fontSize: deviceType === "mobile" ? "1.2rem" : "1.5rem",
      fontWeight: "600",
      marginBottom: deviceType === "mobile" ? "20px" : "30px",
      textAlign: "center",
      color: "#374151",
    },
    modalGrid: {
      display: "grid",
      gridTemplateColumns: deviceType === "mobile" ? "1fr" : "repeat(3, 1fr)",
      gap: deviceType === "mobile" ? "15px" : "20px",
      marginBottom: deviceType === "mobile" ? "20px" : "30px",
    },
    modalCard: {
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      padding: deviceType === "mobile" ? "15px" : "20px",
      textAlign: "center",
      backgroundColor: "#f9fafb",
      position: "relative",
    },
    modalCardTitle: {
      fontSize: deviceType === "mobile" ? "0.95rem" : "1.1rem",
      fontWeight: "600",
      marginBottom: deviceType === "mobile" ? "10px" : "15px",
      color: "#374151",
    },
    modalRequestButton: {
      backgroundColor: "#6b7280",
      color: "white",
      border: "none",
      padding: deviceType === "mobile" ? "8px 15px" : "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: deviceType === "mobile" ? "0.8rem" : "0.9rem",
      fontWeight: "600",
    },
    modalHelpIcon: {
      position: "absolute",
      top: "10px",
      right: "10px",
      color: "#6b7280",
      cursor: "pointer",
    },
    modalCloseButton: {
      backgroundColor: "#6b7280",
      color: "white",
      border: "none",
      padding: deviceType === "mobile" ? "8px 15px" : "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: deviceType === "mobile" ? "0.8rem" : "0.9rem",
      float: "right",
    },
    closeIcon: {
      position: "absolute",
      top: deviceType === "mobile" ? "10px" : "15px",
      right: deviceType === "mobile" ? "10px" : "15px",
      background: "none",
      border: "none",
      fontSize: deviceType === "mobile" ? "1.2rem" : "1.5rem",
      cursor: "pointer",
      color: "#6b7280",
    },
    error: {
      color: "#ef4444",
      fontSize: deviceType === "mobile" ? "0.8rem" : "0.9rem",
      textAlign: "center",
      marginBottom: deviceType === "mobile" ? "15px" : "20px",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          ></div>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* Left Side - Logo */}
            <img
              src="/logo.png"
              alt="Shinnyo Logo"
              style={{
                height: "60px",
                objectFit: "contain",
                display: isMobile && sidebarOpen ? "none" : "block",
              }}
            />

            {/* Right Side - Toggle Button */}
            <button
              style={styles.menuButton}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* {!isMobile && (
            <button style={styles.goBackButton} onClick={() => window.history.back()}>
          
            </button>
          )} */}
        </div>
        <div style={styles.headerRight}>
          <div style={styles.cartIcon} onClick={() => navigate("/basket")}>
            <ShoppingCartIcon />
            <span style={styles.cartBadge}>
              {isLoading ? "..." : cartCount}
            </span>
          </div>
          <button
            style={styles.signOutButton}
            onClick={() => {
              localStorage.removeItem("jwtToken");
              navigate("/login");
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {isMobile && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

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
                  localStorage.removeItem("jwtToken");
                  navigate("/login");
                } else if (item.name === "Prayer Requests") {
                  navigate("/prayerrequests");
                } else if (item.name === "Reports") {
                  navigate("/reports");
                } else if (item.name === "Manage Forms") {
                  navigate("/forms");
                } else if (item.name === "While IP Address") {
                  navigate("/address");
                } else if (item.name === "Download Prayer Forms") {
                  navigate("/download-forms");
                } else if (item.name === "Payments & Offerings") {
                  navigate("/Offerings");
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

      <main style={styles.mainContent}>
        <div style={{ padding: "50px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* Home Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="34"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ marginRight: "5px" }}
            >
              <path d="M12 3l8 8h-3v7h-4v-5h-2v5H7v-7H4z" />
            </svg>

            {/* Separator */}
            <span
              style={{ margin: "0 8px", fontSize: "1.89rem", color: "#6B7280" }}
            >
              /
            </span>

            {/* Dashboard Text */}
            <h2
              style={{
                fontSize: "1.00rem",
                margin: 0,
              
                fontWeight: "normal",
                color: "#1F2937",
                padding: "20px",
              }}
            >
              Dashboard
            </h2>
          </div>

          <div style={styles.cardsGrid}>
            {dashboardCards.map((card, index) => (
              <div key={index} style={styles.card}>
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.cardValue}>{card.value}</p>
                <p style={styles.cardDescription}>
                  {card.subText.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
