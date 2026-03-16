import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {

  const [user,setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if(token){

      try{

        const payload = JSON.parse(atob(token.split(".")[1]));
        const email = payload.sub;

        setUser(email);

      }catch(err){
        console.log("Invalid token");
      }

    }

  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href="/";
  };

  const firstLetter = user ? user.charAt(0).toUpperCase() : "";

  return (
    <header style={styles.header}>

      <h2 style={styles.logo}>Cloud Event System</h2>

      <nav style={styles.nav}>

        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/events">Events</Link>

        {!user && (
          <Link style={styles.link} to="/login">Login</Link>
        )}

        {user && (
          <div style={styles.userArea}>

            <div style={styles.avatar}>
              {firstLetter}
            </div>

            <button style={styles.logout} onClick={logout}>
              Logout
            </button>

          </div>
        )}

      </nav>

    </header>
  );
}

const styles = {

  header:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"20px 40px",
    background:"#0b1220",
    color:"#fff"
  },

  logo:{
    margin:0
  },

  nav:{
    display:"flex",
    alignItems:"center"
  },

  link:{
    marginLeft:"20px",
    color:"#fff",
    textDecoration:"none"
  },

  userArea:{
    display:"flex",
    alignItems:"center",
    marginLeft:"20px"
  },

  avatar:{
    width:"36px",
    height:"36px",
    borderRadius:"50%",
    background:"linear-gradient(135deg,#0ea5a3,#3bd3c8)",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    fontWeight:"600",
    color:"#042020",
    marginLeft:"15px"
  },

  logout:{
    marginLeft:"10px",
    background:"transparent",
    border:"1px solid rgba(255,255,255,.2)",
    color:"#fff",
    padding:"6px 10px",
    borderRadius:"6px",
    cursor:"pointer"
  }

};

export default Header;