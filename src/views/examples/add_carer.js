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
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
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

import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    InputNumber,
    Radio,
    Rate,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const AddMyCarer = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <>

            <Container className="mt--7" fluid>


                <Row className="mt-5">
                    <Col xl="2">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h2 className="mb-0">Last viewed</h2>
                                    </div>

                                </Row>
                                <Row className="align-items-center">
                                    <div className="col mt-4">
                                        <h3 className="mb-0" style={{ color: 'grey' }}>No user view recorded</h3>
                                    </div>
                                </Row>

                            </CardHeader>

                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">
                                            <div className="row bg-blue align-items-center p-3 ">
                                                <div className="mb-2" >
                                                    <Input placeholder="Search Carers" />

                                                </div>
                                                <div>
                                                    <Input placeholder="Active" />

                                                </div>

                                            </div>



                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-violet">
                                    <tr>
                                        <th scope="row">Brian Biilon</th>

                                    </tr>
                                    <tr>
                                        <th scope="row">John Doe</th>

                                    </tr>
                                    <tr>
                                        <th scope="row">William Tag</th>

                                    </tr>
                                    <tr>
                                        <th scope="row">Fibre Chris</th>

                                    </tr>
                                    <tr>
                                        <th scope="row">Nike Drillk</th>
                                    </tr>
                                </tbody>
                            </Table>




                        </Card>

                    </Col>
                    <Col className="mb-5 mb-xl-0" xl="10">
                        <Card >
                            <Row className="align-items-center">
                                <div className="col flex justify-start items-start ml-0">
                                    <Form
                                        onFinish={onFinish}
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 14 }}
                                        layout="horizontal"
                                        style={{ maxWidth: 600 }}
                                    >
                                        <Form.Item label="Status" name="select">
                                            <Select>
                                                <Select.Option value="demo">Demo</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="Title" name="treeSelect">
                                            <TreeSelect
                                                treeData={[
                                                    {
                                                        title: 'Light',
                                                        value: 'light',
                                                        children: [{ title: 'Bamboo', value: 'bamboo' }],
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Gender" name="cascader">
                                            <Cascader
                                                options={[
                                                    {
                                                        value: 'zhejiang',
                                                        label: 'Zhejiang',
                                                        children: [{ value: 'hangzhou', label: 'Hangzhou' }],
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Fullname" name="input">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Date of Birth" name="datePicker">
                                            <DatePicker />
                                        </Form.Item>
                                        <Form.Item label="Email" name="input">
                                            <Input />
                                        </Form.Item>
                                        <Button color="success" variant="dashed" >
                                            Add another email
                                        </Button>
                                        <Form.Item label="Handline" name="input">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Mobile" name="input">
                                            <Input />
                                        </Form.Item>

                                        <Form.Item label="Address" name="textArea">
                                            <TextArea rows={4} />
                                        </Form.Item>
                                        <Form.Item label="Post code" name="input">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Region / Branch">
                                            <Radio.Group>
                                                <Radio value="apple"> Brigde water </Radio>
                                                <Radio value="pear"> Live-in </Radio>
                                                <Radio value="pear"> Supported Living </Radio>


                                            </Radio.Group>
                                        </Form.Item>




                                        <Button color="success" variant="dashed" >
                                            Pinpoint address on map
                                        </Button>

                                        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                                            <Button type="primary" htmlType="submit">
                                                Save
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>

                                <div className="col text-right">
                                    <div className="absolute inset-0 bg-gray-300">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            marginHeight="0"
                                            marginWidth="0"
                                            title="map"
                                            scrolling="no"
                                            src="https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
                                            style={{
                                                filter: 'grayscale(1) contrast(1.2) opacity(0.4)',
                                            }}
                                        ></iframe>
                                    </div>

                                </div>
                            </Row>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

export default AddMyCarer;
