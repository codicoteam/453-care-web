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
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Col,
} from "reactstrap";

import {
  Badge,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import { Modal } from 'antd';
import { message , Space} from 'antd';
import { Alert } from 'antd';
import EmployeeViewMoreDrawer from "./employee_view";
import EmployeeUpdateDrawer from "./employee_update";
import EmployeeTop from "./employee_top";
import Chip from '@mui/material/Chip';





const Employee = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';



  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpenUpdate, setDrawerOpenUpdate] = useState(false);
  const [show, setShow] = useState(true);



  const showDrawer = () => {
    setDrawerOpen(true);

  };
  const showDrawerUpdate = () => {
    setDrawerOpenUpdate(true);

  };

  const closeDrawerUpdate = () => {
    setDrawerOpenUpdate(false);

  };
  const closeDrawer = () => {
    setDrawerOpen(false);

  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    openMessage()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });
    }, 1000);
  };
  return (
    <>
      <EmployeeTop />
      {/* Page content */}
      <Container className="mt--7" fluid>

        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0"> Assigned Employes</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Full Time 
                    </Button>
                    <Button
                      color="secondary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Part Time
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Date</th>

                    <th scope="col">Budget Paid</th>
                    <th scope="col">Problem Completion</th>
                    <th scope="col">Working Condition</th>
                    <th scope="col">Route</th>
                    <th scope="col">Assigned Hours</th>
                    <th scope="col">Worked Hours</th>
                    <th scope="col">Finishing Time</th>



                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Ashton Mapunga</th>
                    <td>09/10/2021</td>
                    <td>$1200 USD</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                    <td>  
                    <Chip label="Full Time" variant="outlined" color="success" size="small" />
                
                    </td>
                    <td>  
                      Kwekwe
                
                    </td>
                    <td>
                      2hrs
                    </td>
                    <td>
                      1hrs
                    </td>
                    <td>
                      01:00
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Farai</th>
                    <td>09/10/2021</td>
                    <td>$1200 USD</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                    <td>  
                    <Chip label="Full Time" variant="outlined" color="success"  size="small"/>
                
                    </td>
                    <td>  
                      Harare
                
                    </td>
                    <td>
                      2hrs
                    </td>
                    <td>
                      1hrs
                    </td>
                    <td>
                      03:00
                    </td>

                  </tr>
                  <tr>
                    <th scope="row">Tino Chipoi</th>
                    <td>12/12/2024</td>
                    <td>$100 USD</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                    <td>  
                    <Chip label="Full Time" variant="outlined" color="success" size="small" />
                
                    </td>
                    <td>  
                      Harare
                
                    </td>
                    <td>
                      2hrs
                    </td>
                    <td>
                      2hrs
                    </td>
                    <td>
                      04:00
                    </td>


                  </tr>
                  <tr>
                    <th scope="row">King Mapmak</th>
                    <td>12/09/2024</td>
                    <td>$1200 USD</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                    <td>  
                    <Chip label="Full Time" variant="outlined" color="success" size="small" />
                
                    </td>
                    <td>  
                      Bulawayo
                
                    </td>
                    <td>
                      2hrs
                    </td>
                    <td>
                      2hrs
                    </td>
                    <td>
                      04:00
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Makaza Prince</th>
                    <td>12/08/2023</td>
                    <td>$1700 USD</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                    <td>  
                    <Chip label="Full Time" variant="outlined" color="success"  size="small" />
                
                    </td>
                    <td>  
                      Mutare
                
                    </td>
                    <td>
                      2hrs
                    </td>        <td>
                      1hrs
                    </td>
                    <td>
                      05:00
                    </td>

                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Number of Employee Per Run</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Number Of Employees</th>
                    <th scope="col">Run</th>
                    <th scope="col" >Progress Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">8</th>
                    <td>Airport Road Run</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">20</th>
                    <td>Bulawayo Road Run</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">30</th>
                    <td>Mutare Road Run</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">13</th>
                    <td>Masvingo Road Run</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">12</th>
                    <td>Chitungiza Run</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <EmployeeViewMoreDrawer open={drawerOpen} onClose={closeDrawer} />
        <EmployeeUpdateDrawer open={drawerOpenUpdate} onClose={closeDrawerUpdate} />


        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
              <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Unassigned Employes</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Full Time 
                    </Button>
                    <Button
                      color="secondary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Part Time
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Town</th>
                    <th scope="col">Working Condition</th>
                    <th scope="col">Suggested Clients</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Route</th>
                    <th scope="col">Working Duration</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col" >Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip742438047"
                          onClick={(e) => e.preventDefault()}
                        >

                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-1-800x800.jpg")}
                          />
                        </a>

                        <Media>
                          <span className="mb-0 ml-2 text-sm">
                            Ashton Mapunga
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Harare</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        Part Time
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip742438047"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-1-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip742438047"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip941738690"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-2-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip941738690"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip804044742"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-3-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip804044742"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip996637554"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip996637554"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-danger"
                          />
                        </div>
                      </div>
                    </td>
                    <td>Harare </td>
                    <td>16:00 - 20:00</td>
                    <td>+263712494841</td>

                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem href="#pablo" onClick={(e) => { e.preventDefault(); showDrawer(); }}>
                            More Details
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => { e.preventDefault(); showDrawerUpdate(); }}
                          >
                                                        Update Employee

                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={showModal}
                          >
                            Assign Work
                            </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={showModal}
                          >
                            Remove Employee
                          </DropdownItem>

                          <Modal title="Remove Employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Alert
                              message="Eish"
                              description="Are you sure you want to delete this employee."
                              type="warning"
                              showIcon
                            />
                          </Modal>
                          {contextHolder}
                        </DropdownMenu>
                      </UncontrolledDropdown>

                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip742438047"
                          onClick={(e) => e.preventDefault()}
                        >

                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-2-800x800.jpg")}
                          />
                        </a>

                        <Media>
                          <span className="mb-0 ml-2 text-sm">
                            Prince Makaza
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Kwekwe</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />
                        Full Time
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip746418347"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-1-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip746418347"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip102182364"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-2-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip102182364"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip406489510"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-3-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip406489510"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip476840018"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip476840018"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>

                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">100%</span>
                        <div>
                          <Progress
                            max="100"
                            value="100"
                            barClassName="bg-success"
                          />
                        </div>
                      </div>
                    </td>
                    <td>Bulawayo</td>
                    <td>18:00 - 20:00</td>
                    <td>+263712494341</td>



                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip742438047"
                          onClick={(e) => e.preventDefault()}
                        >

                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-3-800x800.jpg")}
                          />
                        </a>

                        <Media>
                          <span className="mb-0 ml-2 text-sm">
                            Tapiwa Maunganidza
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Mutare</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        Part Time
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip753056318"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-1-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip753056318"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip441753266"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-2-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip441753266"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip188462246"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-3-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip188462246"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip621168444"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip621168444"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">72%</span>
                        <div>
                          <Progress
                            max="100"
                            value="72"
                            barClassName="bg-danger"
                          />
                        </div>
                      </div>
                    </td>
                    <td>Harare</td>
                    <td>15:00 - 21:00</td>
                    <td>+263782494341</td>

                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip742438047"
                          onClick={(e) => e.preventDefault()}
                        >

                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>

                        <Media>
                          <span className="mb-0 ml-2 text-sm">
                            Panashe Codico
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Mutare</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        Full Time
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip875258217"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-1-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip875258217"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip834416663"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-2-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip834416663"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip372449339"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-3-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip372449339"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip108714769"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip108714769"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">90%</span>
                        <div>
                          <Progress
                            max="100"
                            value="90"
                            barClassName="bg-info"
                          />
                        </div>
                      </div>
                    </td>
                    <td>Mutare</td>
                    <td>17:00 - 23:00</td>
                    <td>+263712494341</td>

                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip742438047"
                          onClick={(e) => e.preventDefault()}
                        >

                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-2-800x800.jpg")}
                          />
                        </a>

                        <Media>
                          <span className="mb-0 ml-2 text-sm">
                            Tapiwa Codico
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Kwekwe</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Full Time
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip664029969"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-1-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip664029969"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip806693074"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-2-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip806693074"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip844096937"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-3-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip844096937"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip757459971"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip757459971"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">100%</span>
                        <div>
                          <Progress
                            max="100"
                            value="100"
                            barClassName="bg-success"
                          />
                        </div>
                      </div>
                    </td>
                    <td>Mutare</td>
                    <td>10:00 - 20:00</td>
                    <td>+263780897191</td>

                    
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>


      </Container>
    </>
  );
};

export default Employee;
