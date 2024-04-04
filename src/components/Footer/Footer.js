import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import './Footer.css'

export default function Footer (){
  return (
    <MDBFooter  className='text-center text-lg-left footer-container'>
      <div className='text-center footer-box p-3'>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='footer-link'>
          BookMyCourt.com
        </a>
      </div>
    </MDBFooter>
  );
}
