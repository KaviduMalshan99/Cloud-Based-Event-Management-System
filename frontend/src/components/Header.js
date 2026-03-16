import { Link } from "react-router-dom";

function Header() {

  return (
    <header style={styles.header}>

      <div style={styles.logo}>
        Cloud Event System
      </div>

      <nav>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/events">Events</Link>
        <Link style={styles.link} to="/create-event">Create Event</Link>
        <Link style={styles.link} to="/login">Login</Link>
      </nav>

    </header>
  );
}

const styles = {
  header:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"18px 40px",
    background:"#0b1220",
    color:"#fff"
  },

  logo:{
    fontWeight:"700",
    fontSize:"20px"
  },

  link:{
    marginLeft:"18px",
    color:"#fff",
    textDecoration:"none"
  }
};

export default Header;