import React from 'react'
import {signInWithPopup} from 'firebase/auth'
import { Button } from "@mui/material";
import Seneflix from "../images/logoSeneflix.png";
import { auth, googleAuth } from "../firebase/setup";
import { useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

export default function Signin() {
    const navigate = useNavigate()
    const googleSignin=async ()=>{
        try {
            const result = await signInWithPopup(auth, googleAuth);
setTimeout(()=>{
    auth.currentUser?.emailVerified && navigate('/')

},2000)
 toast.success("Signin Successfully", {
   theme: "dark",
 });
            // console.log(result)
        } catch (error) {
            console.log(error)
        }

    }

    // console.log(auth.currentUser)
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#181818",
        padding: "100px",
      }}
    >
      <img
        src={Seneflix}
        style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: "100px",
          height: "100px",
        }}
        alt="logo seneflix"
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Button onClick={googleSignin} variant="contained" color="primary">
          signin with google
        </Button>
        <h2
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          let's start to explore movies <br />
          from here{" "}
        </h2>
      </div>
      <ToastContainer autoClose={2000} position="top-right" />
    </div>
  );
}
