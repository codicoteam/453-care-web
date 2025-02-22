/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const AdminNavbar = () => {
  return (
    <>
      <Navbar
        className="navbar-top navbar-horizontal navbar-dark w-100  mt-4 border bg-white   border-gray-200 my-4"
        expand="md"
        style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.5)" }}
      >
        <Container fluid className="px-4">
          {" "}
          {/* Use `fluid` for full-width container */}
          <NavbarBrand to="/" tag={Link}>
            <a
              href="#pablo"
              id="tooltip742438047"
              onClick={(e) => e.preventDefault()}
            >
              <img
                alt="..."
                src={require("../../assets/img/brand/453.jpg")}
                style={{ width: "60px", height: "60px" }}
              />
            </a>

            {/* <img
              alt="..."
              src={require("../../assets/img/brand/logoHtc.jpeg")}
              style={{ width: "70px", height: "50px" }}
            /> */}
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={require("../../assets/img/brand/logoHtc.jpeg")}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto align-items-center d-flex" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/mydashboard" tag={Link}>
                  <i
                    className="fas fa-tachometer-alt text-2xl"
                    style={{ color: "blue" }}
                  />
                  <span
                    className="font-bold text-indigo-500 text-2xl "
                    style={{ color: "blue" }}
                  >
                    Dashboard
                  </span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/mycarer"
                  tag={Link}
                >
                  <i
                    className="fas fa-user-friends text-2xl"
                    style={{ color: "blue" }}
                  />
                  <span
                    className="nav-link-inner--text text-2xl"
                    style={{ color: "blue" }}
                  >
                    Carers
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon text-2xl"
                  to="/auth/myclient"
                  tag={Link}
                >
                  <i className="fas fa-users" style={{ color: "blue" }} />
                  <span
                    className="nav-link-inner--text text-blue-900 text-2xl"
                    style={{ color: "blue" }}
                  >
                    Clients
                  </span>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                  <i
                    className="fas fa-cogs text-2xl"
                    style={{ color: "blue" }}
                  />
                  <span
                    className="nav-link-inner--text text-2xl"
                    style={{ color: "blue" }}
                  >
                    Manage
                  </span>
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/myvisits" tag={Link}>
                  <i
                    className="fas fa-chart-line text-2xl"
                    style={{ color: "blue" }}
                  />
                  <span
                    className="nav-link-inner--text text-2xl"
                    style={{ color: "blue" }}
                  >
                    Visits
                  </span>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                  <i
                    className="fas fa-wallet text-2xl"
                    style={{ color: "blue" }}
                  />
                  <span
                    className="nav-link-inner--text text-2xl"
                    style={{ color: "blue" }}
                  >
                    Finance
                  </span>
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/myrunner" tag={Link}>
                  <i
                    className="fas fa-user-shield text-blue-500 text-2xl"
                    style={{ color: "blue" }}
                  />
                  <span
                    className="nav-link-inner--text text-blue-500 text-2xl font-semibold"
                    style={{ color: "blue" }}
                  >
                    Runners
                  </span>
                </NavLink>
              </NavItem>


              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/carerequired" tag={Link}>
                  <i
                    className="fas fa-user-shield text-blue-500 text-2xl"
                    style={{ color: "blue" }}
                  />
                  <span
                    className="nav-link-inner--text text-blue-500 text-2xl font-semibold"
                    style={{ color: "blue" }}
                  >
                    Carer reqiured
                  </span>
                </NavLink>
              </NavItem>

              <FormGroup className="mb-0 ml-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="User Search" type="text" />
                </InputGroup>
              </FormGroup>
              {/* <FormGroup className="mb-0 ml-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-list" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <select className="form-control">
                    <option value="" disabled selected>
                      All
                    </option>
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                    <option value="user3">User 3</option>
                  </select>
                </InputGroup>
              </FormGroup> */}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
