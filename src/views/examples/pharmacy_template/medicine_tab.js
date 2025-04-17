import CustomNoData from "components/nodata/no_data";
import CustomSkeleton from "components/skeletons/custom_skeleton";
import React, { useEffect, useState } from "react";
import MedicineService from "services/pharmacy_medicine_service/medicine_service";
import {
  IoIosAdd,
  IoMdArrowRoundBack,
  IoMdCart,
  IoMdCreate,
  IoMdEye,
  IoMdTrash,
} from "react-icons/io";
import {
  Row,
  Button,
  Modal,
  Card,
  Tag,
  Tooltip,
  Divider,
  Space,
  Popconfirm,
} from "antd";
import { showMessage } from "helper/feedback_message_helper";
import { Form, Input, Select, InputNumber } from "antd";
import { supabase } from "helper/supabase/supabaseClient";
import { MedicineBoxOutlined } from "@ant-design/icons";
import { PictureOutlined } from "@ant-design/icons";
import { message } from "antd";

const MedicineTab = ({ pharmacyId }) => {
  // State variables
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error("Invalid file type. Please upload an image.");
      return;
    }

    const fileName = `medicines/${Date.now()}_${file.name}`;

    // Show loading state
    const loadingMessage = message.loading("Uploading image...", 0);

    try {
      // Upload image to the Supabase bucket
      const { data, error } = await supabase.storage
        .from("care_app")
        .upload(fileName, file);

      if (error) {
        message.error("Error uploading file: " + error.message);
        return;
      }

      // Get the public URL of the uploaded image
      const { data: publicData } = supabase.storage
        .from("care_app")
        .getPublicUrl(fileName);

      if (publicData) {
        console.log(publicData.publicUrl);
        setImageUrl(publicData.publicUrl);
        message.success("Image uploaded successfully!");
      }
    } catch (err) {
      message.error("Error uploading image: " + err.message);
    } finally {
      loadingMessage();
    }
  };

  // UI style constants
  const formContainerStyle = {
    padding: "1.5rem",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  };

  const headingStyle = {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "1.5rem",
    color: "#1f2937",
    borderBottom: "2px solid #10b981",
    paddingBottom: "0.5rem",
  };

  const buttonStyle = {
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  };

  // Load medicines on component mount or when pharmacyId changes
  useEffect(() => {
    const fetchMedicines = async () => {
      if (!pharmacyId) return;

      setLoading(true);
      setError("");

      try {
        const data = await MedicineService.getMedicinesByPharmacyId(pharmacyId);
        setMedicines(data || []);
      } catch (err) {
        setError(err.message || "Error fetching medicines");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [pharmacyId]);

  // Handle medicine submission (adding new medicine)
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Prepare medicine object with form values
      const medicineData = {
        name: values.name,
        description: values.description,
        purpose: values.purpose,
        price: parseFloat(values.price),
        regularPrice: values.regularPrice
          ? parseFloat(values.regularPrice)
          : undefined,
        pharmacy: pharmacyId,
        stock: parseInt(values.stock, 10),
        category: values.category,
        dosage: {
          infants: values.dosage?.infants || "Not recommended",
          children: values.dosage?.children,
          adults: values.dosage?.adults,
          elderly: values.dosage?.elderly,
        },
        frequency: values.frequency,
        status: values.status,
        requiresPrescription: values.requiresPrescription || false,
        images: imageUrl,
      };

      let response;

      // If editing, update existing medicine; otherwise create new one
      if (isEditing && selectedMedicine) {
        response = await MedicineService.updateMedicine(
          selectedMedicine.id,
          medicineData
        );
        setMedicines(
          medicines.map((med) =>
            med.id === selectedMedicine.id ? response.data : med
          )
        );
        showMessage("success", "Medicine updated successfully!");
      } else {
        response = await MedicineService.postMedicine(medicineData);
        setMedicines([...medicines, response.data]);
        showMessage("success", "Medicine added successfully!");
      }

      // Reset form and state
      setLoading(false);
      setShowForm(false);
      setIsEditing(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to save medicine:", error);
      showMessage("error", "Failed to save medicine. Please try again.");
      setLoading(false);
    }
  };

  // Open modal to view medicine details
  const handleViewMore = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalVisible(true);
  };

  // Close the detail modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMedicine(null);
  };

  // Start editing a medicine
  const handleEdit = (medicine) => {
    setSelectedMedicine(medicine);
    setIsEditing(true);

    // Populate form with medicine data
    form.setFieldsValue({
      name: medicine.name,
      description: medicine.description,
      purpose: medicine.purpose,
      price: medicine.price,
      regularPrice: medicine.regularPrice,
      stock: medicine.stock,
      category: medicine.category,
      frequency: medicine.frequency,
      status: medicine.status,
      requiresPrescription: medicine.requiresPrescription,
      // Set dosage fields if they exist
      ...(medicine.dosage && {
        "dosage.infants": medicine.dosage.infants,
        "dosage.children": medicine.dosage.children,
        "dosage.adults": medicine.dosage.adults,
        "dosage.elderly": medicine.dosage.elderly,
      }),
    });

    setShowForm(true);
  };

  // Handle adding medicine to cart
  const handleAddToCart = (medicine) => {
    // Implementation would depend on your cart functionality
    showMessage("success", `${medicine.name} added to cart!`);
  };

  // Handle medicine deletion
  const handleDelete = async (medicineId) => {
    try {
      await MedicineService.deleteMedicineById(medicineId);
      setMedicines(medicines.filter((med) => med.id !== medicineId));
      showMessage("success", "Medicine deleted successfully!");
    } catch (error) {
      showMessage("error", "Failed to delete medicine. Please try again.");
    }
  };

  // Toggle between form and list view
  const toggleForm = () => {
    if (showForm) {
      // Reset form and editing state when going back to list
      form.resetFields();
      setIsEditing(false);
    }
    setShowForm(!showForm);
  };

  // Get badge color based on medicine status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "green";
      case "low stock":
        return "orange";
      case "out of stock":
        return "red";
      case "pending":
        return "blue";
      case "taken":
        return "purple";
      default:
        return "default";
    }
  };

  return (
    <div>
      {/* Header with add/back button */}
      <Row className="flex justify-between items-center my-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {showForm
            ? isEditing
              ? "Edit Medicine"
              : "Add New Medicine"
            : "Medicines"}
        </h2>
        <Button
          type="primary"
          size="large"
          style={{
            ...buttonStyle,
            backgroundColor: showForm ? "#6b7280" : "#10b981",
            borderColor: showForm ? "#4b5563" : "#059669",
          }}
          onClick={toggleForm}
          icon={showForm ? <IoMdArrowRoundBack /> : <IoIosAdd />}
        >
          {showForm ? "Back to Medicines" : "Add Medicine"}
        </Button>
      </Row>

      {/* Form section */}
      {showForm ? (
        <div style={formContainerStyle}>
          <h4 style={headingStyle}>
            {isEditing ? "Update Medicine" : "Add New Medicine"}
          </h4>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              requiresPrescription: false,
              status: "Available",
            }}
          >
            {/* Basic Information */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h5 className="text-lg font-semibold mb-3 text-gray-700">
                Basic Information
              </h5>

              <Row gutter={16}>
                <div className="col-md-6">
                  <Form.Item
                    label="Medicine Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the medicine name",
                      },
                    ]}
                  >
                    <Input placeholder="Enter medicine name" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                      { required: true, message: "Please select a category" },
                    ]}
                  >
                    <Select placeholder="Select category">
                      <Select.Option value="Antibiotics">
                        Antibiotics
                      </Select.Option>
                      <Select.Option value="Supplements">
                        Supplements
                      </Select.Option>
                      <Select.Option value="Antidepressants">
                        Antidepressants
                      </Select.Option>
                      <Select.Option value="Antifungals">
                        Antifungals
                      </Select.Option>
                      <Select.Option value="Antivirals">
                        Antivirals
                      </Select.Option>
                      <Select.Option value="Hormones">Hormones</Select.Option>
                      <Select.Option value="Respiratory">
                        Respiratory
                      </Select.Option>
                      <Select.Option value="Other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h5 className="text-lg font-semibold mb-3 text-gray-700">
                    Medicine Image
                  </h5>
                  <div className="flex flex-col items-center">
                    {imageUrl ? (
                      <div className="mb-4">
                        <img
                          src={imageUrl}
                          alt="Medicine"
                          className="w-32 h-32 object-cover border border-gray-200 rounded-md shadow"
                        />
                      </div>
                    ) : (
                      <div className="mb-4 flex justify-center items-center w-32 h-32 bg-gray-100 border border-dashed border-gray-300 rounded-md">
                        <PictureOutlined
                          style={{ fontSize: "32px", color: "#d9d9d9" }}
                        />
                      </div>
                    )}

                    <label
                      htmlFor="medicine-image-upload"
                      className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Upload Image
                    </label>
                    <input
                      id="medicine-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <p className="text-xs text-gray-500 mt-2">
                      Recommended: Square image, 500x500px or larger
                    </p>
                  </div>
                </div>
              </Row>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter a description" },
                ]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Enter medicine description"
                />
              </Form.Item>

              <Form.Item
                label="Purpose"
                name="purpose"
                rules={[{ required: true, message: "Please select a purpose" }]}
              >
                <Select placeholder="Select purpose">
                  <Select.Option value="Pain Relief">Pain Relief</Select.Option>
                  <Select.Option value="Antibiotic">Antibiotic</Select.Option>
                  <Select.Option value="Allergy">Allergy</Select.Option>
                  <Select.Option value="Cold & Flu">Cold & Flu</Select.Option>
                  <Select.Option value="Vitamin Supplement">
                    Vitamin Supplement
                  </Select.Option>
                  <Select.Option value="Digestive Aid">
                    Digestive Aid
                  </Select.Option>
                  <Select.Option value="Cardiovascular">
                    Cardiovascular
                  </Select.Option>
                  <Select.Option value="Diabetes">Diabetes</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>
            </div>

            {/* Pricing and Stock */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h5 className="text-lg font-semibold mb-3 text-gray-700">
                Pricing and Stock
              </h5>
              <Row gutter={16}>
                <div className="col-md-4">
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      { required: true, message: "Please enter the price" },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      step={0.01}
                      style={{ width: "100%" }}
                      prefix="$"
                      placeholder="0.00"
                    />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item
                    label="Regular Price (if on sale)"
                    name="regularPrice"
                  >
                    <InputNumber
                      min={0}
                      step={0.01}
                      style={{ width: "100%" }}
                      prefix="$"
                      placeholder="0.00"
                    />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[
                      {
                        required: true,
                        message: "Please enter stock quantity",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      placeholder="0"
                    />
                  </Form.Item>
                </div>
              </Row>
            </div>

            {/* Dosage Information */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h5 className="text-lg font-semibold mb-3 text-gray-700">
                Dosage Information
              </h5>
              <Row gutter={16}>
                <div className="col-md-6">
                  <Form.Item
                    label="Adult Dosage"
                    name={["dosage", "adults"]}
                    rules={[
                      { required: true, message: "Please enter adult dosage" },
                    ]}
                  >
                    <Input placeholder="e.g., 1 tablet twice daily" />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    label="Children Dosage"
                    name={["dosage", "children"]}
                  >
                    <Input placeholder="e.g., 1/2 tablet twice daily" />
                  </Form.Item>
                </div>
              </Row>
              <Row gutter={16}>
                <div className="col-md-6">
                  <Form.Item label="Infant Dosage" name={["dosage", "infants"]}>
                    <Input placeholder="e.g., Not recommended" />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    label="Elderly Dosage"
                    name={["dosage", "elderly"]}
                  >
                    <Input placeholder="e.g., Same as adult dosage" />
                  </Form.Item>
                </div>
              </Row>
            </div>

            {/* Administration */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h5 className="text-lg font-semibold mb-3 text-gray-700">
                Administration
              </h5>
              <Row gutter={16}>
                <div className="col-md-6">
                  <Form.Item
                    label="Frequency"
                    name="frequency"
                    rules={[
                      { required: true, message: "Please select frequency" },
                    ]}
                  >
                    <Select placeholder="Select frequency">
                      <Select.Option value="Once A Day">
                        Once A Day
                      </Select.Option>
                      <Select.Option value="Twice A Day">
                        Twice A Day
                      </Select.Option>
                      <Select.Option value="Three Times A Day">
                        Three Times A Day
                      </Select.Option>
                      <Select.Option value="Four Times A Day">
                        Four Times A Day
                      </Select.Option>
                      <Select.Option value="As Needed">As Needed</Select.Option>
                      <Select.Option value="Weekly">Weekly</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                      { required: true, message: "Please select status" },
                    ]}
                  >
                    <Select placeholder="Select status">
                      <Select.Option value="Available">Available</Select.Option>
                      <Select.Option value="Low Stock">Low Stock</Select.Option>
                      <Select.Option value="Out of Stock">
                        Out of Stock
                      </Select.Option>
                      <Select.Option value="Pending">Pending</Select.Option>
                      <Select.Option value="Taken">Taken</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </Row>
              <Form.Item name="requiresPrescription" valuePropName="checked">
                <Select placeholder="Requires prescription?">
                  <Select.Option value={true}>Yes</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                style={{
                  backgroundColor: "#10b981",
                  borderColor: "#059669",
                  width: "150px",
                  height: "40px",
                  ...buttonStyle,
                }}
              >
                {isEditing ? "Update Medicine" : "Add Medicine"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : loading ? (
        // Show skeleton loader while loading
        <CustomSkeleton height="300px" width="100%" />
      ) : error ? (
        // Show error message if there's an error
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <p>{error}</p>
        </div>
      ) : medicines && medicines.length > 0 ? (
        // Display medicine cards in a grid layout
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines.map(
            (medicine) =>
              medicine && (
                <Card
                  key={medicine.id || `medicine-${Math.random()}`}
                  className="hover:shadow-lg transition-shadow duration-300"
                  bordered={true}
                  style={{ borderRadius: "0.75rem", overflow: "hidden" }}
                >
                  {/* Add the image section at the top of the card */}
                  <div className="mb-3">
                    {medicine?.imageUrl ? (
                      <img
                        src={medicine.imageUrl}
                        alt={medicine?.name || "Medicine"}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full h-40 bg-gray-100 rounded-md">
                        <MedicineBoxOutlined
                          style={{ fontSize: "40px", color: "#d9d9d9" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Medicine Card Header with status tag */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {medicine?.name || "Unnamed Medicine"}
                    </h3>
                    <Tag color={getStatusColor(medicine?.status)}>
                      {medicine?.status || "N/A"}
                    </Tag>
                  </div>

                  {/* Medicine Card Body */}
                  <div className="text-gray-600 mb-4">
                    <p className="line-clamp-2">
                      {medicine?.description || "No description available."}
                    </p>
                  </div>

                  {/* Medicine Price and Stock */}
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-lg font-bold text-green-600">
                        ${medicine?.price?.toFixed(2) || "0.00"}
                      </span>
                      {medicine?.regularPrice && (
                        <span className="ml-2 text-sm line-through text-gray-500">
                          ${medicine.regularPrice?.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Stock: {medicine?.stock ?? 0}
                    </div>
                  </div>

                  {/* Medicine Card Footer with Action Buttons */}
                  <Divider style={{ margin: "12px 0" }} />
                  <div className="flex justify-between">
                    <Tooltip title="View Details">
                      <Button
                        type="default"
                        icon={<IoMdEye />}
                        onClick={() => medicine && handleViewMore(medicine)}
                        style={{
                          ...buttonStyle,
                          color: "#3b82f6",
                          borderColor: "#3b82f6",
                        }}
                      >
                        View
                      </Button>
                    </Tooltip>

                    <Button
                      type="primary"
                      icon={<IoMdCart />}
                      onClick={() => medicine && handleAddToCart(medicine)}
                      style={{
                        ...buttonStyle,
                        backgroundColor: "#10b981",
                        borderColor: "#059669",
                      }}
                    >
                      Add to Cart
                    </Button>

                    <Space>
                      <Tooltip title="Edit Medicine">
                        <Button
                          type="default"
                          icon={<IoMdCreate />}
                          onClick={() => medicine && handleEdit(medicine)}
                          style={{
                            ...buttonStyle,
                            color: "#f59e0b",
                            borderColor: "#f59e0b",
                          }}
                        >
                          Edit
                        </Button>
                      </Tooltip>

                      <Tooltip title="Delete Medicine">
                        <Popconfirm
                          title="Are you sure you want to delete this medicine?"
                          onConfirm={() =>
                            medicine?.id && handleDelete(medicine.id)
                          }
                          okText="Yes"
                          cancelText="No"
                          placement="topRight"
                        >
                          <Button
                            type="default"
                            danger
                            icon={<IoMdTrash />}
                            style={buttonStyle}
                          >
                            Delete
                          </Button>
                        </Popconfirm>
                      </Tooltip>
                    </Space>
                  </div>
                </Card>
              )
          )}
        </div>
      ) : (
        // Show no data component when no medicines are available
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow border border-gray-200">
          <CustomNoData width="100px" height="100px" />
          <p className="mt-4 text-gray-600">
            No medicines found. Click "Add Medicine" to add one.
          </p>
        </div>
      )}

      {/* Medicine Detail Modal */}
      <Modal
        title={
          <span className="text-xl font-semibold">
            {selectedMedicine?.name || "Medicine Details"}
          </span>
        }
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button
            key="cart"
            type="primary"
            onClick={() => {
              selectedMedicine && handleAddToCart(selectedMedicine);
              handleCloseModal();
            }}
            icon={<IoMdCart />}
            style={{ backgroundColor: "#10b981", borderColor: "#059669" }}
          >
            Add to Cart
          </Button>,
          <Button
            key="edit"
            onClick={() => {
              selectedMedicine && handleEdit(selectedMedicine);
              handleCloseModal();
            }}
            icon={<IoMdCreate />}
            style={{ color: "#f59e0b", borderColor: "#f59e0b" }}
          >
            Edit
          </Button>,
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedMedicine && (
          <div className="p-2">
            {/* Add image display at the top */}
            <div className="flex justify-center mb-4">
              {selectedMedicine.imageUrl ? (
                <img
                  src={selectedMedicine.imageUrl}
                  alt={selectedMedicine.name || "Medicine"}
                  className="w-64 h-64 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="flex justify-center items-center w-64 h-64 bg-gray-100 rounded-lg shadow-md">
                  <MedicineBoxOutlined
                    style={{ fontSize: "64px", color: "#d9d9d9" }}
                  />
                </div>
              )}
            </div>
            {/* Medicine Overview Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Overview</h3>
                <Tag color={getStatusColor(selectedMedicine.status)}>
                  {selectedMedicine.status || "N/A"}
                </Tag>
              </div>
              <p className="text-gray-700">
                {selectedMedicine.description || "No description available."}
              </p>

              {selectedMedicine.purpose && (
                <div className="mt-3">
                  <span className="font-semibold">Purpose: </span>
                  <span>{selectedMedicine.purpose}</span>
                </div>
              )}
            </div>

            <Divider />

            {/* Pricing and Stock */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                <p>
                  <span className="font-medium">Current Price: </span>
                  <span className="text-green-600 font-semibold">
                    ${selectedMedicine.price?.toFixed(2) || "0.00"}
                  </span>

                  {selectedMedicine.regularPrice && (
                    <span className="ml-2 text-sm line-through text-gray-500">
                      ${selectedMedicine.regularPrice.toFixed(2)}
                    </span>
                  )}
                </p>

                {selectedMedicine.requiresPrescription && (
                  <Tag color="volcano" className="mt-2">
                    Requires Prescription
                  </Tag>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Inventory</h3>
                <p>
                  <span className="font-medium">Stock: </span>
                  <span>{selectedMedicine.stock || 0} units</span>
                </p>
                <p>
                  <span className="font-medium">Category: </span>
                  <span>{selectedMedicine.category || "Uncategorized"}</span>
                </p>
              </div>
            </div>

            <Divider />

            {/* Dosage Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Dosage Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedMedicine.dosage?.adults && (
                  <div>
                    <p className="font-medium">Adults:</p>
                    <p className="text-gray-700">
                      {selectedMedicine.dosage.adults}
                    </p>
                  </div>
                )}

                {selectedMedicine.dosage?.children && (
                  <div>
                    <p className="font-medium">Children:</p>
                    <p className="text-gray-700">
                      {selectedMedicine.dosage.children}
                    </p>
                  </div>
                )}

                {selectedMedicine.dosage?.infants && (
                  <div>
                    <p className="font-medium">Infants:</p>
                    <p className="text-gray-700">
                      {selectedMedicine.dosage.infants}
                    </p>
                  </div>
                )}

                {selectedMedicine.dosage?.elderly && (
                  <div>
                    <p className="font-medium">Elderly:</p>
                    <p className="text-gray-700">
                      {selectedMedicine.dosage.elderly}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Divider />

            {/* Administration Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Administration</h3>
              <p>
                <span className="font-medium">Frequency: </span>
                <span>{selectedMedicine.frequency || "Not specified"}</span>
              </p>
              {selectedMedicine.prescribedBy && (
                <p className="mt-2">
                  <span className="font-medium">Prescribed By: </span>
                  <span>{selectedMedicine.prescribedBy}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MedicineTab;
