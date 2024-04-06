import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./MainNavBar.css";

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
} from "mdb-react-ui-kit";
//import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MainNavBar() {
  const [openBasic, setOpenBasic] = useState(false);
  const navigate = useNavigate();
  const doLogout = () => {
    //localStorage.remove('token')
    //localStorage.remove('user')
    localStorage.clear();
    navigate("/");
  };

  const { user } = useSelector((store) => store.user);
  const userName=JSON.parse(localStorage.getItem("user"));

  const getRole = localStorage.getItem("role");

  return (
    <MDBNavbar className="navbar navbar-expand-lg shadow py-3 sticky-top">
      <MDBContainer fluid>
        <MDBNavbarBrand className="navbar-brand">
          <em>BookMyCourt</em>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon className="toggle-icon" icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 navbar-pack1">
            <MDBNavbarItem className="navbar-pack">
              {/* <MDBNavbarLink className='navbar-pack2' active aria-current='page' href='/home'>
                Home
              </MDBNavbarLink> */}
              <Link
                className="navbar-pack2 p-3"
                active
                aria-current="page"
                to={"/home"}
              >
                Home
              </Link>
            </MDBNavbarItem>
            {/* user.role===1 */}
            {getRole === "1" && (
              <MDBNavbarItem className="navbar-pack">
                {/* <MDBNavbarLink className='navbar-pack2' active aria-current='page' href='/addNewCourt'>
                AddNewCourt
              </MDBNavbarLink> */}
                <Link
                  className="navbar-pack2 p-3"
                  active
                  aria-current="page"
                  to={"/addNewCourt"}
                >
                  AddNewCourt
                </Link>
              </MDBNavbarItem>
            )}

            <MDBNavbarItem className="navbar-pack">
              {/* <MDBNavbarLink className='navbar-pack2' active aria-current='page' href='/courts/courtlist'>
                Courts
              </MDBNavbarLink> */}
              <Link
                className="navbar-pack2 p-3"
                active
                aria-current="page"
                to={"/courts/courtlist"}
              >
                Courts
              </Link>
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
{/* w-auto */}
          <form className="d-flex input-group  input-query">
            <input
              type="search"
              className="form-control input__style"
              placeholder="Type query"
              aria-label="Search"
            />
          </form>
          <Button className="navbar__button-style mt-4" variant="warning">
            search
          </Button>
          <div className="d-lg-block d-md-block d-sm-block">
            {" "}
            {/*Display on large screen only*/}
            <MDBDropdown>
              <MDBDropdownToggle
                tag="a"
                className="nav-link ms-2 user_style"
                role="button"
              >
                {/* {user.name} */}
                {userName}
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown_style">
                <MDBDropdownItem link className="dropdown_style1">Profile</MDBDropdownItem>
                {/* <MDBDropdownItem link>Another action</MDBDropdownItem> */}
                <MDBDropdownItem link onClick={doLogout} className="dropdown_style1">
                  Logout
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
