import React from "react";
import { useEffect, useState } from "react";
import { registrationAPI, eventAPI, authAPI } from "../../services/api";

function AdminBookings(){

  const [bookings,setBookings] = useState([]);
  const [users,setUsers] = useState([]);
  const [events,setEvents] = useState([]);

  useEffect(()=>{
    loadData();
  },[]);

  const loadData = async () => {

    try{

      const bookingsRes = await registrationAPI.get("/admin/registrations");
      const usersRes = await authAPI.get("/users");
      const eventsRes = await eventAPI.get("/events");

      setBookings(bookingsRes.data);
      setUsers(usersRes.data);
      setEvents(eventsRes.data);

    }catch(err){

      console.log(err);
      alert("Failed to load bookings");

    }

  };

  const getUsername = (email) => {

    const user = users.find(u => u.email === email);
    return user ? user.username : email;

  };

  const getEventTitle = (id) => {

    const event = events.find(e => e.id === id);
    return event ? event.title : id;

  };

  return(

    <div style={styles.page}>

      <h1 style={styles.title}>Event Bookings</h1>

      <div style={styles.card}>

        <table style={styles.table}>

          <thead>
            <tr>
              <th style={styles.th}>Booking ID</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Event</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>

          <tbody>

            {bookings.map(b => (

              <tr key={b.id} style={styles.row}>

                <td style={styles.td}>{b.id}</td>

                <td style={styles.td}>
                  {getUsername(b.user_email)}
                </td>

                <td style={styles.td}>
                  {getEventTitle(b.event_id)}
                </td>

                <td style={styles.td}>
                  {new Date(b.registered_at).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

const styles = {

  page:{
    color:"#eaf6f6"
  },

  title:{
    marginBottom:"25px"
  },

  card:{
    background:"rgba(255,255,255,.05)",
    border:"1px solid rgba(255,255,255,.1)",
    borderRadius:"14px",
    padding:"25px"
  },

  table:{
    width:"100%",
    borderCollapse:"separate",
    borderSpacing:"0 8px"
  },

  th:{
    textAlign:"left",
    padding:"12px 14px",
    color:"#9fbcbc"
  },

  td:{
    padding:"14px",
    background:"rgba(255,255,255,.03)"
  },

  row:{
    borderRadius:"8px"
  }

};

export default AdminBookings;