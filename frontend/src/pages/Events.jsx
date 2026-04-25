import React from "react";import { useEffect, useState } from "react";
import Header from "../components/Header";
import { eventAPI, registrationAPI } from "../services/api";

function Events() {

  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const eventsRes = await eventAPI.get("/");
      setEvents(eventsRes.data);

      const token = localStorage.getItem("token");

      if (token) {
        const regRes = await registrationAPI.get("/registrations");

        const eventIds = regRes.data.map(r => r.event_id);

        setRegisteredEvents(eventIds);
      }

      setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }

  };

  const registerEvent = async (eventId) => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (registeredEvents.includes(eventId)) {
      alert("You already registered for this event.");
      return;
    }

    try {

      const res = await registrationAPI.post(
        "/register",
        { event_id: eventId }
      );

      alert(res.data?.message || "Registration successful!");

      setRegisteredEvents([...registeredEvents, eventId]);

    } catch (err) {

      alert(err.response?.data?.detail || "Registration failed");

    }

  };

  return (

    <div style={styles.page}>

      <Header />

      <section style={styles.container}>

        <h1 style={styles.title}>Upcoming Events</h1>

        <p style={styles.subtitle}>
          Browse available events and reserve your seat.
        </p>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading events...</p>
        ) : (

          <div style={styles.grid}>

            {events.map((event) => {

              const alreadyRegistered = registeredEvents.includes(event.id);

              return (

                <div key={event.id} style={styles.card}>

                  <h3 style={styles.cardTitle}>{event.title}</h3>

                  <p style={styles.description}>{event.description}</p>

                  <div style={styles.meta}>📍 {event.location}</div>
                  <div style={styles.meta}>📅 {event.event_date}</div>
                  <div style={styles.meta}>👥 Capacity: {event.capacity}</div>

                  <button
                    style={{
                      ...styles.button,
                      background: alreadyRegistered
                        ? "#555"
                        : "linear-gradient(135deg,#0ea5a3,#3bd3c8)",
                      cursor: alreadyRegistered ? "not-allowed" : "pointer"
                    }}
                    disabled={alreadyRegistered}
                    onClick={() => registerEvent(event.id)}
                  >
                    {alreadyRegistered ? "Registered ✓" : "Book Seat"}
                  </button>

                </div>

              );

            })}

          </div>

        )}

      </section>

    </div>

  );
}

const styles = {

  page:{
    minHeight:"100vh",
    background:"radial-gradient(circle at top right, rgba(0,180,180,.15), transparent 40%), #0b1220",
    color:"#eaf6f6"
  },

  container:{
    maxWidth:"1100px",
    margin:"60px auto",
    padding:"20px"
  },

  title:{
    fontSize:"36px",
    marginBottom:"10px",
    textAlign:"center"
  },

  subtitle:{
    textAlign:"center",
    color:"#9fbcbc",
    marginBottom:"40px"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))",
    gap:"25px"
  },

  card:{
    background:"rgba(255,255,255,.05)",
    border:"1px solid rgba(255,255,255,.1)",
    borderRadius:"14px",
    padding:"22px",
    display:"flex",
    flexDirection:"column"
  },

  cardTitle:{
    fontSize:"20px",
    marginBottom:"10px"
  },

  description:{
    color:"#9fbcbc",
    fontSize:"14px",
    marginBottom:"15px"
  },

  meta:{
    fontSize:"14px",
    marginBottom:"6px"
  },

  button:{
    marginTop:"15px",
    padding:"10px",
    borderRadius:"10px",
    border:"none",
    color:"#042020",
    fontWeight:"600"
  }

};

export default Events;