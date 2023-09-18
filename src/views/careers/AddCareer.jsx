import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';
import HomePageForm from 'src/forms/HomePageForm';
import PartnerPageForm from 'src/forms/PartnerPageForm';

const careerInputFields = [
  {
    col: 12,
    id: 'titleInput',
    name: 'title',
    type: 'text',
    label: 'Title',
    placeholder: 'Enter Title',
    required: true,
    message: 'Title is required',
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
  // {
  //   col: 12,
  //   id: 'descriptionInput',
  //   name: 'description',
  //   type: 'text',
  //   label: 'Description',
  //   placeholder: 'Enter Description',
  //   required: true,
  //   message: 'Description is required',
  // },
];

const AddCareer = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/career/${id}`)
        .then((res) => setData(res?.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAddCareer = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('title', data?.title)
    formData.append('coverPhoto', data?.coverPhoto[0])
    formData.append('description', data?.description)

    if(id) {
      axios
      .put(`${process.env.REACT_APP_API_URL}/career/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        toast.success('Career updated successfully!')
        navigate('/career')
      })
      .catch((error) => console.log(error));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/career/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          toast.success('Career added successfully!')
          navigate('/career')
        })
        .catch((error) => console.log(error));
    }
  };

  
  return (
    <RtCard title={`${id ? 'Edit' : 'Add'} Career`}>
      <PartnerPageForm
        data={data}
        form='career'
        formInputFields={careerInputFields}
        onSubmit={handleAddCareer}
      />
    </RtCard>
  );
};

export default AddCareer;
