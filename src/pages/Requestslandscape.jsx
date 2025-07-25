"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// SVG Icons as components
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

// Custom Toggle Switch Component
const ToggleSwitch = ({ initialChecked, onToggle }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={handleToggle}
    >
      <div
        style={{
          width: "40px",
          height: "20px",
          borderRadius: "10px",
          backgroundColor: isChecked ? "#8B4513" : "#ccc",
          position: "relative",
          transition: "background-color 0.3s",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: "white",
            position: "absolute",
            top: "2px",
            left: isChecked ? "22px" : "2px",
            transition: "left 0.3s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Prayer Requests");
  const [deviceType, setDeviceType] = useState("desktop");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([
    {
      request: "Ullambana and Merit Transfer Service for All Souls",
      reference: "B30062530b",
      paymentType: "Bank Transfer",
      requestedDate: "01-07-2025",
      requesterName: "John Doe",
      status: "Printed",
      printedBy: "Alice",
      isPrinted: true,
    },
    {
      request: "Seasonal - Oseagaki Bound Form",
      reference: "B29062540c",
      paymentType: "Credit Card",
      requestedDate: "02-07-2025",
      requesterName: "Jane Smith",
      printedBy: "Bob",
      isPrinted: false,
    },
    {
      request: "Ullambana and Merit Transfer Service for All Souls",
      reference: "B31062550d",
      paymentType: "Bank Transfer",
      requestedDate: "03-07-2025",
      requesterName: "Mike Johnson",
      printedBy: "Charlie",
      isPrinted: true,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const navigate = useNavigate();

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
        const API_URL =
          process.env.REACT_APP_API_URL || "http://localhost:3000/api";
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
          setError("Unexpected response structure.");
          setCartCount(0);
        }
      } catch (err) {
        console.error("Error fetching cart count:", err);
        if (isMounted) {
          setError("Failed to fetch cart count. Please try again.");
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
        setSidebarOpen(false);
      } else if (width < 1024) {
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
    { menuName: "Home", icon: HomeIcon, hasSubmenu: true, path: "/home" },
    {
      menuName: "Prayer Requests",
      icon: PencilIcon,
      hasSubmenu: true,
      path: "/prayerrequests",
    },
    {
      menuName: "Reports",
      icon: PencilIcon,
      hasSubmenu: true,
      path: "/reports",
    },
    {
      menuName: "Manage Forms",
      icon: UploadIcon,
      hasSubmenu: false,
      path: "/upload",
    },
    {
      menuName: "Manage Administrators",
      icon: DownloadIcon,
      hasSubmenu: true,
      path: "/download-forms",
    },
    {
      menuName: "White IP Address",
      icon: PaymentIcon,
      hasSubmenu: false,
      path: "/address",
    },
    {
      menuName: "Profile",
      icon: ShoppingCartIcon,
      hasSubmenu: false,
      path: "/profile",
    },
    {
      menuName: "Sign Out",
      icon: LogOutIcon,
      hasSubmenu: false,
      path: "/login",
    },
  ];

  const handleMenuClick = (item) => {
    setActiveMenuItem(item.menuName);
    if (deviceType === "mobile") setSidebarOpen(false);
    if (item.menuName === "Sign Out") {
      localStorage.removeItem("jwtToken");
    }
    navigate(item.path);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = requests.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(requests.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePrintedStatusToggle = (index, newState) => {
    setRequests((prevRequests) =>
      prevRequests.map((req, i) =>
        i === index ? { ...req, isPrinted: newState } : req
      )
    );
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const sidebarWidth =
    deviceType === "mobile"
      ? "80%"
      : deviceType === "tablet"
      ? "200px"
      : "250px";
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif",
    
    },
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height:
        deviceType === "mobile"
          ? "60px"
          : deviceType === "tablet"
          ? "70px"
          : "80px",
      backgroundColor: "#5C4033",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding:
        deviceType === "mobile"
          ? "0 10px"
          : deviceType === "tablet"
          ? "0 15px"
          : "0 20px",
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
      gap:
        deviceType === "mobile"
          ? "8px"
          : deviceType === "tablet"
          ? "12px"
          : "20px",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap:
        deviceType === "mobile"
          ? "8px"
          : deviceType === "tablet"
          ? "10px"
          : "15px",
    },
    menuButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize:
        deviceType === "mobile"
          ? "1.2rem"
          : deviceType === "tablet"
          ? "1.3rem"
          : "1.5rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: "8px",
      
    },
    cartIcon: {
      position: "relative",
      color: "white",
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
    sidebar: {
      backgroundColor: "#5C4033",
      paddingTop:
        deviceType === "mobile"
          ? "60px"
          : deviceType === "tablet"
          ? "70px"
          : "80px",
      minHeight: "100vh",
      position: "fixed",
      width: sidebarWidth,
      left: deviceType === "mobile" ? (sidebarOpen ? "0" : "-100%") : "0",
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
      display: deviceType === "mobile" && sidebarOpen ? "block" : "none",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      padding:
        deviceType === "mobile"
          ? "12px 15px"
          : deviceType === "tablet"
          ? "14px 18px"
          : "15px 20px",
      color: "white",
      cursor: "pointer",
      fontSize:
        deviceType === "mobile"
          ? "0.9rem"
          : deviceType === "tablet"
          ? "0.95rem"
          : "1rem",
      transition: "background-color 0.2s",
      borderLeft: "none",
    },
    menuItemHover: {
      backgroundColor: "#4b5563",
    },
    menuItemLeft: {
      display: "flex",
      alignItems: "center",
      gap:
        deviceType === "mobile"
          ? "10px"
          : deviceType === "tablet"
          ? "12px"
          : "14px",
    },
    mainContent: {
      marginLeft:
        deviceType === "mobile"
          ? "0"
          : deviceType === "tablet"
          ? "200px"
          : "250px",
      paddingTop:
        deviceType === "mobile"
          ? "80px"
          : deviceType === "tablet"
          ? "90px"
          : "100px",
      flex: 1,
      padding:
        deviceType === "mobile"
          ? "10px"
          : deviceType === "tablet"
          ? "15px 20px"
          : "25px",
      width:
        deviceType === "mobile"
          ? "100%"
          : `calc(100% - ${deviceType === "tablet" ? "200px" : "250px"})`,
      backgroundColor: "#f9f9f9",
      display: "flex",
      justifyContent: "center",
    },
    contentWrapper: {
      maxWidth:
        deviceType === "mobile"
          ? "100%"
          : deviceType === "tablet"
          ? "600px"
          : "100%",
      width: "100%",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop:
        deviceType === "mobile"
          ? "10px"
          : deviceType === "tablet"
          ? "15px"
          : "20px",
    },
    th: {
      backgroundColor: "#f2f2f2",
      padding:
        deviceType === "mobile"
          ? "8px"
          : deviceType === "tablet"
          ? "10px"
          : "12px",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
      fontSize:
        deviceType === "mobile"
          ? "0.8rem"
          : deviceType === "tablet"
          ? "0.9rem"
          : "1rem",
    },
    thSortIcon: {
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "0.7em",
      color: "#888",
    },
    td: {
      padding:
        deviceType === "mobile"
          ? "8px"
          : deviceType === "tablet"
          ? "10px"
          : "12px",
      borderBottom: "1px solid #ddd",
      fontSize:
        deviceType === "mobile"
          ? "0.75rem"
          : deviceType === "tablet"
          ? "0.85rem"
          : "0.9rem",
      textAlign: "left",
       
    },
    checkbox: {
      margin: 0,
      width: "16px",
      height: "16px",
      cursor: "pointer",
    },
    status: {
      padding: "4px 8px",
      borderRadius: "12px",
      color: "#0f5132",
      display: "inline-block",
    },
    inputField: {
      padding:
        deviceType === "mobile"
          ? "4px 8px"
          : deviceType === "tablet"
          ? "5px 10px"
          : "6px 10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize:
        deviceType === "mobile"
          ? "0.8rem"
          : deviceType === "tablet"
          ? "0.9rem"
          : "1rem",
         
    },
    paginationButton: {
      padding:
        deviceType === "mobile"
          ? "4px 6px"
          : deviceType === "tablet"
          ? "5px 7px"
          : "4px 8px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      cursor: "pointer",
      fontSize:
        deviceType === "mobile"
          ? "0.7rem"
          : deviceType === "tablet"
          ? "0.75rem"
          : "0.8rem",
    },
    paginationButtonActive: {
      backgroundColor: "#8B4513",
      color: "white",
      borderColor: "#8B4513",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={styles.headerLeft}>
            <img
              src="/logo.png"
              alt="Shinnyo Logo"
              style={{
                height:
                  deviceType === "mobile"
                    ? "40px"
                    : deviceType === "tablet"
                    ? "50px"
                    : "60px",
                objectFit: "contain",
                display:
                  deviceType === "mobile" && sidebarOpen ? "none" : "block",
                marginRight:
                  deviceType === "mobile"
                    ? "8px"
                    : deviceType === "tablet"
                    ? "12px"
                    : "16px",
              }}
            />
            {deviceType === "mobile" && (
              <button
                style={styles.menuButton}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              >
                {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            )}
          </div>
          <div style={styles.headerRight}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#5C4033",
                padding:
                  deviceType === "mobile"
                    ? "6px 8px"
                    : deviceType === "tablet"
                    ? "7px 10px"
                    : "8px 12px",
                borderRadius: "8px",
                color: "white",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="User Avatar"
                style={{
                  width:
                    deviceType === "mobile"
                      ? "30px"
                      : deviceType === "tablet"
                      ? "35px"
                      : "40px",
                  height:
                    deviceType === "mobile"
                      ? "30px"
                      : deviceType === "tablet"
                      ? "35px"
                      : "40px",
                  borderRadius: "50%",
                  marginRight:
                    deviceType === "mobile"
                      ? "6px"
                      : deviceType === "tablet"
                      ? "8px"
                      : "10px",
                }}
              />
              <div>
                <div
                  style={{
                    fontSize:
                      deviceType === "mobile"
                        ? "0.9rem"
                        : deviceType === "tablet"
                        ? "0.95rem"
                        : "1rem",
                    fontWeight: 600,
                  }}
                >
                  Shinnyo Admin
                </div>
                <div
                  style={{
                    fontSize:
                      deviceType === "mobile"
                        ? "0.7rem"
                        : deviceType === "tablet"
                        ? "0.8rem"
                        : "0.9rem",
                  }}
                >
                  User <span style={{ marginLeft: "4px" }}>▼</span>
                </div>
              </div>
            </div>
            {/* <div style={styles.cartIcon} onClick={() => navigate("/basket")}>
              <ShoppingCartIcon />
              {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
            </div> */}
          </div>
        </div>
      </header>
      {deviceType === "mobile" && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}
      <nav style={styles.sidebar}>
        {menuItems.map((item, index) => {
          const { menuName, icon: Icon } = item;
          return (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => handleMenuClick(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleMenuClick(item);
                }
              }}
              style={{
                ...styles.menuItem,
                ...(activeMenuItem === menuName
                  ? {
                      ...styles.menuItem,
                      backgroundColor: "#4b5563",
                      borderLeft: "4px solid #8B4513",
                    }
                  : {}),
              }}
              onMouseEnter={(e) => {
                if (activeMenuItem !== menuName)
                  e.currentTarget.style.backgroundColor = "#4b5563";
              }}
              onMouseLeave={(e) => {
                if (activeMenuItem !== menuName)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div style={styles.menuItemLeft}>
                <Icon />
                <span>{menuName}</span>
              </div>
              {item.hasSubmenu && <ChevronRightIcon />}
            </div>
          );
        })}
      </nav>
      <main style={styles.mainContent}>
        <div style={styles.contentWrapper}>
          <div
            style={{
              backgroundColor: "white",
              padding:
                deviceType === "mobile"
                  ? "15px"
                  : deviceType === "tablet"
                  ? "18px"
                  : "20px",
              borderRadius: "12px",
              margin:
                deviceType === "mobile"
                  ? "10px"
                  : deviceType === "tablet"
                  ? "15px"
                  : "20px",
            }}
          >
            {error && (
              <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
            )}
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <h2
                  style={{
                    fontSize:
                      deviceType === "mobile"
                        ? "1.2rem"
                        : deviceType === "tablet"
                        ? "1.3rem"
                        : "1.5rem",
                    fontWeight: 600,
                    marginBottom: "20px",
                    textAlign: "left",
                    color: "#222",
                    marginTop:
                      deviceType === "mobile"
                        ? "10px"
                        : deviceType === "tablet"
                        ? "15px"
                        : "20px",
                  }}
                >
                  PRAYER REQUESTS
                </h2>
                <hr
                  style={{
                    border: "none",
                    borderTop: "2px solid #ccc",
                    marginBottom: "20px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      deviceType === "mobile"
                        ? "column"
                        : deviceType === "tablet"
                        ? "column"
                        : "row",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                    gap:
                      deviceType === "mobile"
                        ? "8px"
                        : deviceType === "tablet"
                        ? "12px"
                        : "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    Show{" "}
                    <select
                      style={styles.inputField}
                      onChange={handleEntriesPerPageChange}
                      value={entriesPerPage}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>{" "}
                    entries
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection:
                        deviceType === "mobile"
                          ? "column"
                          : deviceType === "tablet"
                          ? "column"
                          : "row",
                      gap:
                        deviceType === "mobile"
                          ? "6px"
                          : deviceType === "tablet"
                          ? "10px"
                          : "8px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Select date range"
                      style={styles.inputField}
                    />
                    <input
                      type="text"
                      placeholder="Search"
                      style={styles.inputField}
                    />
                  </div>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>
                          <input type="checkbox" style={styles.checkbox} />
                        </th>
                        <th style={styles.th}>Request</th>
                        <th style={{ ...styles.th, textAlign: "center" }}>
                          View
                        </th>
                        <th style={styles.th}>Reference</th>
                        <th style={styles.th}>Payment Type</th>
                        <th style={styles.th}>Requested Date</th>
                        <th style={styles.th}>Requester's Name</th>
                        <th style={styles.th}>Printed Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEntries.map((item, index) => (
                        <tr key={index}>
                          <td style={styles.td}>
                            <input type="checkbox" style={styles.checkbox} />
                          </td>
                          <td style={styles.td}>{item.request}</td>
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            🔍
                          </td>
                          <td style={styles.td}>{item.reference}</td>
                          <td style={styles.td}>{item.paymentType}</td>
                          <td style={styles.td}>{item.requestedDate}</td>
                          <td style={styles.td}>{item.requesterName}</td>
                          <td style={styles.td}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                              }}
                            >
                              <div
                                style={{ color: "green", fontWeight: "500" }}
                              >
                                Printed
                              </div>
                              <div style={{ fontSize: "13px", color: "#555" }}>
                                by - {item.printedBy}
                              </div>
                              <ToggleSwitch
                                initialChecked={item.isPrinted}
                                onToggle={(newState) =>
                                  handlePrintedStatusToggle(index, newState)
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      deviceType === "mobile"
                        ? "column"
                        : deviceType === "tablet"
                        ? "column"
                        : "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "16px",
                    gap:
                      deviceType === "mobile"
                        ? "8px"
                        : deviceType === "tablet"
                        ? "12px"
                        : "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize:
                        deviceType === "mobile"
                          ? "0.8rem"
                          : deviceType === "tablet"
                          ? "0.85rem"
                          : "0.9rem",
                      color: "#555",
                    }}
                  >
                    Showing {indexOfFirstEntry + 1} to{" "}
                    {Math.min(indexOfLastEntry, requests.length)} of{" "}
                    {requests.length} entries
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap:
                        deviceType === "mobile"
                          ? "4px"
                          : deviceType === "tablet"
                          ? "6px"
                          : "6px",
                    }}
                  >
                    <button
                      style={{
                        ...styles.paginationButton,
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        opacity: currentPage === 1 ? 0.5 : 1,
                      }}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {getPageNumbers().map((pageNumber) => (
                      <button
                        key={pageNumber}
                        style={{
                          ...styles.paginationButton,
                          ...(currentPage === pageNumber
                            ? styles.paginationButtonActive
                            : {}),
                        }}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    <button
                      style={{
                        ...styles.paginationButton,
                        cursor:
                          currentPage === totalPages
                            ? "not-allowed"
                            : "pointer",
                        opacity: currentPage === totalPages ? 0.5 : 1,
                      }}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
