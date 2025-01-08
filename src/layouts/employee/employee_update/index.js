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

// EmployeeUpdateDrawer component
const EmployeeUpdateDrawer = ({ open, onClose }) => (
    <Drawer
        title="Create a new employee"
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
                <Col span={12}>
                    <Form.Item
                        name="Role"
                        label="Role"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose the Role',
                            },
                        ]}
                    >
                        <Select placeholder="Please choose the Role">
                            <Option value="jack">Doctor</Option>
                            <Option value="tom">Nurse</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="Insuarance"
                        label="Insuarance"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Insuarance',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Insuarance" />
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

export default EmployeeUpdateDrawer;