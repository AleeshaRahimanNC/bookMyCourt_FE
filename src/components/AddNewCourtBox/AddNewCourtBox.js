import React, { useRef, useState } from "react";
import axios from "axios";
import "./AddNewCourtBox.css";
import { useNavigate } from "react-router-dom";
import { ErrorToast, successToast } from "../../Pulgins/Toast/Toast";
import addIcon from "@assets/add_icon.svg";

function AddNewCourtBox() {
  const [courtData, setCourtData] = useState({
    courtName: "",
    location: "",
    address: "",
    mobileNumber: "",
    description: "",
  });
  const fileInputRef = useRef();
  //console.log("court",courtData.courtName)
  const [selectedImage, setSelectedImage] = useState("");
  const [courtPic, setCourtPic] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourtData({ ...courtData, [e.target.name]: e.target.value });
  };
  const imageChange = (e) => {
    setCourtPic(e.target.files[0]);
    e.target.files[0]
      ? setSelectedImage(URL.createObjectURL(e.target.files[0]))
      : setSelectedImage(null);
  };

  const handleAddIconClick = () => {
    fileInputRef.current.click();
  };

  const createCourt = () => {
    let fileData = new FormData();
    fileData.append("image", courtPic);
    //  fileData.append('courtName', courtData.courtName);
    //  fileData.append('location', courtData.location);
    //  fileData.append('address',courtData.address);
    //  fileData.append('mobileNumber', courtData.mobileNumber);
    //  fileData.append('description', courtData.description);
    axios
      .post(
        `${process.env.REACT_APP_BE_URL}/admin/createCourt`,
        fileData,
        { params: courtData },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        console.log("hh", res);
        if (res.status === 200) {
          successToast("Court Added Successfully");
          navigate("/home");
        } else {
          ErrorToast("Unable to Add Court");
        }

        //handle success
      })
      .catch((err) => {
        console.log("s", err);
        ErrorToast("Something went wrong");
      });
  };
  return (
    <>
      <div className="container-fluid">
        <h3 className="mt-3">
          <strong>
            <em>Add New Court</em>
          </strong>
        </h3>

        <div style={{minHeight:"70vh"}} className="p-2 border border-3 border-success rounded-2 d-flex gap-3 px-3 mt-3 ">
          <div className="row">
            <div className="col-lg-4 col-md-6 mt-2 mb-3 court-input">
              <label htmlFor="courtname">Court Name</label>
              <input
                type="text"
                name="courtName"
                value={courtData.courtName}
                onChange={handleChange}
              />
            </div>

            <div className="col-lg-4 col-md-6 mt-2 mb-3 court-input">
              <label htmlFor="">Location</label>
              <input
                type="text"
                name="location"
                value={courtData.location}
                onChange={handleChange}
              />
            </div>

            <div className="col-lg-4 col-md-6 mt-2 mb-3 court-input">
              <label htmlFor="">Address</label>
              <input
                type="text"
                name="address"
                value={courtData.address}
                onChange={handleChange}
              />
            </div>

            <div className="col-lg-4 col-md-6 mt-2 mb-3 court-input">
              <label htmlFor="">Mobile Number</label>
              <input
                type="number"
                name="mobileNumber"
                value={courtData.mobileNumber}
                onChange={handleChange}
              />
            </div>

            <div className="col-lg-4 col-md-6 mt-2 mb-3 court-input">
              <label htmlFor="">Description</label>
              <textarea
                name="description"
                value={courtData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-lg-4 col-md-6 mt-2 mb-3 gap-3 image__style">
              <label htmlFor="" style={{marginTop:"34px"}}>Court Image</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={imageChange}
                style={{ display: "none" }}
              />
              <img
                src={addIcon}
                alt=""
                width={"80px"}
                height={"76px"}
                onClick={handleAddIconClick}
              />
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
            {selectedImage && (
              <img src={selectedImage} alt="" style={{    width: "28%",
                height: "80%"
            }} />
            )}
            </div>
           
          </div>
        </div>
        <div className="d-flex justify-content-center gap-3 mt-4 courtBox">
          <button className="courtbtn" onClick={createCourt}>
            Create
          </button>
          <button className="courtbtn">Cancel</button>
        </div>
      </div>
    </>
  );
}

export default AddNewCourtBox;
