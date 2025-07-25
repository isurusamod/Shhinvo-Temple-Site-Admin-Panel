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
      request: "Homa Requests",
      reference: "B3006250b",
      paymentType: "Bank Transfer",
      requestedDate: "2025-06-30",
      requesterName: "Philip and Kaori Slatter",
      status: "Printed",
      printedBy: "Thushara",
      isPrinted: true,
    },
    {
      request: "Homa Requests",
      reference: "B3006250c",
      paymentType: "Bank Transfer",
      requestedDate: "2025-06-30",
      requesterName: "Philip and Kaori Slatter",
      status: "Printed",
      printedBy: "Thushara",
      isPrinted: true,
    },
    {
      request: "Merit Transfer Regular",
      reference: "B1062127",
      paymentType: "Bank Transfer",
      requestedDate: "2025-06-15",
      requesterName: "Dilian Aloka",
      status: "Printed",
      printedBy: "Thushara",
      isPrinted: true,
    },
    {
      request: "Merit Transfer Requests",
      reference: "B08062680",
      paymentType: "Bank Transfer",
      requestedDate: "2025-06-08",
      requesterName: "Philip Slatter and Kaori Kato",
      status: "Printed",
      printedBy: "Hiro",
      isPrinted: true,
    },
    {
      request: "Merit Transfer Requests",
      reference: "B08062681",
      paymentType: "Bank Transfer",
      requestedDate: "2025-06-08",
      requesterName: "Philip Slatter and Kaori Kato",
      status: "Printed",
      printedBy: "Hiro",
      isPrinted: true,
    },
    {
      request: "Homa Requests",
      reference: "B3006250d",
      paymentType: "Credit Card",
      requestedDate: "2025-07-01",
      requesterName: "Alice Wonderland",
      status: "Pending",
      printedBy: "Charlie",
      isPrinted: false,
    },
    {
      request: "Merit Transfer",
      reference: "B1062129",
      paymentType: "PayPal",
      requestedDate: "2025-07-02",
      requesterName: "Bob The Builder",
      status: "Completed",
      printedBy: "Diana",
      isPrinted: true,
    },
    {
      request: "Homa Requests",
      reference: "B3006250e",
      paymentType: "Bank Transfer",
      requestedDate: "2025-07-03",
      requesterName: "Eve Harrington",
      status: "Printed",
      printedBy: "Frank",
      isPrinted: true,
    },
    {
      request: "Merit Transfer Regular",
      reference: "B1062130",
      paymentType: "Credit Card",
      requestedDate: "2025-07-04",
      requesterName: "Grace Hopper",
      status: "Pending",
      printedBy: "Harry",
      isPrinted: false,
    },
    {
      request: "Merit Transfer Requests",
      reference: "B08062682",
      paymentType: "PayPal",
      requestedDate: "2025-07-05",
      requesterName: "Ivy League",
      status: "Completed",
      printedBy: "Jack",
      isPrinted: true,
    },
    {
      request: "Homa Requests",
      reference: "B3006250f",
      paymentType: "Bank Transfer",
      requestedDate: "2025-07-06",
      requesterName: "Karen Smith",
      status: "Printed",
      printedBy: "Liam",
      isPrinted: true,
    },
    {
      request: "Merit Transfer",
      reference: "B1062131",
      paymentType: "Credit Card",
      requestedDate: "2025-07-07",
      requesterName: "Mia Khalifa",
      status: "Pending",
      printedBy: "Nora",
      isPrinted: false,
    },
    {
      request: "Homa Requests",
      reference: "B3006250g",
      paymentType: "PayPal",
      requestedDate: "2025-07-08",
      requesterName: "Oliver Twist",
      status: "Completed",
      printedBy: "Penny",
      isPrinted: true,
    },
    {
      request: "Merit Transfer Regular",
      reference: "B1062132",
      paymentType: "Bank Transfer",
      requestedDate: "2025-07-09",
      requesterName: "Quinn Fabray",
      status: "Printed",
      printedBy: "Rachel",
      isPrinted: true,
    },
    {
      request: "Merit Transfer Requests",
      reference: "B08062683",
      paymentType: "Credit Card",
      requestedDate: "2025-07-10",
      requesterName: "Sam Winchester",
      status: "Pending",
      printedBy: "Tina",
      isPrinted: false,
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
    { name: "Home", icon: HomeIcon, hasSubmenu: true, path: "/home" },
    {
      name: "Prayer Requests",
      icon: PencilIcon,
      hasSubmenu: true,
      path: "/prayerrequests",
    },
    { name: "Reports", icon: UploadIcon, hasSubmenu: false, path: "/reports" },
    {
      name: "Manage Forms",
      icon: UploadIcon,
      hasSubmenu: false,
      path: "/upload",
    },
    {
      name: "Manage Administrators",
      icon: DownloadIcon,
      hasSubmenu: true,
      path: "/download-forms",
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

  const handleMenuClick = (item) => {
    setActiveMenuItem(item.name);
    if (deviceType === "mobile") setSidebarOpen(false);
    if (item.name === "Sign Out") {
      localStorage.removeItem("jwtToken");
    }
    navigate(item.path);
  };

  // Pagination logic
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
        i === index
          ? {
              ...req,
              isPrinted: newState,
              status: newState ? "Printed" : "Pending",
            }
          : req
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

  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif",
      position: "relative",
       top: 60,
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
      gap: isMobile ? "8px" : isTablet ? "10px" : "16px",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "8px" : isTablet ? "10px" : "12px",
    },
    menuButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: isMobile ? "1.1rem" : isTablet ? "1.2rem" : "1.4rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: isMobile ? "6px" : isTablet ? "7px" : "8px",
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#5C4033",
      padding: isMobile ? "6px 8px" : isTablet ? "8px 10px" : "8px 12px",
      borderRadius: "8px",
      color: "white",
    },
    userAvatar: {
      width: isMobile ? "32px" : isTablet ? "36px" : "40px",
      height: isMobile ? "32px" : isTablet ? "36px" : "40px",
      borderRadius: "50%",
      marginRight: isMobile ? "6px" : isTablet ? "8px" : "10px",
    },
    userInfo: {
      fontSize: isMobile ? "0.8rem" : isTablet ? "0.85rem" : "0.9rem",
      fontWeight: 600,
    },
    userRole: {
      fontSize: isMobile ? "0.7rem" : isTablet ? "0.75rem" : "0.8rem",
    },
    signOutButton: {
      backgroundColor: "#9ca3af",
      color: "white",
      border: "none",
      padding: isMobile ? "4px 8px" : isTablet ? "6px 12px" : "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: isMobile ? "0.7rem" : isTablet ? "0.8rem" : "0.9rem",
    },
    sidebar: {
      backgroundColor: "#5C4033",
      paddingTop: isMobile ? "56px" : isTablet ? "64px" : "80px",
      minHeight: "100vh",
      position: "fixed",
      width: isMobile ? "75vw" : isTablet ? "200px" : "250px",
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
    contentCard: {
      backgroundColor: "white",
      padding: isMobile ? "12px" : isTablet ? "16px" : "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: isMobile ? "0.75rem" : isTablet ? "0.8rem" : "0.9rem",
      minWidth: isMobile ? "600px" : "auto",
    },
    th: {
      backgroundColor: "#f3f4f6",
      padding: isMobile ? "8px 4px" : isTablet ? "10px 6px" : "12px 8px",
      textAlign: "left",
      fontWeight: 600,
      color: "#374151",
      borderBottom: "1px solid #e5e7eb",
      whiteSpace: "nowrap",
    },
    thSortIcon: {
      marginLeft: "4px",
      fontSize: isMobile ? "0.7rem" : isTablet ? "0.75rem" : "0.8rem",
      color: "#6b7280",
    },
    td: {
      padding: isMobile ? "8px 4px" : isTablet ? "10px 6px" : "12px 8px",
      borderBottom: "1px solid #e5e7eb",
      color: "#374151",
      whiteSpace: isMobile ? "nowrap" : "normal",
    },
    checkbox: {
      width: "16px",
      height: "16px",
    },
    inputField: {
      padding: isMobile ? "6px" : isTablet ? "8px" : "10px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      fontSize: isMobile ? "0.75rem" : isTablet ? "0.8rem" : "0.9rem",
      minWidth: isMobile ? "100px" : isTablet ? "120px" : "150px",
    },
    paginationButton: {
      padding: isMobile ? "4px 8px" : isTablet ? "6px 10px" : "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      backgroundColor: "white",
      cursor: "pointer",
      fontSize: isMobile ? "0.7rem" : isTablet ? "0.8rem" : "0.9rem",
    },
    paginationButtonActive: {
      backgroundColor: "#5C4033",
      color: "white",
      borderColor: "#5C4033",
    },
    error: {
      color: "#ef4444",
      fontSize: isMobile ? "0.75rem" : isTablet ? "0.8rem" : "0.9rem",
      marginBottom: isMobile ? "8px" : isTablet ? "10px" : "12px",
      textAlign: "center",
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
                height: isMobile ? "32px" : isTablet ? "40px" : "56px",
                objectFit: "contain",
                display:
                  (isMobile || isTablet) && sidebarOpen ? "none" : "block",
                marginRight: isMobile ? "8px" : isTablet ? "10px" : "12px",
              }}
            />
            <button
              style={styles.menuButton}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            >
              {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.userProfile}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="User Avatar"
                style={styles.userAvatar}
              />
              <div>
                <div style={styles.userInfo}>Shinnyo Admin</div>
                <div style={styles.userRole}>
                  User <span style={{ marginLeft: "4px" }}>▼</span>
                </div>
              </div>
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
        </div>
      </header>

      {(isMobile || isTablet) && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <nav style={styles.sidebar}>
        {menuItems.map((item, index) => (
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
              ...(activeMenuItem === item.name ? styles.menuItemActive : {}),
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
              <item.icon />
              <span>{item.name}</span>
            </div>
            {item.hasSubmenu && <ChevronRightIcon />}
          </div>
        ))}
      </nav>

      <main style={styles.mainContent}>
        <div style={styles.contentCard}>
          {error && <div style={styles.error}>{error}</div>}
          {isLoading ? (
            <div
              style={{
                textAlign: "center",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              Loading...
            </div>
          ) : (
            <>
              <h2
                style={{
                  fontSize: isMobile
                    ? "1.2rem"
                    : isTablet
                    ? "1.4rem"
                    : "1.5rem",
                  fontWeight: 600,
                  marginBottom: "12px",
                  textAlign: "left",
                  color: "#222",
                  marginTop: "1%", // keep only one marginTop
                }}
              >
                PRAYER REQUESTS
              </h2>
              <hr
                style={{
                  border: "none",
                  borderTop: "2px solid #ccc",
                  marginBottom: isMobile ? "12px" : isTablet ? "16px" : "20px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "stretch" : "center",
                  marginBottom: isMobile ? "12px" : isTablet ? "16px" : "20px",
                  gap: isMobile ? "8px" : "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  Show
                  <select
                    style={styles.inputField}
                    onChange={handleEntriesPerPageChange}
                    value={entriesPerPage}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  entries
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "8px" : "12px",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Select date range"
                    style={{
                      ...styles.inputField,
                      width: isMobile ? "100%" : "auto",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    style={{
                      ...styles.inputField,
                      width: isMobile ? "100%" : "auto",
                    }}
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
                      <th style={styles.th}>
                        Request
                        <span style={styles.thSortIcon}>↑↓</span>
                      </th>
                      <th style={{ ...styles.th, textAlign: "center" }}>
                        View
                        <span style={styles.thSortIcon}>↑↓</span>
                      </th>
                      <th style={styles.th}>
                        Reference
                        <span style={styles.thSortIcon}>↑↓</span>
                      </th>
                      <th style={styles.th}>
                        Payment Type
                        <span style={styles.thSortIcon}>↑↓</span>
                      </th>
                      <th style={styles.th}>
                        Requested Date
                        <span style={styles.thSortIcon}>↑↓</span>
                      </th>
                      <th style={styles.th}>
                        Requester's Name
                        <span style={styles.thSortIcon}>↑↓</span>
                      </th>
                      <th style={styles.th}>
                        Printed Status
                        <span style={styles.thSortIcon}>↑↓</span>
                      </th>
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
                              alignItems: isMobile ? "center" : "flex-start",
                              gap: "4px",
                            }}
                          >
                            <div
                              style={{
                                color: item.isPrinted ? "green" : "#ef4444",
                                fontWeight: "500",
                              }}
                            >
                              {item.status}
                            </div>
                            <div
                              style={{
                                fontSize: isMobile
                                  ? "0.7rem"
                                  : isTablet
                                  ? "0.75rem"
                                  : "0.8rem",
                                color: "#555",
                              }}
                            >
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
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "stretch" : "center",
                  marginTop: isMobile ? "12px" : isTablet ? "16px" : "20px",
                  gap: isMobile ? "8px" : "12px",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile
                      ? "0.75rem"
                      : isTablet
                      ? "0.8rem"
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
                    gap: isMobile ? "6px" : isTablet ? "8px" : "10px",
                    flexWrap: "wrap",
                    justifyContent: isMobile ? "center" : "flex-end",
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
                        currentPage === totalPages ? "not-allowed" : "pointer",
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
      </main>
    </div>
  );
};

export default Dashboard;
