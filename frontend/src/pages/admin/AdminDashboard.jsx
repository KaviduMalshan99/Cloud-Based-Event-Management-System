import React from "react";
import { useEffect, useState } from "react";
import { authAPI, eventAPI, registrationAPI } from "../../services/api";

function AdminDashboard(){

  const [stats,setStats] = useState({
    admins:0,
    students:0,
    events:0,
    bookings:0
  });

  useEffect(()=>{
    loadStats();
  },[]);

  const loadStats = async () => {

    try{

      /* USERS */

      const usersRes = await authAPI.get("/users");
      const users = usersRes.data;

      const admins = users.filter(u => u.role === "admin").length;
      const students = users.filter(u => u.role === "student").length;

      /* EVENTS */

      const eventsRes = await eventAPI.get("/events");
      const events = eventsRes.data.length;

      /* BOOKINGS */

      const bookingsRes = await registrationAPI.get("/admin/registrations");
      const bookings = bookingsRes.data.length;

      setStats({
        admins,
        students,
        events,
        bookings
      });

    }catch(err){
      console.log(err);
    }

  };

  return(

    <div style={styles.page}>

      <h1 style={styles.title}>Admin Dashboard</h1>

      <p style={styles.subtitle}>
        Overview of the Cloud Event Management System
      </p>

      <div style={styles.cards}>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Admins</p>
          <h2 style={styles.cardValue}>{stats.admins}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Students</p>
          <h2 style={styles.cardValue}>{stats.students}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Events</p>
          <h2 style={styles.cardValue}>{stats.events}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Bookings</p>
          <h2 style={styles.cardValue}>{stats.bookings}</h2>
        </div>

      </div>

    </div>

  );

}

const styles = {

  page:{
    color:"#eaf6f6"
  },

  title:{
    fontSize:"28px",
    marginBottom:"5px"
  },

  subtitle:{
    color:"#9fbcbc",
    marginBottom:"30px"
  },

  cards:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
    gap:"20px"
  },

  card:{
    background:"rgba(255,255,255,.05)",
    border:"1px solid rgba(255,255,255,.1)",
    padding:"25px",
    borderRadius:"14px",
    textAlign:"center",
    backdropFilter:"blur(6px)"
  },

  cardLabel:{
    color:"#9fbcbc",
    marginBottom:"10px"
  },

  cardValue:{
    fontSize:"32px",
    color:"#3bd3c8"
  }

};

export default AdminDashboard;