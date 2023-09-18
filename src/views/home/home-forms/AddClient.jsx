import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';
import HomePageForm from 'src/forms/HomePageForm';

const clientInputFields = [
  {
    col: 12,
    id: 'imageFileUpload',
    name: 'photoURL',
    type: 'file',
    label: 'Image',
    required: true,
    message: 'Image is required',
  },
];

const AddClient = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/home/clientCarousel/${id}`)
        .then((res) => setData(res?.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAddClient = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('photoURL', data.photoURL[0]);

    if (id) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/home/clientCarousel/${id}`, formData)
        .then((res) => {
          toast.success('Client added successfully!')
          navigate('/home')
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/home/clientCarousel`, formData)
        .then((res) => {
          toast.success('Client added successfully!')
          navigate('/home')
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <RtCard title={`${id ? 'Edit' : 'Add'} Client`}>
      <HomePageForm data={data} formInputFields={clientInputFields} onSubmit={handleAddClient} />
    </RtCard>
  );
};

export default AddClient;
