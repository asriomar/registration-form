import React, { useState, useEffect } from 'react';
import {
  BsSearch,
  BsPlus,
  BsCheck,
  BsX,
  BsPencil,
  BsTrash,
} from 'react-icons/bs';

const initialFormData = {
  name: '',
  id: '',
  address: '',
  phone: '',
  email: '',
  profilePicture: '',
};

const initialSampleData = [
  {
    name: 'John Doe',
    id: '123456',
    address: '123 Main St, City, Country',
    phone: '+1234567890',
    email: 'johndoe@example.com',
    profilePicture: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jane Smith',
    id: '789012',
    address: '456 Elm St, Town, Country',
    phone: '+9876543210',
    email: 'janesmith@example.com',
    profilePicture: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jonas Scholl',
    id: '789012',
    address: '456 Elm St, Town, Country',
    phone: '+9876543210',
    email: 'jonas@example.com',
    profilePicture: 'https://via.placeholder.com/150',
  },
  {
    name: 'Adam Smith',
    id: '789012',
    address: '456 Elm St, Town, Country',
    phone: '+9876543210',
    email: 'adam@example.com',
    profilePicture: 'https://via.placeholder.com/150',
  },
];

const FormExample = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [dataList, setDataList] = useState(initialSampleData);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isIdValid, setIsIdValid] = useState(true); // New state to track ID validity
  const [isFormValid, setIsFormValid] = useState(false); // New state to track form validation
  const [formError, setFormError] = useState(''); // New state to store form error message

  useEffect(() => {
    // Check if the entered ID already exists
    if (!isEditing) {
      setIsIdValid(!dataList.some((item) => item.id === formData.id));
    }
  }, [formData.id, dataList, isEditing]);

  useEffect(() => {
    // Check if all required fields are filled
    const formValues = Object.values(formData);
    const isFormComplete = formValues.every((value) => value.trim() !== ''); // Check if all fields are not empty
    setIsFormValid(isFormComplete && isIdValid);

    // Update form error message
    if (!isFormComplete) {
      setFormError('Please complete all fields.');
    } else if (!isIdValid) {
      setFormError('ID already exists.');
    } else {
      setFormError('');
    }
  }, [formData, isIdValid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, profilePicture: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
      // Reset file name to null
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return; // Check if form is valid
    if (isEditing) {
      // Update existing data
      const updatedList = [...dataList];
      updatedList[editIndex] = formData;
      setDataList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new data
      setDataList([...dataList, formData]);
    }
    // Reset the form data and clear the file name
    setFormData({ ...initialFormData, profilePicture: '' });
  };

  const handleEdit = (index) => {
    setFormData(dataList[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = [...dataList];
    updatedList.splice(index, 1);
    setDataList(updatedList);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditIndex(null);
    setFormData(initialFormData);
  };

  const handleSearch = () => {
    // Filter dataList based on searchTerm
    const filteredData = initialSampleData.filter((data) => {
      return (
        data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.id.includes(searchTerm)
      );
    });
    setDataList(filteredData);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-screen p-8 font-mono  mx-auto ">
      <h1 className="mb-4 text-3xl font-bold text-center">Registration Form</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="id" className="block mb-1 font-semibold">
              ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className={`w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 ${
                isIdValid ? 'border-gray-300' : 'border-red-500'
              } focus:ring-blue-500`}
              required
            />
            {!isIdValid && (
              <p className="text-red-500 mt-1">ID already exists!</p>
            )}
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className="block mb-1 font-semibold">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 font-semibold">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="profilePicture"
              className="block mb-1 font-semibold"
            >
              Upload Picture Profile
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="profilePicture"
                onChange={handlePictureChange}
                className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.profilePicture && (
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="ml-4 w-20 h-20 object-cover rounded-md"
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          {isEditing ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isFormValid}
              >
                <BsCheck className="w-5 h-5" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <BsX className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isFormValid}
            >
              <BsPlus className="w-5 h-5" />
            </button>
          )}
        </div>
        {formError && (
          <div className="mt-2 text-red-500 text-center">{formError}</div>
        )}
      </form>

      <hr className="my-8" />
      <hr className="my-8" />

      <div className="mb-4 text-center my-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by Name or ID"
          className="w-1/3 py-2 px-4 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <BsSearch className="w-5 h-5" />
        </button>
      </div>

      <hr className="my-8" />
      <div className="grid grid-cols-3 gap-6">
        {dataList.map((data, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">{data.name}</h2>
                <p>{data.id}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <BsPencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <BsTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <p>
                <strong>Address:</strong> {data.address}
              </p>
              <p>
                <strong>Phone:</strong> {data.phone}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              {data.profilePicture && (
                <div className="mt-4">
                  <img
                    src={data.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormExample;
