import React, { useState } from "react";
import axios from "axios";

function AddNewCourtBox() {
  const [courtData, setCourtData] = useState({
    courtName: "",
    location: "",
    address: "",
    mobileNumber: "",
    description: "",
  });
  //console.log("court",courtData.courtName)
  const [selectedImage, setSelectedImage] = useState("");
  const [courtPic, setCourtPic] = useState("");
  const handleChange = (e) => {
    setCourtData({ ...courtData, [e.target.name]: e.target.value });
  };
  const imageChange = (e) => {
    setCourtPic(e.target.files[0]);
    e.target.files[0]
      ? setSelectedImage(URL.createObjectURL(e.target.files[0]))
      : setSelectedImage(null);
  };
  const createCourt = () => {
    let fileData = new FormData();
    fileData.append('image', courtPic);
  //  fileData.append('courtName', courtData.courtName);
  //  fileData.append('location', courtData.location);
  //  fileData.append('address',courtData.address);
  //  fileData.append('mobileNumber', courtData.mobileNumber);
  //  fileData.append('description', courtData.description);
    axios
      .post(
        `${process.env.REACT_APP_BE_URL}/admin/createCourt`,
        fileData,
        {params: courtData},
        {headers: { "Content-type": "multipart/form-data" } }
        
      )
      .then((res) => {
        console.log("hh",res)
//handle success
      })
      .catch((err) => {
        console.log("s",err);
        //debugger;
      });
  };
  return (
    <>
      <div className="p-2 border border-1 rounded-1 d-flex flex-column">
        <span className="mt-2">
          <label htmlFor="courtname">Court Name</label>
          <input
            type="text"
            name="courtName"
            value={courtData.courtName}
            onChange={handleChange}
          />
        </span>

        <span className="mt-2">
          <label htmlFor="">Location</label>
          <input
            type="text"
            name="location"
            value={courtData.location}
            onChange={handleChange}
          />
        </span>

        <span className="mt-2">
          <label htmlFor="">Address</label>
          <input
            type="text"
            name="address"
            value={courtData.address}
            onChange={handleChange}
          />
        </span>

        <span className="mt-2">
          <label htmlFor="">Mobile Number</label>
          <input
            type="number"
            name="mobileNumber"
            value={courtData.mobileNumber}
            onChange={handleChange}
          />
        </span>

        <span className="mt-2">
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            value={courtData.description}
            onChange={handleChange}
          ></textarea>
        </span>

        <span className="mt-2">
          <label htmlFor="">Court Image</label>
          <input type="file" onChange={imageChange} />
        </span>
        { selectedImage && 
          <img src={selectedImage} alt="" width={100} height={100} />
        }
      </div>
      <button onClick={createCourt}>Create</button>
    </>
  );
}

export default AddNewCourtBox;
