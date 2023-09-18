import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';
import HomePageForm from 'src/forms/HomePageForm';
import PartnerPageForm from 'src/forms/PartnerPageForm';

const serviceInputFields = [
  {
    col: 12,
    id: 'nameInput',
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter Name',
    required: true,
    message: 'Name is required',
  },
  {
    col: 12,
    id: 'coverPhotoUpload',
    name: 'coverPhoto',
    type: 'file',
    label: 'Cover Photo',
    placeholder: 'Attach cover photo',
    required: true,
    message: 'Cover photo is required',
  },
  {
    col: 12,
    id: 'titleInput',
    name: 'divTitle',
    type: 'text',
    label: 'Title',
    placeholder: 'Enter Title',
    required: true,
    message: 'Title is required',
  },
  // {
  //   col: 12,
  //   id: 'descriptionInput',
  //   name: 'divDescription',
  //   type: 'text',
  //   label: 'Description',
  //   placeholder: 'Enter Description',
  //   required: true,
  //   message: 'Description is required',
  // },
];

const AddConsultaionService = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/services/consultation/${id}`)
        .then((res) => setData(res?.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAddService = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('name', data?.name)
    formData.append('coverPhoto', data?.coverPhoto[0])
    formData.append('divTitle', data?.divTitle)
    formData.append('divDescription', data?.divDescription)

    if(id) {
      axios
      .put(`${process.env.REACT_APP_API_URL}/services/consultation/${id}`, formData)
      .then((res) => {
        toast.success('Consultation service updated successfully!')
        navigate('/services')
      })
      .catch((error) =>{
        console.log(error)
        toast.error('Error!')
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/services/addConsultation/`, formData)
        .then((res) => {
          toast.success('Consultation service added successfully!')
          navigate('/services')
        })
        .catch((error) =>{
          console.log(error)
          toast.error('Error!')
        });
    }
  };

  return (
    <RtCard title={`${id ? 'Edit' : 'Add'} Consultaion Service`}>
      <PartnerPageForm
        form='training'
        data={data}
        formInputFields={serviceInputFields}
        onSubmit={handleAddService}
      />
    </RtCard>
  );
};

export default AddConsultaionService;
