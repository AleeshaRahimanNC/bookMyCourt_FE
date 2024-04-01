import React, { useState } from 'react';


import './Modal.css'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';


export default function Modal({ open, setOpen, children, buttonName, heading, handleSubmit }) {

    const toggleOpen = () => setOpen(!open);

    return (
        <>
        
            {/* <MDBBtn onClick={toggleOpen}>Vertically centered modal</MDBBtn> */}

            <MDBModal  tabIndex='-1' open={open} setOpen={setOpen}>
                <MDBModalDialog centered >
                    <MDBModalContent className='modal-content border border-1'>
                        <MDBModalHeader className='modal-heading w-100'>
                            <MDBModalTitle>{heading}</MDBModalTitle>
                            <MDBBtn className='btn-close' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className='modal-child'>
                            {children}
                        </MDBModalBody>
                        <MDBModalFooter className='modal-footer'>
                        <button className='modal-btn btn rounded-3'  onClick={toggleOpen}>
                                Close
                            </button>
                            <button className='modal-btn btn rounded-3' onClick={handleSubmit}>{buttonName}</button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}