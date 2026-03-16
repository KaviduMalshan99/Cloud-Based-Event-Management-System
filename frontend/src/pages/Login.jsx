import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { authAPI } from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async () => {

    try {

      const res = await authAPI.post("/login",{
        email,
        password
      });

      const token = res.data.access_token;
      const role = res.data.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if(role === "admin"){
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch(err) {

      alert("Login failed");

    }

  };

  return (

    <div style={styles.page}>

      <Header/>

      <section style={styles.container}>

        <div style={styles.card}>

          <h2 style={styles.title}>Welcome Back</h2>

          <p style={styles.subtitle}>
            Login to access the Cloud Event Management platform
          </p>

          <input
            style={styles.input}
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            style={styles.button}
            onClick={login}
          >
            Login
          </button>

          <p style={styles.registerText}>
            Don’t have an account? <a href="/register" style={styles.link}>Register</a>
          </p>

        </div>

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
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    paddingTop:"120px"
  },

  card:{
    width:"380px",
    padding:"35px",
    borderRadius:"14px",
    background:"rgba(255,255,255,.05)",
    border:"1px solid rgba(255,255,255,.1)",
    display:"flex",
    flexDirection:"column",
    gap:"14px"
  },

  title:{
    marginBottom:"5px"
  },

  subtitle:{
    fontSize:"14px",
    color:"#9fbcbc",
    marginBottom:"10px"
  },

  input:{
    padding:"12px",
    borderRadius:"8px",
    border:"1px solid rgba(255,255,255,.15)",
    background:"rgba(255,255,255,.04)",
    color:"#fff",
    outline:"none"
  },

  button:{
    marginTop:"10px",
    padding:"12px",
    borderRadius:"10px",
    border:"none",
    background:"linear-gradient(135deg,#0ea5a3,#3bd3c8)",
    color:"#042020",
    fontWeight:"600",
    cursor:"pointer"
  },

  registerText:{
    marginTop:"10px",
    fontSize:"14px",
    color:"#9fbcbc"
  },

  link:{
    color:"#3bd3c8",
    textDecoration:"none"
  }

};

export default Login;