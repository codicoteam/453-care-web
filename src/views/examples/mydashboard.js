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

// reactstrap components
import HomeTable from "components/tables/home_table";
import {
  Button,
  Card,
  CardHeader,
  Progress,
  Table,
  Container,

  Row,
  Col,
} from "reactstrap";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import PrimaryButton from "components/buttons/primary_button";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);


const MyDashboard = () => {
  return (
    <>
      <Container className="mt--7" fluid>

        <Row className="mt-5">
          <Col xl="2">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Checklist</h3>
                  </div>

                </Row>
                <Row className="align-items-center">
                  <div className="col mt-4">
                    <h3 className="mb-0" style={{ color: 'red' }}>8 Expired/ Required</h3>
                  </div>
                </Row>

              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Fire Alarm Test</th>
                    <td>14 Clients</td>

                  </tr>
                  <tr>
                    <th scope="row">Medication Review</th>
                    <td>54 Clients</td>

                  </tr>
                  <tr>
                    <th scope="row">Risk Assessment</th>
                    <td>43 Clients</td>

                  </tr>
                  <tr>
                    <th scope="row">Car Insuarance</th>
                    <td>31 Clients</td>

                  </tr>
                  <tr>
                    <th scope="row">Handover Checklist</th>
                    <td>10 Clients</td>
                  </tr>
                </tbody>
              </Table>

              <Row className="align-items-center pl-3">
                <div className="col mt-4">
                  <h3 className="mb-0" style={{ color: 'red' }}>0 Expiring within  1 Month</h3>
                </div>
              </Row>
              <div className="mt-3 pl-3 mb-3">
                <h4 className="mb-0" >All carer items</h4>
                <h4 className="mb-0" >All carer items</h4>

              </div>


            </Card>
            <Card className="shadow mt-3">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Weekly Stats</h3>
                  </div>

                </Row>
              

              </CardHeader>
             
              <div className="pl-3 mb-3">
                <h4 className="mb-1" >Required Hours: 1435h.35m</h4>
                <h4 className="mb-1" >Booked Hours: 543h.32m</h4>
                <h4 className="mb-1" >Carers working this week: 7</h4>
                <h4 className="mb-1" >Number of active carers: 23</h4>
                <h4 className="mb-2" >Number of active carers: 23</h4>
                <h4 className="mb-1" style={{ color: 'blue' }} >View All</h4>





              </div>


            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Unassigned Appoiments</h3>
                  </div>

                </Row>
              </CardHeader>
              <Row className="align-items-center pl-4 pr-4">
                <div className="col">
                  <h4 className="mb-0" style={{ color: 'blue' }}>Choose unassigned appointments for</h4>
                </div>
                <div className="col text-right">
                  <Search
                    placeholder="10:20 - 11:30"
                    enterButton="Go"
                    size="large"
                    suffix={suffix}
                    onSearch={onSearch}
                  />
                </div>
              </Row>


              <HomeTable />
            </Card>
          </Col>
          <Col xl="2">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Training</h3>
                  </div>

                </Row>
                <Row className="align-items-center">
                  <div className="col mt-4">
                    <h3 className="mb-0" style={{ color: 'red' }}>3 Expired/ Required</h3>
                  </div>
                </Row>

              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Manual Handing</th>
                    <td>14 Users</td>

                  </tr>
                  <tr>
                    <th scope="row">Medication Administration</th>
                    <td>54 Users</td>

                  </tr>
                  <tr>
                    <th scope="row">Risk Assessment</th>
                    <td>43 Clients</td>

                  </tr>
                  
                </tbody>
              </Table>

              <Row className="align-items-center pl-3">
                <div className="col mt-4">
                  <h3 className="mb-0" style={{ color: 'red' }}>0 Expiring within  1 Month</h3>
                </div>
              </Row>
              <div className="mt-3 pl-3 pr-3">
                <h4 className="mb-2" style={{ color: 'blue' }}>View All
                </h4>
                <PrimaryButton title="View all planned training"  />
                <div className="mb-2"></div>
                <PrimaryButton title="Confirm & confirmed training sessions" />
                <div className="mb-2"></div>





              </div>



            </Card>


            <Card className="shadow mt-3">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Birthdays in next 10 days</h3>
                  </div>

                </Row>
              

              </CardHeader>
            

              <div className=" pl-3 pr-3 ">
              <h3 className="mb-0" style={{ color: 'black' }}>Client birthdays</h3>

                <h4 className="mb-2" >There are no upcoming client birthdays
                </h4>
               




              </div>

              <div className=" pl-3 pr-3 ">
              <h3 className="mb-0" style={{ color: 'black' }}>Carers birthdays</h3>

                <h4 className="mb-2" >Peter Mukumbu :     13/09/2029
                </h4>
               




              </div>



            </Card>





          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyDashboard;
