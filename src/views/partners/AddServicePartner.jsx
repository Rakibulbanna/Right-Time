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
    id: 'urlInput',
    name: 'url',
    type: 'url',
    label: 'Url',
    placeholder: 'Enter site url',
    required: true,
    message: 'Site url is required',
  },
];

const AddServicePartner = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/partners/service/${id}`)
        .then((res) => setData(res?.data))
        .catch((error) =>{
          console.log(error)
          toast.error('Error!')
        });
    }
  }, [id]);

  const handleAddService = (data) => {
    if(id){
      axios
      .put(`${process.env.REACT_APP_API_URL}/partners/service/${id}`, data)
      .then((res) => {
        toast.success('Service updated successfully!')
        navigate('/partners')
      })
      .catch((error) =>{
        console.log(error)
        toast.error('Error!')
      });
    }else{
      axios
      .post(`${process.env.REACT_APP_API_URL}/partners/addService`, data)
      .then((res) => {
        toast.success('Service added successfully!')
        navigate('/partners')
      })
      .catch((error) =>{
        console.log(error)
        toast.error('Error!')
      });
    }
  };

  return (
    <RtCard title={`${id ? 'Edit' : 'Add'} Service Partner`}>
      <PartnerPageForm
        data={data}
        formInputFields={serviceInputFields}
        onSubmit={handleAddService}
      />
    </RtCard>
  );
};

export default AddServicePartner;
