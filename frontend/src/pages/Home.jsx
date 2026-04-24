import Header from "../components/Header";

function Home(){

  return (

    <div style={styles.page}>

      <Header/>

      {/* HERO SECTION */}

      <section style={styles.hero}>

        <div style={styles.heroContent}>

        <h1 style={styles.title}>
          Cloud Event <span style={styles.highlight}>Management</span> Platform
        </h1>

          <p style={styles.subtitle}>
            A modern microservice-based event platform powered by
            FastAPI, Docker and PostgreSQL. Discover events, book
            seats instantly and receive automated notifications
            through a scalable cloud architecture.
          </p>

          <div style={styles.buttons}>

            <a href="/events">
              <button style={styles.primaryBtn}>
                Browse Events
              </button>
            </a>

            <a href="/login">
              <button style={styles.secondaryBtn}>
                Login
              </button>
            </a>

          </div>

        </div>

      </section>


      {/* ARCHITECTURE SECTION */}

      <section style={styles.featuresSection}>

        <h2 style={styles.sectionTitle}>
          Microservice Architecture
        </h2>

        <div style={styles.featuresGrid}>

          <div style={styles.card}>
            <h3>Authentication Service</h3>
            <p>
              Manages secure user authentication with password hashing
              and JWT tokens to protect platform resources.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Event Service</h3>
            <p>
              Handles creation and management of events including
              capacity, date, location and availability.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Registration Service</h3>
            <p>
              Processes event bookings, prevents duplicate registrations
              and connects users with available events.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Notification Service</h3>
            <p>
              Automatically sends confirmation notifications when
              users successfully register for events.
            </p>
          </div>

        </div>

      </section>


      {/* TECHNOLOGY STACK */}

      <section style={styles.techSection}>

        <h2 style={styles.sectionTitle}>
          Technology Stack
        </h2>

        <div style={styles.techGrid}>

          <div style={styles.techCard}>FastAPI</div>
          <div style={styles.techCard}>React</div>
          <div style={styles.techCard}>Docker</div>
          <div style={styles.techCard}>PostgreSQL</div>
          <div style={styles.techCard}>JWT Authentication</div>
          <div style={styles.techCard}>Microservices</div>

        </div>

      </section>


      {/* SYSTEM FLOW */}

      <section style={styles.flowSection}>

        <h2 style={styles.sectionTitle}>
          System Flow
        </h2>

        <p style={styles.flowText}>
          User → Authentication Service → Event Service → 
          Registration Service → Notification Service
        </p>

      </section>


      {/* FOOTER */}

      <footer style={styles.footer}>

        <p>
          Cloud-Based Event Management System ·
          Microservices Architecture Demonstration
        </p>

      </footer>

    </div>

  );

}



const styles = {

page:{
  minHeight:"100vh",
  background:"radial-gradient(circle at top right, rgba(0,180,180,.2), transparent 40%), #0b1220",
  color:"#eaf6f6",
  fontFamily:"system-ui"
},

highlight:{
  background:"linear-gradient(135deg,#0ea5a3,#3bd3c8)",
  WebkitBackgroundClip:"text",
  WebkitTextFillColor:"transparent"
},

hero:{
  textAlign:"center",
  paddingTop:"120px",
  paddingBottom:"120px"
},

heroContent:{
  maxWidth:"800px",
  margin:"auto"
},

title:{
  fontSize:"48px",
  marginBottom:"20px"
},

subtitle:{
  color:"#9fbcbc",
  fontSize:"18px",
  lineHeight:"1.6"
},

buttons:{
  marginTop:"40px",
  display:"flex",
  justifyContent:"center",
  gap:"20px"
},

primaryBtn:{
  padding:"14px 26px",
  borderRadius:"12px",
  border:"none",
  background:"linear-gradient(135deg,#0ea5a3,#3bd3c8)",
  color:"#042020",
  fontWeight:"600",
  cursor:"pointer"
},

secondaryBtn:{
  padding:"14px 26px",
  borderRadius:"12px",
  border:"1px solid rgba(255,255,255,.2)",
  background:"transparent",
  color:"#fff",
  cursor:"pointer"
},

featuresSection:{
  padding:"80px 40px"
},

sectionTitle:{
  textAlign:"center",
  marginBottom:"40px",
  fontSize:"32px"
},

featuresGrid:{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",
  gap:"30px",
  maxWidth:"1000px",
  margin:"auto"
},

card:{
  background:"rgba(255,255,255,.05)",
  border:"1px solid rgba(255,255,255,.1)",
  padding:"25px",
  borderRadius:"14px"
},

techSection:{
  padding:"70px 40px"
},

techGrid:{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
  gap:"20px",
  maxWidth:"800px",
  margin:"auto"
},

techCard:{
  background:"rgba(255,255,255,.05)",
  border:"1px solid rgba(255,255,255,.1)",
  padding:"20px",
  borderRadius:"12px",
  textAlign:"center"
},

flowSection:{
  padding:"60px",
  textAlign:"center"
},

flowText:{
  color:"#9fbcbc",
  fontSize:"18px"
},

footer:{
  textAlign:"center",
  padding:"30px",
  borderTop:"1px solid rgba(255,255,255,.1)",
  marginTop:"60px",
  color:"#9fbcbc"
}

};

export default Home;