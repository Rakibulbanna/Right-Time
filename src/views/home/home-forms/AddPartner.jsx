import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';
import HomePageForm from 'src/forms/HomePageForm';

const partnerInputFields = [
  {
    col: 12,
    id: 'partnerImageFileUpload',
    name: 'photoURL',
    type: 'file',
    label: 'Image',
    required: true,
    message: 'Image is required',
  },
];

const AddPartner = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/home/partnerCarousel/${id}`)
        .then((res) => setData(res?.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAddPartner = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('photoURL', data.photoURL[0]);

    if (id) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/home/partnerCarousel/${id}`, formData)
        .then((res) => {
          toast.success('Partner updated successfully!')
          navigate('/home')
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/home/partnerCarousel`, formData)
        .then((res) => {
          toast.success('Partner updated successfully!')
          navigate('/home')
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <RtCard title={`${id ? 'Edit' : 'Add'} Partner`}>
      <HomePageForm data={data} formInputFields={partnerInputFields} onSubmit={handleAddPartner} />
    </RtCard>
  );
};

export default AddPartner;
