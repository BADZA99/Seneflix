import React from "react";
import Modal from "react-modal";
import { Button } from "@mui/material";
import Youtube from 'react-youtube';
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function Trailer({location,movieId}) {
    const [trailerView,setTrailerView]=useState([])
   const ShowTrailer = useCallback(() => {
     fetch(
       `https://api.themoviedb.org/3/movie/${
         movieId ? movieId : location?.state?.movie.id
       }/videos?api_key=1b82a9898833abaf97361da2a282fe83&language=en-US`
     )
       .then((res) => res.json())
       .then((json) => setTrailerView(json.results));
   }, [movieId, location?.state?.movie.id]);

   useEffect(() => {
     ShowTrailer();
   }, [ShowTrailer]);


//   let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

//   function afterOpenModal() {
//     subtitle.style.color = "#f00";
//   }

  function closeModal() {
    setIsOpen(false);
  }

//   console.log(trailerView)

  return (
    <div>
      <Button 
      variant='contained'
        sx={{
            bgcolor:"white",
            color:"black"
        }}
      onClick={openModal}>Play Trailer</Button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2> */}
        <Button onClick={closeModal}
        variant='contained'
        sx={{
            bgcolor:"red",
            color:"white"
        }}
        >close</Button>
        <Youtube videoId={trailerView[0]?.key}/>
      </Modal>
    </div>
  );
}
