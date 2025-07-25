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
          backgroundColor: isChecked ? "#8B4513" : "#ccc", // Brown when checked, grey when unchecked
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
  const [activeMenuItem, setActiveMenuItem] = useState("Manage Forms");
  const [deviceType, setDeviceType] = useState("desktop");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([
    { formType: "Prayer Request", isPrinted: true },
    { formType: "Request for Prayer - COVID 19", isPrinted: false },
    { formType: "Request For COVID 19", isPrinted: true },
    { formType: "Merit Transfer Form", isPrinted: false },
    { formType: "Merit Transfer Form COVID 19", isPrinted: true },
    {
      formType:
        "Special Merit Transfer Form Victims of Disaster First 100 Days Marking",
      isPrinted: false,
    },
    { formType: "Merit Transfer - Anniversary of Death", isPrinted: true },
    {
      formType: "Merit Transfer Request for Newly Departed First 100 Days",
      isPrinted: true,
    },
    {
      formType:
        "Request for New Year Prayer Beat of Buddha Image or a Buddha Image",
      isPrinted: false,
    },
    {
      formType:
        "Request for New Prayer Beat for Buddha Image or a Buddha Image",
      isPrinted: true,
    },
    { formType: "Merit Transfer Form", isPrinted: false },
    { formType: "Merit Transfer Request Form", isPrinted: true },
    { formType: "Request for Amulets", isPrinted: false },
    { formType: "Request for Edo Ma", isPrinted: true },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
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
      } else if (width < 1024) {
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
    { name: "Home", icon: HomeIcon, hasSubmenu: true, path: "/home" },
    {
      name: "Prayer Requests",
      icon: PencilIcon,
      hasSubmenu: true,
      path: "/prayerrequests",
    },
    {
      name: "Reports",
      icon: UploadIcon,
      hasSubmenu: false,
      path: "/reports",
    },
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
      path: "/offerings",
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
    if (isMobile) setSidebarOpen(false);
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
    setCurrentPage(1); // Reset to first page when entries per page changes
  };

  // Handle toggle for printed status
  const handlePrintedStatusToggle = (index, newState) => {
    setRequests((prevRequests) =>
      prevRequests.map((req, i) =>
        i === index ? { ...req, isPrinted: newState } : req
      )
    );
  };

  // Generate page numbers (show up to 5 pages, centered around current page)
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

  const sidebarWidth = isMobile ? "80%" : isTablet ? "220px" : "250px";
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
      height: isMobile ? "60px" : isTablet ? "70px" : "80px",
      backgroundColor: "#5C4033",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "0 8px" : isTablet ? "0 18px" : "0 24px",
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "6px" : isTablet ? "12px" : "20px",
    },
    menuButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: isMobile ? "1.2rem" : isTablet ? "1.3rem" : "1.5rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: isMobile ? 6 : 8,
    },
    cartIcon: {
      position: "relative",
      color: "white",
      fontSize: isMobile ? "1.2rem" : isTablet ? "1.4rem" : "1.5rem",
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
      paddingTop: isMobile ? "60px" : isTablet ? "70px" : "80px",
      minHeight: "100vh",
      position: "fixed",
      width: sidebarWidth,
      left: isMobile ? (sidebarOpen ? "0" : "-100vw") : "0",
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
      justifyContent: "space-between",
      padding: isMobile ? "10px 12px" : isTablet ? "14px 16px" : "18px 24px",
      color: "white",
      cursor: "pointer",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      fontSize: isMobile ? "0.9rem" : isTablet ? "0.95rem" : "1rem",
      transition: "background-color 0.2s",
      borderTopLeftRadius: "30px",
      borderBottomLeftRadius: "30px",
      marginBottom: isMobile ? "12px" : "20px",
    },
    menuItemActive: {
      backgroundColor: "#87644b",
    },
    menuItemLeft: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "8px" : "12px",
    },
    mainContent: {
      marginLeft: isMobile ? 0 : sidebarWidth,
      paddingTop: isMobile ? "60px" : isTablet ? "70px" : "80px",
      padding: isMobile ? "12px" : isTablet ? "24px" : "32px",
      width: isMobile ? "100vw" : `calc(100vw - ${sidebarWidth})`,
      minHeight: "100vh",
      backgroundColor: "#f9f9f9",
      transition: "margin-left 0.3s ease",
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      padding: "16px",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      minWidth: "400px",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#e0e0e0",
      padding: "12px",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
      fontSize: "1rem",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
      fontSize: "0.9rem",
    },
    tdCenter: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      textAlign: "center",
      fontSize: "0.9rem",
    },
    pagination: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "16px",
    },
    select: {
      padding: "4px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    pageButton: {
      padding: "6px 12px",
      margin: "0 4px",
      border: "1px solid #ddd",
      backgroundColor: "white",
      cursor: "pointer",
      borderRadius: "4px",
    },
    activePage: {
      backgroundColor: "#5C4033",
      color: "white",
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
              src="/logo.png" // Using placeholder image
              alt="Shinnyo Logo"
              style={{
                height: "60px",
                objectFit: "contain",
                display: isMobile && sidebarOpen ? "none" : "block",
                marginRight: "16px",
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
        </div>
      </header>
      {isMobile && (
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
              if (activeMenuItem !== item.name)
                e.currentTarget.style.backgroundColor = "#4b5563";
            }}
            onMouseLeave={(e) => {
              if (activeMenuItem !== item.name)
                e.currentTarget.style.backgroundColor = "transparent";
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
        <div style={styles.tableContainer}>
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "16px",
              marginTop: "5%",
              alignItems: "center",
            }}
          >
            Manage Forms
          </h2>
          <hr />
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Form Type</th>
                <th style={styles.th}>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((request, index) => (
                <tr key={index}>
                  <td style={styles.td}>{request.formType}</td>
                  <td style={styles.tdCenter}>
                    <ToggleSwitch
                      initialChecked={request.isPrinted}
                      onToggle={(newState) =>
                        handlePrintedStatusToggle(
                          indexOfFirstEntry + index,
                          newState
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.pagination}>
            <span>
              Showing {indexOfFirstEntry + 1} to{" "}
              {Math.min(indexOfLastEntry, requests.length)} of {requests.length}{" "}
              entries
            </span>
            <div>
              <button
                style={{
                  ...styles.pageButton,
                  ...(currentPage === 1
                    ? { cursor: "not-allowed", opacity: 0.5 }
                    : {}),
                }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  style={{
                    ...styles.pageButton,
                    ...(currentPage === number ? styles.activePage : {}),
                  }}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              ))}
              <button
                style={{
                  ...styles.pageButton,
                  ...(currentPage === totalPages
                    ? { cursor: "not-allowed", opacity: 0.5 }
                    : {}),
                }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <div>
              <label>Show </label>
              <select
                style={styles.select}
                value={entriesPerPage}
                onChange={handleEntriesPerPageChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span> entries</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
