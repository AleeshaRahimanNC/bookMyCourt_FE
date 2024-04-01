import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/AxiosInstance";
import MainNavBar from "../../components/NavBar/MainNavBar";
import "./CourtDetails.css";
import Modal from "../../components/common/Modal/Modal";
import { TIMINGS } from "../../constants";
import editIcon from "@assets/test.svg";
import filesIcon from "@assets/filesimg.svg";
import addIcon from "@assets/addicon.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ErrorToast, successToast } from "../../Pulgins/Toast/Toast";
import { useDispatch } from "react-redux";
import { showorhideLoader } from "../../toolkit/generalSlice";


function CourtDetails() {
  const { id } = useParams(); //get the id present in the router
  const [open, setOpen] = useState(false);
  const [slotdata, setSlotData] = useState({});
  const dispatch=useDispatch()
  useEffect(() => {
    getCourtDatabyId();
  }, []);
  const [court, setCourt] = useState({}); //we can only write the hook outside of another hook,if loop,aboue return
  const [selected, setSelected] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState(TIMINGS);

  const getCourtDatabyId = () => {
    axiosInstance
      .get("/users/getCourtDatabyId", { params: { id } })
      .then((res) => {
        setCourt(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModal = () => {
    setOpen(true);
  };

  const selectedSlot = (e) => {
    const slot = TIMINGS.find(
      (element) => element.id === parseInt(e.target.value)
    );
    const filterData = filteredSlots.filter(
      (element) => element.id !== parseInt(e.target.value)
    );
    setFilteredSlots(filterData);

    setSelected([...selected, slot]);
  };

  const handleSlotData = (e) => {
    setSlotData({ ...slotdata, [e.target.name]: e.target.value });
  };

  const createslotsdata = () => {
    dispatch(showorhideLoader(true))
    axiosInstance
      .post("/admin/addtimeslotsData", {
        ...slotdata,
        slots: selected,
        courtId: id,
      })
      .then((res) => {
        setOpen(false);
        // alert(res.data);
        dispatch(showorhideLoader(false))
        successToast("Slot Created Successfully");
        
      })
      .catch((err) => {
        console.log(err);
        dispatch(showorhideLoader(false))
        ErrorToast("Slot Creation Failed");
      });
  };

  return (
    <>
      <MainNavBar />
      <div className="courtDetails-container">
        <div className="image-box">
          <img
            src={`${process.env.REACT_APP_BE_URL}/images/${court.courtPic}`}
            alt=""
          />

          <div className="detail-image-content d-flex justify-content-between p-4">
            <div className="d-flex flex-column justify-content-center text-white">
              <h3>{court.courtName}</h3>
              <p>{court.location}</p>
            </div>

            <div className=" align-self-end d-flex gap-3 px-3">
              <button className="boxbtn" onClick={openModal}>
                Book
              </button>

              <button className="boxbtn">
                <img src={editIcon} alt="" />
              </button>

              <button className="boxbtn">
                <img src={filesIcon} alt="" />
              </button>

              <button className="boxbtn">
                <img src={addIcon} alt="" />
              </button>
            </div>
          </div>
        </div>

        <ReactQuill
          readOnly={true}
          theme="bubble"
          className="quill"
          // style={{fontSize:'1000px'}}
          value={court.description}
        />

        {open && (
          <Modal
            open={open}
            setOpen={setOpen}
            buttonName={"Create Slots"}
            heading={"Create Slots"}
            handleSubmit={createslotsdata}
          >
            <div className="container-fluid">
              <div className="mt-3 court-headings">
                <h1>
                  <strong>
                    <em>{court.courtName}</em>
                  </strong>
                </h1>
                <h4>{court.location}</h4>
              </div>

              <div className="p-2 border border-3 border-success rounded-2 d-flex gap-3 px-3 mt-3 ">
                <div className="row">
                  <div className="col-lg-4 col-md-6 mt-2 mb-3 court-input">
                    <label htmlFor="">Starting Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={slotdata.startDate}
                      onChange={handleSlotData}
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 mt-2 mb-3 court-input">
                    <label htmlFor="">Ending Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={slotdata.endDate}
                      onChange={handleSlotData}
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 mt-2 mb-3 court-input">
                    <label htmlFor="">Cost</label>
                    <input
                      type="number"
                      name="cost"
                      value={slotdata.cost}
                      onChange={handleSlotData}
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 mt-2 mb-4 court-input">
                    <label htmlFor="">Select Slots</label>
                    <select name="" id="" onChange={selectedSlot}>
                      {filteredSlots.map((slot, index) => (
                        <option value={slot.id} key={slot.id}>
                          {slot.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    {selected.map((slot) => (
                      <label className="border border-1 rounded-1 p-2 me-1 mt-1">
                        {slot.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

export default CourtDetails;
