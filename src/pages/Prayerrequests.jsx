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

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
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

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Prayer Requests");
  const [deviceType, setDeviceType] = useState("desktop");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Responsive helpers
  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";

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
      if (width < 640) {
        setDeviceType("mobile");
        setSidebarOpen(false);
      } else if (width >= 640 && width < 1024) {
        setDeviceType("tablet");
        setSidebarOpen(true);
      } else {
        setDeviceType("desktop");
        setSidebarOpen(true);
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
    { name: "Home", icon: HomeIcon, hasSubmenu: true, path: "/home" },
    {
      name: "Prayer Requests",
      icon: PencilIcon,
      hasSubmenu: true,
      path: "/prayerrequests",
    },
    { name: "Reports", icon: LogOutIcon, hasSubmenu: false, path: "/reports" },
    {
      name: "Manage Forms",
      icon: UploadIcon,
      hasSubmenu: false,
      path: "/forms",
    },
    {
      name: "Manage Administrators",
      icon: DownloadIcon,
      hasSubmenu: true,
      path: "/administrators",
    },
    {
      name: "White IP Address",
      icon: PaymentIcon,
      hasSubmenu: false,
      path: "/address",
    },
    {
      name: "Profile",
      icon: ShoppingCartIcon,
      hasSubmenu: false,
      path: "/profile",
    },
    { name: "Sign Out", icon: LogOutIcon, hasSubmenu: false, path: "/login" },
  ];

  const sidebarWidth = isMobile ? "75vw" : isTablet ? "200px" : "250px";

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
      height: isMobile ? "56px" : isTablet ? "64px" : "80px",
      backgroundColor: "#5C4033",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "0 8px" : isTablet ? "0 12px" : "0 20px",
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "6px" : isTablet ? "10px" : "16px",
      
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "6px" : isTablet ? "8px" : "12px",
      padding: isMobile ? "6px" : isTablet ? "8px" : "10px",
      borderRadius: "8px",
    },
    menuButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: isMobile ? "1.1rem" : isTablet ? "1.2rem" : "1.5rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: isMobile ? "6px" : isTablet ? "7px" : "8px",
      
    },
    cartIcon: {
      position: "relative",
      color: "white",
      fontSize: isMobile ? "1.1rem" : isTablet ? "1.2rem" : "1.5rem",
      cursor: "pointer",
      padding: isMobile ? "6px" : isTablet ? "7px" : "8px",
      
    },
    cartBadge: {
      position: "absolute",
      top: isMobile ? "-4px" : isTablet ? "-3px" : "-2px",
      right: isMobile ? "-4px" : isTablet ? "-3px" : "-2px",
      backgroundColor: "#ef4444",
      color: "white",
      borderRadius: "50%",
      width: isMobile ? "14px" : isTablet ? "16px" : "18px",
      height: isMobile ? "14px" : isTablet ? "16px" : "18px",
      fontSize: isMobile ? "0.6rem" : isTablet ? "0.65rem" : "0.7rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    signOutButton: {
      backgroundColor: "#9ca3af",
      color: "white",
      border: "none",
      padding: isMobile ? "4px 8px" : isTablet ? "6px 10px" : "8px 14px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: isMobile ? "0.7rem" : isTablet ? "0.8rem" : "0.9rem",
    },
    sidebar: {
      backgroundColor: "#5C4033",
      paddingTop: isMobile ? "56px" : isTablet ? "64px" : "80px",
      minHeight: "100vh",
      position: "fixed",
      width: sidebarWidth,
      left: isMobile
        ? sidebarOpen
          ? "0"
          : "-75vw"
        : isTablet
        ? sidebarOpen
          ? "0"
          : "-200px"
        : "0",
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
      display: (isMobile || isTablet) && sidebarOpen ? "block" : "none",
      
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
      backgroundColor: "#87644b",
      
    },
    menuItemLeft: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "6px" : isTablet ? "8px" : "10px",
      
    },
    mainContent: {
      marginLeft: isMobile
        ? "0"
        : isTablet
        ? sidebarOpen
          ? "200px"
          : "0"
        : "250px",
      paddingTop: isMobile ? "56px" : isTablet ? "64px" : "80px",
      flex: 1,
      padding: isMobile ? "8px" : isTablet ? "12px" : "20px",
      width: isMobile
        ? "100%"
        : isTablet
        ? sidebarOpen
          ? "calc(100% - 200px)"
          : "100%"
        : "calc(100% - 250px)",
      minHeight: "100vh",
      backgroundColor: "#f9f9f9",
      transition: "margin-left 0.3s ease, width 0.3s ease",
      
    },
    contentContainer: {
      position: "relative",
      backgroundColor: "white",
      padding: isMobile ? "24px 12px" : isTablet ? "32px 16px" : "40px 24px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      maxWidth: isMobile ? "100%" : isTablet ? "90%" : "1000px",
      margin: isMobile ? "16px auto" : isTablet ? "24px auto" : "32px auto",
      minHeight: isMobile ? "400px" : "500px",
      top: 30,
    
    },
    heading: {
      fontSize: isMobile ? "1.2rem" : isTablet ? "1.4rem" : "1.5rem",
      fontWeight: 600,
      marginBottom: isMobile ? "16px" : isTablet ? "20px" : "24px",
      textAlign: "left",
      color: "#222",
      marginTop: isMobile ? "-4%" : "-2%",
 
    },
    hr: {
      border: "none",
      borderTop: "2px solid #ccc",
      width: "100%",
      marginBottom: isMobile ? "16px" : isTablet ? "20px" : "24px",
    },
    cardsGrid: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: isMobile ? "center" : "space-around",
      alignItems: "center",
      gap: isMobile ? "16px" : isTablet ? "24px" : "32px",
      flexWrap: "wrap",
    },
    cardButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      outline: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    cardImage: {
      width: isMobile ? "120px" : isTablet ? "160px" : "200px",
      height: isMobile ? "120px" : isTablet ? "160px" : "200px",
    },
    cardText: {
      fontSize: isMobile ? "0.9rem" : isTablet ? "1rem" : "1.1rem",
      fontWeight: 500,
      color: "#222",
      marginTop: isMobile ? "8px" : "10px",
    },
    error: {
      color: "#ef4444",
      fontSize: isMobile ? "0.75rem" : isTablet ? "0.8rem" : "0.9rem",
      textAlign: "center",
      marginBottom: isMobile ? "12px" : isTablet ? "16px" : "20px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
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

          <div style={styles.headerRight}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#5C4033",
                padding: "8px 12px",
                borderRadius: "8px",
                color: "white",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png" // Using placeholder image
                alt="User Avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Shinnyo Admin
                </div>
                <div style={{ fontSize: "0.9rem" }}>
                  User <span style={{ marginLeft: "4px" }}>▼</span>
                </div>
              </div>
            </div>
            {/* <div style={styles.cartIcon} onClick={() => navigate("/basket")}>
              <ShoppingCartIcon />
              {cartCount > 0 && (
                <span style={styles.cartBadge}>{cartCount}</span>
              )}
            </div> */}
          </div>
        </div>
      </header>
      {/* Sidebar Overlay */}
      {(isMobile || isTablet) && (
        <div
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <nav style={styles.sidebar} aria-label="Sidebar navigation">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveMenuItem(item.name);
                if (isMobile || isTablet) setSidebarOpen(false);
                if (item.name === "Sign Out") {
                  localStorage.removeItem("jwtToken");
                  navigate("/login");
                } else {
                  navigate(item.path);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }}
              style={{
                ...styles.menuItem,
                ...(activeMenuItem === item.name ? styles.menuItemActive : {}),
              }}
              onMouseEnter={(e) => {
                if (activeMenuItem !== item.name) {
                  e.currentTarget.style.backgroundColor = "#73543F";
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenuItem !== item.name) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
              aria-label={item.name}
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
        <div style={styles.contentContainer}>
          {error && <div style={styles.error}>{error}</div>}
          <h2 style={styles.heading}>PRAYER REQUESTS</h2>
          <hr style={styles.hr} />
          <div style={styles.cardsGrid}>
            {/* Portrait Button */}
            <button
              style={styles.cardButton}
              onClick={() => navigate("/requestsp")}
              aria-label="Go to Portrait Forms"
            >
              <img
                src="/portrait.png"
                alt="Portrait Form"
                style={styles.cardImage}
              />
              <span style={styles.cardText}>PORTRAIT FORMS</span>
            </button>

            {/* Landscape Button */}
            <button
              style={styles.cardButton}
              onClick={() => navigate("/requestslandscape")}
              aria-label="Go to Landscape Forms"
            >
              <img
                src="/lankdscape.png"
                alt="Landscape Form"
                style={styles.cardImage}
              />
              <span style={styles.cardText}>LANDSCAPE FORMS</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
