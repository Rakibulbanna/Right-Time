import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';
import HomePageForm from 'src/forms/HomePageForm';

const serviceInputFields = [
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
    id: 'subtitleInput',
    name: 'subtitle',
    type: 'text',
    label: 'Subtitle',
    placeholder: 'Enter subtitle',
    required: true,
    message: 'Subtitle is required',
  },
  {
    col: 12,
    id: 'serviceImageFileUpload',
    name: 'photoURL',
    type: 'file',
    label: 'Service Image',
    required: true,
    message: 'Image is required',
  },
];

const AddService = () => {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    if (id) {
      console.log(id)
      axios
        .get(`${process.env.REACT_APP_API_URL}/home/service/${id}`)
        .then((res) => setData(res?.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAddService = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('photoURL', data.photoURL[0]);

    if (id){
      axios
      .put(`${process.env.REACT_APP_API_URL}/home/service/${id}`, formData)
      .then((res) => {
        toast.success('service updated successfully!')
        navigate('/home')

      })
      .catch((error) => console.log(error));
    }
    else{
     axios
      .post(`${process.env.REACT_APP_API_URL}/home/service`, formData)
      .then((res) => {
        toast.success('Service added successfully!')
        navigate('/home')
      })
      .catch((error) => console.log(error)); 
    }
    
  };

  return (
    <RtCard title={`${id ? 'Edit' : 'Add'} Service`}>
      <HomePageForm 
      data={data} 
      formInputFields={serviceInputFields} 
      onSubmit={handleAddService} 
      />
    </RtCard>
  );
};

export default AddService;
