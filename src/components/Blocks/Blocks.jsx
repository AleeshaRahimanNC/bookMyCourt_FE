import React from "react";
import "./Blocks.css";
import search from '@assets/search-globe.svg'
import book from '@assets/appointments-svgrepo-com.svg'
import football from '@assets/sports-soccer-svgrepo-com.svg'

function Blocks() {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-center w-100 h-50  home-box-2 blocks-container">
      <div className="d-flex flex-column  align-items-center text-break p-3 text-center">
        <img src={search} alt="" />
        <h3>Search</h3>
        <p>Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities whole over the india.</p>
      </div>

      <div className="d-flex flex-column  align-items-center text-break p-3 text-center">
        <img src={book} alt="" />
        <h3>Book</h3>
        <p>Once you've found the perfect ground, court or gym, Connect with the venu through the Book Now Button to make online booking & secure easier payment.</p>
      </div>

      <div className="d-flex flex-column  align-items-center text-break p-3 text-center">
        <img src={football} alt="" />
        <h3>Play</h3>
        <p>You're the hero, you've found a stunning turf or court, booked with ease and now its time to play. The scene is set for your epic match.</p>
      </div>
    </div>
  );
}

export default Blocks;
