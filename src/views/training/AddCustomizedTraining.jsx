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

const AddCustomizedTraining = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/training/customized/${id}`)
        .then((res) => setData(res?.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAddCustomized = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('name', data?.name)
    formData.append('coverPhoto', data?.coverPhoto[0])
    formData.append('divTitle', data?.divTitle)
    formData.append('divDescription', data?.divDescription)

    if(id) {
        axios
        .put(`${process.env.REACT_APP_API_URL}/training/customized/${id}`, formData)
        .then((res) => {
          toast.success('Management updated successfully!')
          navigate('/training')
        })
        .catch((error) => console.log(error));
    } else {  
        axios
          .post(`${process.env.REACT_APP_API_URL}/training/addCustomized`, formData)
          .then((res) => {
            toast.success('Management added successfully!')
            navigate('/training')
          })
          .catch((error) => console.log(error));
    }
  };

  return (
    <RtCard title={`${id ? 'Edit' : 'Add'} Customized Training`}>
      <PartnerPageForm
      form='training'
        data={data}
        formInputFields={serviceInputFields}
        onSubmit={handleAddCustomized}
      />
    </RtCard>
  );
};

export default AddCustomizedTraining;
