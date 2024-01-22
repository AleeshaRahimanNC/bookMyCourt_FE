import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/AxiosInstance";
import MainNavBar from "../../components/NavBar/MainNavBar";
import "./CourtDetails.css";
import Modal from "../../components/common/Modal";
import { TIMINGS } from "../../constants";

function CourtDetails() {
    const { id } = useParams(); //get the id present in the router
    const [open, setOpen] = useState(false);
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
        console.log(slot);
        setSelected([...selected, slot]);
    };

const createslotsdata=()=>{
    debugger
}

    return (
        <>
            <MainNavBar />
            <div className="courtDetails-container">
                <img
                    src={`${process.env.REACT_APP_BE_URL}/images/${court.courtPic}`}
                    alt=""
                />
                <div>{court.courtName}</div>
                <div className="d-flex justify-content-end me-3">
                    <button className="px-2" onClick={openModal}>
                        Add time slots
                    </button>
                </div>
                {open && (
                    <Modal
                        open={open}
                        setOpen={setOpen}
                        buttonName={"Create Slots"}
                        heading={"Create Slots"}
                        handleSubmit={createslotsdata}
                    >
                        <div className="d-flex flex-column gap-2">
                            <h2>{court.courtName}</h2>
                            <h2>{court.location}</h2>
                            <span>
                                <label htmlFor="">Starting Date</label>
                                <input type="date" />
                            </span>
                            <span>
                                <label htmlFor="">Ending Date</label>
                                <input type="date" />
                            </span>
                            <span>
                                <label htmlFor="">Cost</label>
                                <input type="number" />
                            </span>
                            <span>
                                <label htmlFor="">Select Slots</label>
                                <select name="" id="" onChange={selectedSlot}>
                                    {filteredSlots.map((slot, index) => (
                                        <option value={slot.id} key={slot.id}>
                                            {slot.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                            <div>
                                {selected.map((slot) => (
                                    <label className="border border-1 rounded-1 p-2 me-1 mt-1">
                                        {slot.name}
                                    </label>
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
