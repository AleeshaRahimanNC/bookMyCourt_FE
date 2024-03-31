import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './MainNavBar.css'

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
//import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function MainNavBar() {
  const [openBasic, setOpenBasic] = useState(false);
  const navigate=useNavigate()
  const doLogout=()=>{
    //localStorage.remove('token')
    //localStorage.remove('user')
    localStorage.clear()
    navigate('/')
  }

const {user} = useSelector((store)=>store.user)

  return (
    <MDBNavbar className='navbar navbar-expand-lg shadow py-3 sticky-top'>
      <MDBContainer fluid>
      <MDBNavbarBrand className='navbar-brand'><em>BookMyCourt</em></MDBNavbarBrand> 

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon className='toggle-icon' icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 navbar-pack1'>
            <MDBNavbarItem className='navbar-pack'>
              <MDBNavbarLink className='navbar-pack2' active aria-current='page' href='/home'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>

            {user.role===1 && <MDBNavbarItem className='navbar-pack'>
              <MDBNavbarLink className='navbar-pack2' active aria-current='page' href='/addNewCourt'>
                AddNewCourt
              </MDBNavbarLink>
            </MDBNavbarItem>}
            
            <MDBNavbarItem className='navbar-pack'>
              <MDBNavbarLink className='navbar-pack2' active aria-current='page' href='/mybookings'>
                My Bookings
              </MDBNavbarLink>
            </MDBNavbarItem>

{/* Dropdown code */}

            {/* <MDBNavbarItem className='navbar-pack'>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link navbar-pack2' role='button'>
                  Dropdown
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Action</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem> */}

        </MDBNavbarNav>

          <form className='d-flex input-group w-auto input-query'>
            <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
          </form>
          <Button className='navbar__button-style mt-4' variant="warning">search</Button>
        <div className='d-none d-lg-block'> {/*Display on large screen only*/}
               <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link ms-2' role='button'>
     {user.name}           
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Profile</MDBDropdownItem>
                  {/* <MDBDropdownItem link>Another action</MDBDropdownItem> */}
                  <MDBDropdownItem link onClick={doLogout}>Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
        </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
