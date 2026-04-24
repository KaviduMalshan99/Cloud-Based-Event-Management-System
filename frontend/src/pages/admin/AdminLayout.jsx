import React from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout(){

  return(

    <div style={styles.layout}>

      <Sidebar/>

      <div style={styles.content}>
        <Outlet/>
      </div>

    </div>

  );

}

const styles = {

  layout:{
    display:"flex",
    minHeight:"100vh",
    background:"#0b1220",
    color:"#fff"
  },

  content:{
    flex:1,
    padding:"40px"
  }

};

export default AdminLayout;