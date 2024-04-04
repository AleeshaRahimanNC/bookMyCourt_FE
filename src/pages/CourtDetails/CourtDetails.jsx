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
import "react-quill/dist/quill.snow.css";
import { ErrorToast, successToast } from "../../Pulgins/Toast/Toast";
import { useDispatch } from "react-redux";
import { showorhideLoader } from "../../toolkit/generalSlice";

function CourtDetails() {
  const { id } = useParams(); //get the id present in the router
  const [open, setOpen] = useState(false);
  const [slotdata, setSlotData] = useState({});
  const [court, setCourt] = useState({}); //we can only write the hook outside of another hook,if loop,aboue return
  const [selected, setSelected] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState(TIMINGS);
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10) //yy-mm-dd
  );
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getCourtDatabyId();
  }, []);

  useEffect(() => {
    getslotsdata();
  }, [selectedDate]);

  const getslotsdata = () => {
    dispatch(showorhideLoader(true));
    axiosInstance
      .get("/users/getslotsdata", {
        params: { courtId: id, date: selectedDate },
      })
      .then((res) => {
        setSlots(res.data);
        dispatch(showorhideLoader(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showorhideLoader(false));
        ErrorToast("Something went wrong");
      });
  };

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
    dispatch(showorhideLoader(true));
    axiosInstance
      .post("/admin/addtimeslotsData", {
        ...slotdata,
        slots: selected,
        courtId: id,
      })
      .then((res) => {
        setOpen(false);
        // alert(res.data);
        dispatch(showorhideLoader(false));
        successToast("Slot Created Successfully");
      })
      .catch((err) => {
        console.log(err);
        dispatch(showorhideLoader(false));
        ErrorToast("Slot Creation Failed");
      });
  };

  // Booking Modal
  const setorDeselectslot = (slot) => {
    if (bookedSlots.find((ele) => ele._id === slot._id)) {
      const temp = bookedSlots.filter((ele) => ele._id !== slot._id);
      setBookedSlots(temp);
    } else {
      setBookedSlots([...bookedSlots, slot]);
    }
  };

  async function initiateBooking() {
    dispatch(showorhideLoader(true));
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      
      ErrorToast("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const slotIds = bookedSlots.map((ele) => {
      return ele._id;
    });
    // creating a new order
    const result = await axiosInstance.post("/payments/orders", {
      courtId: id,
      slotIds: slotIds,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency, receipt } = result.data;
    dispatch(showorhideLoader(false))
    const options = {
      key: process.env.REACT_APP_RP_KEY_ID,
      amount: amount.toString(),
      currency: currency,
      name: "Book My Court pvt.ltd",
      description: "Booking payments",
      image: null,
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          receipt,
          slotIds,
          courtId: id,
          date: selectedDate,
        };

        const result = await axiosInstance.post("/payments/verify", data);
          setBookingModal(false)
          getslotsdata()
          successToast(result.data.msg);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

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
              <button
                className="boxbtn"
                onClick={() => {
                  console.log("Button clicked");
                  setBookingModal(true);
                }}
              >
                Book
              </button>

              <button className="boxbtn">
                <img src={editIcon} alt="" />
              </button>

              <button className="boxbtn">
                <img src={filesIcon} alt="" />
              </button>

              <button className="boxbtn">
                <img src={addIcon} alt="" onClick={openModal} />
              </button>
            </div>
          </div>
        </div>

        {/* <ReactQuill
          readOnly={true}
          theme="bubble"
         
          // style={{fontSize:'1000px'}}
          value={}
        /> */}
        <p className="quill">{court.description}</p>

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

        {bookingModal && (
          <Modal
            open={bookingModal}
            setOpen={setBookingModal}
            buttonName={"Book"}
            heading={"Booking Slots"}
            handleSubmit={initiateBooking}
          >
            <div className="container-fluid p-3 h-100 d-flex flex-column">
              <label htmlFor="" className="mt-1">
                Start Date:
              </label>
              <input
                type="date"
                className="p-1 px-2 mx-2 border rounded-1"
                value={selectedDate}
                min={new Date().toISOString().substr(0, 10)}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <label htmlFor="">Available Slots</label>
              <div className="d-flex flex-wrap gap-2 mt-1">
                {/* notavailable */}
                {slots.map((slot) => (
                  <span
                    className={`${
                      bookedSlots.find((ele) => ele._id === slot._id)
                        ? "bg-info-subtle "
                        : slot.bookedBy
                        ? "notavailable"
                        : "availableslots"
                    } px-2 py-1 mt-2`}
                    onClick={() => !slot.bookedBy && setorDeselectslot(slot)}
                  >
                    {slot.slot.name}
                  </span>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

export default CourtDetails;
