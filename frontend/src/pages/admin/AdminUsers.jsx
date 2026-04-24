import React from "react";
import { useEffect, useState } from "react";
import { authAPI } from "../../services/api";

function AdminUsers(){

  const [users,setUsers] = useState([]);

  const [form,setForm] = useState({
    username:"",
    email:"",
    password:"",
    role:"student"
  });

  useEffect(()=>{
    loadUsers();
  },[]);

  const loadUsers = async ()=>{
    const res = await authAPI.get("/users");
    setUsers(res.data);
  };

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createUser = async ()=>{

    try{

      await authAPI.post("/register",form);

      alert("User created successfully");

      setForm({
        username:"",
        email:"",
        password:"",
        role:"student"
      });

      loadUsers();

    }catch(err){

      alert("User creation failed");

    }

  };

  return(

    <div style={styles.page}>

      <h1 style={styles.title}>User Management</h1>

      {/* CREATE USER */}

      <div style={styles.card}>

        <h2 style={styles.cardTitle}>Create User</h2>

        <div style={styles.formGrid}>

          <input
            style={styles.input}
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            placeholder="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <select
            style={styles.input}
            name="role"
            value={form.role}
            onChange={handleChange}
          >

            <option value="student">Student</option>
            <option value="admin">Admin</option>

          </select>

        </div>

        <button style={styles.button} onClick={createUser}>
          Create User
        </button>

      </div>

      {/* USER TABLE */}

      <div style={styles.card}>

        <h2 style={styles.cardTitle}>System Users</h2>

        <table style={styles.table}>

          <thead style={styles.thead}>

            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>

          </thead>

          <tbody>

            {users.map(u=>(
              <tr key={u.id} style={styles.row}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <span style={
                    u.role === "admin"
                    ? styles.adminBadge
                    : styles.studentBadge
                  }>
                    {u.role}
                  </span>
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

  button:{
    padding:"10px 16px",
    borderRadius:"8px",
    border:"none",
    background:"#3bd3c8",
    color:"#042020",
    fontWeight:"600",
    cursor:"pointer"
  },

  table:{
    width:"100%",
    borderCollapse:"separate",
    borderSpacing:"0 8px"
  },
  
  thead:{
    background:"rgba(255,255,255,.05)"
  },
  
  th:{
    textAlign:"left",
    padding:"12px 14px",
    color:"#9fbcbc",
    fontWeight:"500"
  },
  
  td:{
    textAlign:"left",
    padding:"14px",
    background:"rgba(255,255,255,.03)"
  },
  
  row:{
    borderRadius:"8px"
  },

  adminBadge:{
    background:"#f97316",
    padding:"4px 10px",
    borderRadius:"6px",
    fontSize:"12px"
  },

  studentBadge:{
    background:"#0ea5a3",
    padding:"4px 10px",
    borderRadius:"6px",
    fontSize:"12px"
  }

};

export default AdminUsers;