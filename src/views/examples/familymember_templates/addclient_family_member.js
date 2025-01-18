import CustomSpin from 'components/customised_spins/customised_sprin';
import { showMessage } from 'helper/feedback_message_helper';
import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const AddFamilyMemberDialog = ({ isOpen, toggle, onAdd , selectedClient}) => {
    const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    relationshipToClient: '',
    email: '',
    profilePicture: '',
    contactNumber: '',
    clientId: selectedClient._id,
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    try {
      await onAdd(formData); // Pass the data to the parent handler
      showMessage('success', 'Family member added  successfully!');
      setLoading(false);
      toggle(); // Close the modal
    } catch (error) {
        showMessage('error', 'Failed to add family member. Please try again.');
        setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Family Member</ModalHeader>
      <ModalBody>
      {loading ? (
          <CustomSpin />
        ) : (
<Form>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="relationshipToClient">Relationship to Client</Label>
            <Input
              type="text"
              name="relationshipToClient"
              id="relationshipToClient"
              value={formData.relationshipToClient}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="profilePicture">Profile Picture</Label>
            <Input
              type="text"
              name="profilePicture"
              id="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="contactNumber">Contact Number</Label>
            <Input
              type="text"
              name="contactNumber"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </FormGroup>
         
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
        )}
        
      </ModalBody>
      <ModalFooter>
      <Button
  style={{
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
  }}
  onClick={handleSubmit}
>
  Add
</Button>

        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddFamilyMemberDialog;
