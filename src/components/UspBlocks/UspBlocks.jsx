import React from "react";
import "./UspBlocks.css";
import users from '@assets/users-2-svgrepo-com.svg'
import location from '@assets/location-pin-alt-1-svgrepo-com.svg'
import access from '@assets/24-hours-service-svgrepo-com.svg'
import offers from '@assets/credit-card-shopping-svgrepo-com.svg'
import courts from '@assets/court-football-game-svgrepo-com.svg'

function UspBlocks() {
  return (
    <div className="d-flex flex-wrap justify-content-center brand-promo-container gap-3">
      <div className="brand-promo-box text-center">
        <h4>10000+</h4>
        <p>Happy Customers</p>
        <img src={users} height="40px" alt="" />
      </div>

      <div className="brand-promo-box text-center ">
        <h4>100+ Location</h4>
        <p>Available 20+ States In India</p>
        <img src={location} height="40px" alt="" />
      </div>

      <div className="brand-promo-box text-center">
        <h4>24/7 Access</h4>
        <p>Choose Favorite Slots</p>
        <img src={access} height="40px" alt="" />
      </div>

      <div className="brand-promo-box text-center">
        <h4>Welcome Offers</h4>
        <p>Get Free Access To All Courts</p>
        <img src={offers} height="40px" alt="" />
      </div>

      <div className="brand-promo-box text-center">
        <h4>Free & Rented Accessories</h4>
        <p>Happy Customers</p>
        <img src={courts} height="40px" alt="" />
      </div>
    </div>
  );
}

export default UspBlocks;
