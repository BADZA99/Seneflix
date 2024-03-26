import React from "react";
import { useLocation } from "react-router";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";





export default function MovieDetails() {
  const location = useLocation();
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
              // backgroundColor: "rgba(0,0,0,0.5)",
              position: "absolute",
              top: "53%",
              left: "0%",
              fontFamily: "initial",
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
              <Button
                variant="contained"
                style={{
                  color: "black",
                  backgroundColor: "white",
                }}
              >
                Play trailer
              </Button>
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
              />
              <Button
                variant="contained"
                sx={{
                  height: "37px",
                  ml: "10px",
                  marginTop: "10px",
                  bgcolor: "red",
                }}
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
                  fontSize:"20px",
                  fontWeight: "200",
                }}
              >
                Review
              </h6>
            </div>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
