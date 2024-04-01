import React, { useEffect, useState } from "react";
import CourtCards from "../courtCards/CourtCards";
import axiosInstance from "../../config/AxiosInstance";
import { ErrorToast } from "../../Pulgins/Toast/Toast";

function CourtListBody() {
  const [courtData, setCourtData] = useState([]);
  useEffect(() => {
    getCourtsData();
  }, []);

  const getCourtsData = () => {
    //axios.get(`${process.env.REACT_APP_BE_URL}/user/getCourtsData`)
    axiosInstance
      .get("/users/getCourtsData")
      .then((res) => {
        setCourtData(res.data); //[]array of data coming
      })
      .catch((err) => {
        console.log(err);
        ErrorToast("Something went wrong");
      });
  };
  return (
    <div className="container-fluid">
      <div className="row gap-2 p-2 home__wrapper">
        {courtData.map((court) => (
          <CourtCards court={court} />
        ))}
      </div>
    </div>
  );
}

export default CourtListBody;
