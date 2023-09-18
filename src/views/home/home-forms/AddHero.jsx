import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from 'src/App';
import RtCard from 'src/components/Ui/Card';
import HomePageForm from 'src/forms/HomePageForm';

const heroInputFields = [
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
    id: 'heroImageFileUpload',
    name: 'photoURL',
    type: 'file',
    label: 'Hero Image',
    required: true,
    message: 'Image is required',
  },
];

const AddHero = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/home/banner/${id}`,{
          headers: {
            Authorization: `${loggedInUser?.token}`,
          },
        })
        .then((res) => setData(res?.data))
        .catch((err) => console.log(err));
    }
  }, [id,loggedInUser]);

  const handleAddHero = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('photoURL', data.photoURL[0]);

    if (id) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/home/banner/${id}`, formData,{
          headers: {
            Authorization: `${loggedInUser?.token}`,
          },
        })
        .then((res) =>{
          toast.success('Hero added successfully!')
          navigate('/home')
        } )
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/home/banner`, formData,{
          headers: {
            Authorization: `${loggedInUser?.token}`,
          },
        })
        .then((res) => {
          toast.success('Hero added successfully!')
          navigate('/home')
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <RtCard title={`${id ? 'Edit' : 'Add'} Hero`}>
      <HomePageForm data={data} formInputFields={heroInputFields} onSubmit={handleAddHero} />
    </RtCard>
  );
};

export default AddHero;
