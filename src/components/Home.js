import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { database } from '../firebase/setup';

export default function Home() {
  const [movies,setMovies]=useState([]);
const getMovie= ()=>{
  try {
    
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=1b82a9898833abaf97361da2a282fe83`
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  } catch (error) {
    console.log(error)
    
  }
}

useEffect(() => {
  getMovie()
},[]);

const addMovie = async (movie)=>{
  const movieRef= doc(database,"Movies",`${movie.id}`)
  try {
    await setDoc(movieRef,{
      id:movie.id,
      movieName:movie.title,
      Movieposter:movie.poster_path,
      overview:movie.overview,
      release_date:movie.release_date,
      vote_average:movie.vote_average
    
    });
  } catch (error) {
    console.log(error)
    
  }
}



  return (
    <div style={{
      backgroundColor: "black",
      height:"auto",
      width:"100%",
    }}>
      <Grid container spacing={2}
      >


      { 
        movies?.map((movie)=>{
          {
            addMovie(movie)
          }
          return (
            <Grid
              item
              xs={3}
              style={{
                paddingTop: "20px",
                paddingRight: "20px",
                paddingLeft: "20px",
              }}
            >
              <Box>
                <Link to="/movieDetails" state={{movie:movie}}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    ></CardMedia>
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })

      }
      </Grid>
    </div>
  )
}
