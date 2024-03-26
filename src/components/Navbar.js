import React, { useEffect, useState } from 'react'
import Seneflix from "../images/logoSeneflix.png"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/setup';
import { signOut } from 'firebase/auth';




export default function Navbar() {
  const navigate=useNavigate()
  const [movies, setMovies] = useState([]);
 

  const SignoutClick =async () => {
    try {
       const result =await signOut(auth);
        console.log(result);
         setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };
      const getMovie = () => {
        try {
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=1b82a9898833abaf97361da2a282fe83`
          )
            .then((response) => response.json())
            .then((data) => setMovies(data.results));
        } catch (error) {
          console.log(error);
        }
      };

      const SinginClick = () => {
        navigate('/signin')
      }

      
      console.log(auth);
        const [isAuthenticated, setIsAuthenticated] = useState(
          auth.currentUser?.emailVerified
        );

      useEffect(() => {
        getMovie();
      }, []);
  return (
    <div
      style={{
        backgroundImage: `
           linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
        url(https://image.tmdb.org/t/p/original${movies[0]?.poster_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "500px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
          // backgroundColor: "rgba(0,0,0,0.3)",
          color: "white",
        }}
      >
        <img
          src={Seneflix}
          style={{
            width: "90px",
            height: "90px",
          }}
          alt="logo seneflix"
        />
        <div>
          {isAuthenticated ? (
            <Button
              color="error"
              variant="contained"
              sx={{
                height: "40px",
                marginLeft: "10px",
              }}
              onClick={SignoutClick}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="error"
              variant="contained"
              sx={{
                height: "40px",
                marginLeft: "10px",
              }}
              onClick={SinginClick}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>

      <div>
        <h2
          style={{
            color: "#f1f1f1",
            textAlign: "left",
            padding: "20px",
            marginTop: "5%",
            paddingLeft: "23px",
            fontSize: "70px",
            fontFamily: "Helvetica Neue",
            fontWeight: "lighter",
          }}
        >
          {movies[0]?.original_title}
        </h2>
        <h4
          style={{
            color: "#f1f1f1",
            textAlign: "left",
            paddingLeft: "23px",
            fontSize: "24px",
            fontFamily: "Helvetica Neue",
            fontWeight: "lighter",
            marginTop: "1%",
          }}
        >
          {movies[0]?.overview}
        </h4>
        <Button
          variant="contained"
          sx={{
            color: "black",
            bgcolor: "white",
            height: "40px",
            marginLeft: "23px",
            marginTop: "1%",
            fontWeight: "bold",
          }}
        >
          play trailer
        </Button>
      </div>
    </div>
  );
}
