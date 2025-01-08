import React from 'react';
import { Col, Divider, Drawer, Row } from 'antd';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
const { Option } = Select;

// DescriptionItem component
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

// ClientUpdateDrawer component
const ClientUpdateDrawer = ({ open, onClose }) => (
    <Drawer
        title="Create a new account"
        width={1090}
        onClose={onClose}
        open={open}
        styles={{
            body: {
                paddingBottom: 80,
            },
        }}
        extra={
            <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose} type="primary">
                    Submit
                </Button>
            </Space>
        }
    >
        <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter user name',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter user name" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter email',
                                type: 'email', // Validates that the input is a valid email address
                            },
                        ]}
                    >
                        <Input placeholder="Please enter email" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="url"
                        label="Url"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter url',
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                            addonBefore="http://"
                            addonAfter=".com"
                            placeholder="Please enter url"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="name"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter adress',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter address" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="owner"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select gender',
                            },
                        ]}
                    >
                        <Select placeholder="Please select genderr">
                            <Option value="xiao">Male</Option>
                            <Option value="mao">Female </Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="name"
                        label="Age"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter age',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter age" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="dateTime"
                        label="Birthday"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose the birthday',
                            },
                        ]}
                    >
                        <DatePicker.RangePicker
                            style={{
                                width: '100%',
                            }}
                            getPopupContainer={(trigger) => trigger.parentElement}
                        />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="name"
                        label="Next of Kin"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter next of kin',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter next of kin" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="city"
                        label="City"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter city',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter city" />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />


            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="Diagnosis Date"
                        label="Diagnosis Date"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose the  Diagnosis Date',
                            },
                        ]}
                    >
                        <DatePicker.RangePicker
                            style={{
                                width: '100%',
                            }}
                            getPopupContainer={(trigger) => trigger.parentElement}
                        />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="name"
                        label="Symptoms"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Symptoms',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Symptoms" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="Diagnosis"
                        label="Diagnosis"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Diagnosis',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Diagnosis" />
                    </Form.Item>
                </Col>
            </Row>


            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="dateTime"
                        label="Date of Report"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose the  date of report',
                            },
                        ]}
                    >
                        <DatePicker.RangePicker
                            style={{
                                width: '100%',
                            }}
                            getPopupContainer={(trigger) => trigger.parentElement}
                        />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="name"
                        label="Duration"
                        rules={[
                            {
                                required: true,
                                message: '2 Weeks',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter date of report" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="secerity"
                        label="Severity"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Severity',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Severity" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="Follow-Up Date"
                        label="Follow-Up Date"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose the  Follow-Up Date',
                            },
                        ]}
                    >
                        <DatePicker.RangePicker
                            style={{
                                width: '100%',
                            }}
                            getPopupContainer={(trigger) => trigger.parentElement}
                        />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="Past Medical History:"
                        label="Past Medical History:"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Past Medical History:',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Past Medical History:" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="Allergies"
                        label="Allergies"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Allergies',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Allergies" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="Diagnostic Tests"
                        label="Diagnostic Tests"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Diagnostic Tests',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Diagnostic Tests" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="Test Results"
                        label="Test Results"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Test Results',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Test Results" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="Treatment Plan"
                        label="Treatment Plan"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Treatment Plan',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Treatment Plan" />
                    </Form.Item>
                </Col>
            </Row>



            <Row gutter={16}>

                <Col span={12}>
                    <Form.Item
                        name="Expected Recovery Time"
                        label="Expected Recovery Time"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Expected Recovery Time',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Expected Recovery Time" />
                    </Form.Item>
                </Col>
                <Col span={12} className='ml-1'>
                    <Form.Item
                        name="Id Number"
                        label="ID Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Id Number',
                            },
                        ]}
                    >
                        <Input.OTP length={8} formatter={(str) => str.toUpperCase()} />
                    </Form.Item>
                </Col>


                

            </Row>
            <Divider />
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="Status"
                        label="Status"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose the Status',
                            },
                        ]}
                    >
                        <Select placeholder="Please choose the Status">
                            <Option value="jack">Pending</Option>
                            <Option value="tom">Completed</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="Budget"
                        label="Budget"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Expected Budget',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Expected Budget" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="Status"
                        label="Status"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose the Status',
                            },
                        ]}
                    >
                        <Select placeholder="Please choose the Status">
                            <Option value="jack">Pending</Option>
                            <Option value="tom">Completed</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="Completion"
                        label="Completion"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Completion',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Completion" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="Additional Notes"
                        label="Additional Notes"
                        rules={[
                            {
                                required: true,
                                message: 'please enter url Additional Notes',
                            },
                        ]}
                    >
                        <Input.TextArea rows={4} placeholder="please enter url Additional Notes" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Drawer>
);

export default ClientUpdateDrawer;