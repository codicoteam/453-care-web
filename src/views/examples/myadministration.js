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


const MyAdmin = () => {
    return (
        <>
            <Container className="mt--7" fluid>

                <Row className="mt-5">
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h2 className="mb-0">General</h2>
                                    </div>

                                </Row>


                            </CardHeader>

                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Users</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Create admin users ,set roles and permission</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Regions</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Create regions to organise carers and clients into groups</h4>

                                </div>

                            </div>

                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Company Details</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Change your logo, address and phone number</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Mobile app</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Config settings for the career mobile app</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Finance</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Config invoice , timesheets , 3rd part integrations , default charges and more</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>eMAR</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Configure medication instruments , responses , routes ,outcome settings and time period for adminstration</h4>

                                </div>

                            </div>








                        </Card>

                    </Col>
                    <Col xl="4">
                    <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h2 className="mb-0">Carers</h2>
                                    </div>

                                </Row>


                            </CardHeader>

                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Job Titles</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Config job titles for grouping or paying carers</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Trainings</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Configure trainings types and settings and who needs each type of training and how often</h4>

                                </div>

                            </div>

                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Time off</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Add, remove or edit time off for carers</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Checklist</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Setup and edit your carer checklist</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Carer Status</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Add or edit your carer status</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Holiday</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Setup and manage carer holiday allowance</h4>

                                </div>

                            </div>
                        </Card>
                        <Card className="shadow mt-3">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h2 className="mb-0">Clients</h2>
                                    </div>

                                </Row>


                            </CardHeader>

                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Job Titles</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Config job titles for grouping or paying carers</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Trainings</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Configure trainings types and settings and who needs each type of training and how often</h4>

                                </div>

                            </div>

                           
                        </Card>

                    </Col>
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h2 className="mb-0">Audit Trails</h2>
                                    </div>

                                </Row>


                            </CardHeader>

                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Text messages</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Send text messages and view all sent and received text messages</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Activity log </h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >View all user activity across the application</h4>

                                </div>

                            </div>

                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Emails</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Send emails and view all sent emails</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Sessions</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >A history of user sessions and login attempts</h4>

                                </div>

                            </div>
                            
                        </Card>
                        <Card className="shadow mt-3">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h2 className="mb-0">Appointments</h2>
                                    </div>

                                </Row>


                            </CardHeader>

                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Care required</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Add or remove care required </h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Prevent and warn </h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >View all user activity across the application</h4>

                                </div>

                            </div>

                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Emails</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >Send emails and view all sent emails</h4>

                                </div>

                            </div>
                            <div className="mb-2">
                                <Row className="align-items-center pl-3">
                                    <div className="col ">
                                        <h3 className="mb-0" style={{ color: 'blue' }}>Sessions</h3>
                                    </div>
                                </Row>
                                <div className="mt-1 pl-3 mb-3">
                                    <h4 className="mb-0" >A history of user sessions and login attempts</h4>

                                </div>

                            </div>
                            
                        </Card>

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MyAdmin;
