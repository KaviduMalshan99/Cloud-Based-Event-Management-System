import { useEffect, useState } from "react";
import { eventAPI } from "../../services/api";

function AdminEvents(){

  const [events,setEvents] = useState([]);

  const [form,setForm] = useState({
    title:"",
    description:"",
    location:"",
    event_date:"",
    capacity:""
  });

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(()=>{
    loadEvents();
  },[]);

  const loadEvents = async () => {

    try{

      const res = await eventAPI.get("/events");

      setEvents(res.data);

    }catch(err){

      console.log(err);

    }

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const createEvent = async () => {

    try{

      await eventAPI.post("/events", form);

      alert("Event created successfully");

      setForm({
        title:"",
        description:"",
        location:"",
        event_date:"",
        capacity:""
      });

      loadEvents();

    }catch(err){

      alert("Event creation failed");
      console.log(err.response?.data);
    alert(err.response?.data?.detail || "Request failed");

    }

  };

  const deleteEvent = async (id) => {

    if(!window.confirm("Delete this event?")) return;

    try{

      await eventAPI.delete(`/events/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      loadEvents();

    }catch(err){

      alert("Delete failed");

    }

  };

  return(

    <div style={styles.page}>

      <h1 style={styles.title}>Event Management</h1>

      {role === "admin" && (

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>Create Event</h2>

          <div style={styles.formGrid}>

            <input
              style={styles.input}
              name="title"
              placeholder="Event Title"
              value={form.title}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              type="date"
              name="event_date"
              value={form.event_date}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={form.capacity}
              onChange={handleChange}
            />

          </div>

          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Event Description"
            value={form.description}
            onChange={handleChange}
          />

          <button style={styles.button} onClick={createEvent}>
            Create Event
          </button>

        </div>

      )}

      <div style={styles.card}>

        <h2 style={styles.cardTitle}>Events</h2>

        <table style={styles.table}>

          <thead>

            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Capacity</th>
              <th style={styles.th}>Action</th>
            </tr>

          </thead>

          <tbody>

            {events.map(e => (

              <tr key={e.id} style={styles.row}>

                <td style={styles.td}>{e.id}</td>

                <td style={styles.td}>{e.title}</td>

                <td style={styles.td}>{e.location}</td>

                <td style={styles.td}>{e.event_date}</td>

                <td style={styles.td}>{e.capacity}</td>

                <td style={styles.td}>

                  {role === "admin" && (

                    <button
                      style={styles.deleteBtn}
                      onClick={()=>deleteEvent(e.id)}
                    >
                      Delete
                    </button>

                  )}

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
    padding:"25px",
    marginBottom:"25px"
  },

  cardTitle:{
    marginBottom:"15px"
  },

  formGrid:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
    gap:"12px",
    marginBottom:"15px"
  },

  input:{
    padding:"10px",
    borderRadius:"8px",
    border:"1px solid rgba(255,255,255,.15)",
    background:"rgba(255,255,255,.04)",
    color:"#fff"
  },

  textarea:{
    width:"100%",
    padding:"10px",
    borderRadius:"8px",
    border:"1px solid rgba(255,255,255,.15)",
    background:"rgba(255,255,255,.04)",
    color:"#fff",
    marginBottom:"12px"
  },

  button:{
    padding:"10px 16px",
    borderRadius:"8px",
    border:"none",
    background:"#3bd3c8",
    color:"#042020",
    fontWeight:"600",
    cursor:"pointer"
  },

  deleteBtn:{
    padding:"6px 10px",
    borderRadius:"6px",
    border:"none",
    background:"#ef4444",
    color:"#fff",
    cursor:"pointer"
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

export default AdminEvents;