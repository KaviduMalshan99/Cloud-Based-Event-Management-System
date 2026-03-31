import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { notificationAPI } from "../services/api";

function Header() {

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // -----------------------------
  // Get user from token
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload.sub);
        setRole(storedRole);
      } catch (err) {
        console.log("Invalid token");
      }
    }
  }, []);

  // -----------------------------
  // Load notifications
  // -----------------------------
  const loadNotifications = async () => {
    try {
      const res = await notificationAPI.get("/notifications", {
        params: { user_email: user }
      });
  
      const data = res.data;
  
      if (data.length > 0) {
        const latest = data[0];
  
        // ✅ show only if it's NEW
        if (latest.id !== lastNotificationId) {
          setToast(latest.message);
          setLastNotificationId(latest.id);
  
          setTimeout(() => {
            setToast(null);
          }, 3000);
        }
      }
  
      setNotifications(data);
  
    } catch (err) {
      console.log(err);
    }
  };

  // -----------------------------
  // Load notifications when user is set
  // -----------------------------
  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  // -----------------------------
  // Auto refresh every 5s
  // -----------------------------
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      loadNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  // -----------------------------
  // Logout
  // -----------------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const firstLetter = user ? user.charAt(0).toUpperCase() : "";

  return (
    <header style={styles.header}>

      {/* Toast Notification */}
      {toast && (
        <div style={styles.toast}>
          {toast}
        </div>
      )}

      <h2 style={styles.logo}>Cloud Event System</h2>

      <nav style={styles.nav}>

        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/events">Events</Link>

        {user && role !== "admin" && (
          <Link style={styles.link} to="/profile">
            My Bookings
          </Link>
        )}

        {role === "admin" && (
          <Link style={styles.link} to="/admin">
            Dashboard
          </Link>
        )}

        {!user && (
          <Link style={styles.link} to="/login">Login</Link>
        )}

        {user && (
          <>
            {/* 🔔 Notification Bell */}
            <div style={styles.bellContainer}>

              <div
                style={styles.bell}
                onClick={() => setOpen(!open)}
              >
                🔔

                {notifications.length > 0 && (
                  <span style={styles.badge}>
                    {notifications.length}
                  </span>
                )}
              </div>

              {open && (
                <div style={styles.dropdown}>

                  {notifications.length === 0 && (
                    <p style={styles.noNotif}>No notifications</p>
                  )}

                  {notifications.map((n) => (
                    <div key={n.id} style={styles.notification}>
                      {n.message}
                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* 👤 User Area */}
            <div style={styles.userArea}>

              <div style={styles.avatar}>
                {firstLetter}
              </div>

              <button style={styles.logout} onClick={logout}>
                Logout
              </button>

            </div>
          </>
        )}

      </nav>

    </header>
  );
}


const styles = {

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    background: "#0b1220",
    color: "#fff"
  },

  logo: { margin: 0 },

  nav: {
    display: "flex",
    alignItems: "center"
  },

  link: {
    marginLeft: "20px",
    color: "#fff",
    textDecoration: "none"
  },

  bellContainer: {
    position: "relative",
    marginLeft: "20px",
    cursor: "pointer"
  },

  bell: {
    fontSize: "20px",
    position: "relative"
  },

  badge: {
    position: "absolute",
    top: "-6px",
    right: "-10px",
    background: "#3bd3c8",
    color: "#042020",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
    fontWeight: "600"
  },

  dropdown: {
    position: "absolute",
    top: "35px",
    right: "0",
    width: "260px",
    background: "#111827",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "10px",
    padding: "10px",
    zIndex: 100
  },

  notification: {
    padding: "8px",
    borderBottom: "1px solid rgba(255,255,255,.08)",
    fontSize: "14px"
  },

  noNotif: {
    fontSize: "14px",
    color: "#9fbcbc"
  },

  userArea: {
    display: "flex",
    alignItems: "center",
    marginLeft: "15px"
  },

  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#0ea5a3,#3bd3c8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    color: "#042020",
    marginLeft: "10px"
  },

  logout: {
    marginLeft: "10px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,.2)",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  // 🔥 Toast popup style
  toast: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#0ea5a3",
    color: "#042020",
    padding: "12px 16px",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    zIndex: 999,
    fontSize: "14px"
  }

};

export default Header;