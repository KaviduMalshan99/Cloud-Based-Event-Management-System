import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar(){

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");

  };

  return(

    <div style={styles.sidebar}>

      <h2 style={styles.logo}>Admin</h2>

      <Link to="/admin" style={styles.link}>Dashboard</Link>

      <Link to="/admin/users" style={styles.link}>Users</Link>

      <Link to="/admin/events" style={styles.link}>Events</Link>

      <Link to="/admin/bookings" style={styles.link}>Bookings</Link>

      <button style={styles.logout} onClick={logout}>
        Logout
      </button>

    </div>

  );

}

const styles = {

  sidebar:{
    width:"220px",
    background:"#08101d",
    color:"#fff",
    padding:"25px",
    display:"flex",
    flexDirection:"column",
    gap:"15px"
  },

  logo:{
    marginBottom:"20px"
  },

  link:{
    color:"#cfe9e9",
    textDecoration:"none"
  },

  logout:{
    marginTop:"auto",
    padding:"10px",
    border:"none",
    borderRadius:"8px",
    background:"#ef4444",
    color:"#fff",
    cursor:"pointer"
  }

};

export default Sidebar;