import React from "react";
import './CourtCards.css'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

export default function CourtCards({ court }) {
  const navigate = useNavigate();

  const openCourtDetails = () => {
    navigate(`/courtDetails/${court._id}`);  // called as params 
  };

  return (
    <MDBCard
      style={{ width: "18rem" }}
      className="col-12 col-md-3 col-lg-4 col-xl-2 col-xxl-1 court-container shadow"
      onClick={openCourtDetails}
    >
      <MDBCardImage className="court-img"
        src={`${process.env.REACT_APP_BE_URL}/images/${court.courtPic}`}
        position="top"
        alt="..."
      />
      <MDBCardBody>
        <MDBCardTitle>{court.courtName}</MDBCardTitle>
        <MDBCardTitle>{court.location}</MDBCardTitle>
        <MDBCardText></MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}

//module.exports= CourtCards
