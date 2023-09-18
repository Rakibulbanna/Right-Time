import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';
import HomePageForm from 'src/forms/HomePageForm';

const associationInputFields = [
  {
    col: 12,
    id: 'associationImageFileUpload',
    name: 'photoURL',
    type: 'file',
    label: 'Image',
    required: true,
    message: 'Image is required',
  },
];

const AddAssociation = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/home/association/${id}`)
        .then((res) => setData(res?.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAddAssociation = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('photoURL', data.photoURL[0]);

    if (id) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/home/association/${id}`, formData)
        .then((res) => {
          toast.success('Association added successfully!')
          navigate('/home')
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/home/association`, formData)
        .then((res) => {
          toast.success('Association added successfully!')
          navigate('/home')
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <RtCard title={`${id ? 'Edit' : 'Add'} Association`}>
      <HomePageForm
        data={data}
        formInputFields={associationInputFields}
        onSubmit={handleAddAssociation}
      />
    </RtCard>
  );
};

export default AddAssociation;
