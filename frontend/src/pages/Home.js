import Header from "../components/Header";

function Home(){

  return(

    <div style={styles.page}>

      <Header/>

      <div style={styles.hero}>

        <h1>Cloud-Based Event Management System</h1>

        <p>
        A microservice-based platform built with FastAPI,
        Docker and PostgreSQL.
        Students can browse events and register online.
        </p>

        <a href="/login">
          <button style={styles.button}>
            Login to Continue
          </button>
        </a>

      </div>

    </div>

  );
}

const styles = {

  page:{
    minHeight:"100vh",
    background:"#0b1220",
    color:"#fff"
  },

  hero:{
    textAlign:"center",
    marginTop:"120px"
  },

  button:{
    marginTop:"20px",
    padding:"12px 18px",
    borderRadius:"10px",
    border:"none",
    background:"#0ea5a3",
    color:"#042020",
    fontWeight:"600",
    cursor:"pointer"
  }

};

export default Home;