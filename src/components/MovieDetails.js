import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { auth, database } from "../firebase/setup";
import { useState } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import Trailer from "./Trailer";
import { useCallback } from "react";




export default function MovieDetails() {
  const location = useLocation();

  const [review,setReview]=useState("");
  const [reviewData,setReviewData]=useState([]);

const MovieRef=doc(database,"Movies",`${location.state.movie.id}`);

const ReviewRef=collection(MovieRef,"Reviews");

  const addReview = async ()=>{

    try {
      auth.currentUser && await addDoc(ReviewRef,{
        movieReview:review,
        username:auth.currentUser?.displayName,
        email:auth.currentUser?.email,
        profileImg:auth.currentUser?.photoURL
      });
      auth.currentUser ? toast.success("Review Added Successfully", {
        theme: "dark",
      }):toast.error("Please Signin to add review", {
        theme: "dark",
      })
      ;
      
    } catch (error) {
      console.log(error)
      
    }
  }

 const showReviews = useCallback(async () => {
   try {
     const data = await getDocs(ReviewRef);
     const filteredData = data.docs.map((doc) => ({
       ...doc.data(),
       id: doc.id,
     }));
     setReviewData(filteredData);
   } catch (error) {
     console.log(error);
   }
 }, [ReviewRef, setReviewData]);

 useEffect(() => {
   showReviews();
 }, [showReviews]);

  
  return (
    <Grid container bgcolor={"white"}>
      <Grid item xs={8}>
        <div
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
            url(https://image.tmdb.org/t/p/original${location.state.movie?.poster_path})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              paddingTop: "200px",
              paddingLeft: "30px",
              paddingRight: "30px",
              position: "absolute",
              top: "53%",
              left: "0%",
              fontFamily: "Roboto",
            }}
          >
            <Grid container>
              <h1
                style={{
                  color: "red",
                  fontSize: "50px",
                  marginBottom: "10px",
                }}
              >
                {location.state.movie?.original_title}
              </h1>
            </Grid>
            <div
              style={{
                display: "flex",
              }}
            >
              <h4
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "100",
                  marginBottom: "10px",
                }}
              >
                Language: {location.state.movie?.original_language}
              </h4>
              {/* release date */}
              <h5
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "100",
                  marginBottom: "10px",
                  marginLeft: "20px",
                }}
              >
                Release Date: {location.state.movie?.release_date}
              </h5>
            </div>
            <Grid container>
              <h2
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "100",
                }}
              >
                {location.state.movie?.overview}
              </h2>
              {/* <Button
                variant="contained"
                style={{
                  color: "black",
                  backgroundColor: "white",
                }}
              >
                Play trailer
              </Button> */}
              <Trailer location={location}/>
            </Grid>
          </div>
        </div>
      </Grid>

      <Grid item xs={4}>
        <div
          style={{
            backgroundColor: "black",
            height: "100vh",
            width: "100%",
            padding: "20px",
          }}
        >
          <Grid container>
            <div>
              <h5
                style={{
                  color: "#A4A4A4",
                  marginBottom: "10px",
                  fontWeight: "200",
                }}
              >
                Add Review
              </h5>
              <TextField
                size="small"
                label="review"
                variant="outlined"
                style={{
                  width: "50%",
                  marginTop: "10px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
                onChange={(e) => {
                  setReview(e.target.value);
                }}
              />
              <Button
                variant="contained"
                sx={{
                  height: "37px",
                  ml: "10px",
                  marginTop: "10px",
                  bgcolor: "red",
                }}
                onClick={addReview}
              >
                Submit
              </Button>
            </div>
          </Grid>
          <Grid container>
            <div>
              {" "}
              <h6
                style={{
                  color: "#A4A4A4",
                  marginTop: "10px",
                  fontSize: "20px",
                  fontWeight: "200",
                }}
              >
                Review
              </h6>
              {reviewData.map((review) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "20px",
                    }}
                  >
                    <img
                      src={review.profileImg}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50px",
                      }}
                      alt="profile-img"
                    />
                    <h6
                      style={{
                        color: "#A4A4A4",

                        fontSize: "15px",
                        fontWeight: "300",
                        paddingLeft: "10px",
                      }}
                    >
                      {review.username}
                    </h6>
                  </div>
                  <h6
                    style={{
                      color: "white",
                      marginTop: "10px",
                      fontSize: "15px",
                      fontWeight: "400",
                    }}
                  >
                    {review.movieReview}
                  </h6>
                </>
              ))}
            </div>
          </Grid>
        </div>
      </Grid>
      <ToastContainer autoClose={2000} />
    </Grid>
  );
}
