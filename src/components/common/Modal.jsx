import React, { useState } from 'react';
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
            <MDBBtn onClick={toggleOpen}>Vertically centered modal</MDBBtn>

            <MDBModal tabIndex='-1' open={open} setOpen={setOpen}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{heading}</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {children}
                        </MDBModalBody>
                        <MDBModalFooter>
                            <button className='btn border btn-dark rounded-1 p-1' color='secondary' onClick={toggleOpen}>
                                Close
                            </button>
                            <button className='btn border btn-primary rounded-1 p-1' onClick={handleSubmit}>{buttonName}</button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}