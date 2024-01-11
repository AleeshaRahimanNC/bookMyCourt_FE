import React from "react";

function AddNewCourtBox() {
  return (
    <>
      <div className="p-2 border border-1 rounded-1 d-flex flex-column">
        <span className="mt-2">
          <label htmlFor="courtname">Court Name</label>
          <input type="text" />
        </span>

        <span className="mt-2">
          <label htmlFor="">Location</label>
          <input type="text" />
        </span>

        <span className="mt-2">
          <label htmlFor="">Address</label>
          <input type="text" />
        </span>

        <span className="mt-2">
          <label htmlFor="">Mobile Number</label>
          <input type="number" />
        </span>

        <span className="mt-2">
          <label htmlFor="">Description</label>
          <textarea></textarea>
        </span>
      </div>
    </>
  );
}

export default AddNewCourtBox;
