import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import { FaEdit } from 'react-icons/fa';
import CarerService from 'services/carer_services/carer_service';
import { showMessage } from 'helper/feedback_message_helper';
import CustomSpin from 'components/customised_spins/customised_sprin';

const EditEmployeeModal = ({ selectedCarer, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    form.setFieldsValue({
      firstName: selectedCarer.firstName,
      lastName: selectedCarer.lastName,
      email: selectedCarer.email,
      contactNumber: selectedCarer.contactNumber,
      address: selectedCarer.address,
      specialization: selectedCarer.specialization,
      employmentType: selectedCarer.employmentType,
      carDetails: selectedCarer.carDetails,
      insuranceDetails: selectedCarer.insuranceDetails,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log('carer selected id ', selectedCarer._id);
  

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      // Call the update service
      const updatedData = {
        ...selectedCarer,
        ...values,
      };
      await CarerService.updateCarerById(selectedCarer._id, updatedData);
  
      showMessage('success', 'Carer updated successfully!');
      setLoading(false);
      setOpen(false);
  
      // Fetch updated data
      const carers = await CarerService.getAllCarers();
      onUpdate(carers); // Update the parent state with new data
    } catch (error) {
      showMessage('error', 'Failed to update carer. Please try again.');
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="col text-right" onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <FaEdit />
      </div>
      <Modal
        title="Edit Carer"
        centered
        open={open}
        onCancel={handleClose}
        footer={null}
        width={800}
      >
        {loading ? (
          <CustomSpin />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter the first name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter the last name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter the email' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="contactNumber"
              rules={[{ required: true, message: 'Please enter the contact number' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter the address' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Specialization"
              name="specialization"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Employment Type"
              name="employmentType"
              rules={[{ required: true, message: 'Please select the employment type' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Car Details"
              name="carDetails"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Insurance Details"
              name="insuranceDetails"
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: 'green', borderColor: 'green' }}
              >
                Update Carer
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default EditEmployeeModal;
