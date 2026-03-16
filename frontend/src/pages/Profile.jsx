import { useEffect, useState } from "react";
import Header from "../components/Header";
import { registrationAPI, eventAPI } from "../services/api";

function Profile(){

  const [bookings,setBookings] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    loadBookings();
  },[]);

  const loadBookings = async () => {

    try{

      // get user registrations
      const regRes = await registrationAPI.get("/registrations");

      const registrations = regRes.data;

      // fetch event details for each registration
      const eventDetails = await Promise.all(
        registrations.map(async (r)=>{
          const eventRes = await eventAPI.get(`/events/${r.event_id}`);
          return {
            ...r,
            event: eventRes.data
          };
        })
      );

      setBookings(eventDetails);
      setLoading(false);

    }catch(err){
      console.error(err);
      setLoading(false);
    }

  };


  return(

    <div style={styles.page}>

      <Header/>

      <section style={styles.container}>

        <h1 style={styles.title}>My Profile</h1>

        <p style={styles.subtitle}>
          View your registered events.
        </p>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>You have not registered for any events yet.</p>
        ) : (

          <div style={styles.grid}>

            {bookings.map((booking)=>{

              const event = booking.event;

              return(

                <div key={booking.id} style={styles.card}>

                  <h3 style={styles.cardTitle}>
                    {event.title}
                  </h3>

                  <p style={styles.description}>
                    {event.description}
                  </p>

                  <div style={styles.meta}>
                    📍 {event.location}
                  </div>

                  <div style={styles.meta}>
                    📅 {event.event_date}
                  </div>

                  <div style={styles.meta}>
                    Registered: {new Date(booking.registered_at).toLocaleDateString()}
                  </div>

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
  maxWidth:"1000px",
  margin:"60px auto",
  padding:"20px"
},

title:{
  fontSize:"34px",
  marginBottom:"10px"
},

subtitle:{
  color:"#9fbcbc",
  marginBottom:"30px"
},

grid:{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
  gap:"25px"
},

card:{
  background:"rgba(255,255,255,.05)",
  border:"1px solid rgba(255,255,255,.1)",
  borderRadius:"14px",
  padding:"20px"
},

cardTitle:{
  fontSize:"20px",
  marginBottom:"10px"
},

description:{
  fontSize:"14px",
  color:"#9fbcbc",
  marginBottom:"15px"
},

meta:{
  fontSize:"14px",
  marginBottom:"6px"
}

};

export default Profile;