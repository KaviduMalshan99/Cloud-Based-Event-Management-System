import { useState } from "react";
import Header from "../components/Header";
import { authAPI } from "../services/api";

function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try{

      const res = await authAPI.post("/login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.access_token);

      alert("Login successful");

    }catch(err){

      alert("Login failed");

    }

  };

  return(

    <div style={styles.page}>

      <Header/>

      <div style={styles.card}>

        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

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

  card:{
    width:"360px",
    margin:"120px auto",
    padding:"30px",
    background:"rgba(255,255,255,0.05)",
    borderRadius:"16px",
    display:"flex",
    flexDirection:"column",
    gap:"10px"
  }

};

export default Login;