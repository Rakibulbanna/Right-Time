import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';
import HomePageForm from 'src/forms/HomePageForm';

const feedbackInputFields = [
  {
    col: 12,
    id: 'titleInput',
    name: 'title',
    type: 'text',
    label: 'Title',
    placeholder: 'Enter title',
    required: true,
    message: 'Title is required',
  },
  {
    col: 12,
    id: 'designationInput',
    name: 'designation',
    type: 'text',
    label: 'Designation',
    placeholder: 'Enter designation',
    required: true,
    message: 'Designation is required',
  },
  {
    col: 12,
    id: 'descriptionInput',
    name: 'description',
    type: 'text',
    label: 'Description',
    placeholder: 'Enter description',
    required: true,
    message: 'Description is required',
  },
  {
    col: 12,
    id: 'clientImageFileUpload',
    name: 'photoURL',
    type: 'file',
    label: 'Client Image',
    required: false,
    message: 'Image is required',
  },
];

const AddClientFeedback = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/home/clientFeedback/${id}`)
        .then((res) => setData(res?.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAddFeedback = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('designation', data.designation);
    formData.append('description', data.description);
    formData.append('photoURL', data.photoURL[0]);

    if (id) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/home/clientFeedback/${id}`, formData)
        .then((res) => {
          toast.success("Client's feedback added successfully!")
          navigate('/home')
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/home/clientFeedback`, formData)
        .then((res) =>{
          toast.success("Client's added successfully!")
          navigate('/home')
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <RtCard title={`${id ? 'Edit' : 'Add'} Client Feedback`}>
      <HomePageForm
        data={data}
        formInputFields={feedbackInputFields}
        onSubmit={handleAddFeedback}
      />
    </RtCard>
  );
};

export default AddClientFeedback;
