import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';
import AboutPageForm from 'src/forms/AboutPageForm';

const teamMemberInputFields = [
  {
    col: 12,
    id: 'nameInput',
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter name',
    required: true,
    message: 'Name is required',
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
    id: 'imageFileUpload',
    name: 'imgUrl',
    type: 'file',
    label: 'Image',
    required: true,
    message: 'Image is required',
  },
];

const AddTeamMember = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/about/teamMember/${id}`)
        .then((res) =>{
          console.log(res.data)
          setData(res?.data)
        } )
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAddTeamMember = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('designation', data.designation);
    formData.append('imgUrl', data.imgUrl[0]);
console.log(formData.data)
    if (id) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/about/teamMember/${id}`, formData)
        .then((res) => {
          toast.success('Team member updated successfully!')
          navigate('/about')
        })
        .catch((error) => console.log(error));
    } else {
      
      axios
        .post(`${process.env.REACT_APP_API_URL}/about/teamMember`, formData)
        .then((res) => {
          toast.success('Team member added successfully!')
          navigate('/about')
        })
        .catch((error) =>{
          console.log(error)
          toast.error(error.response.data.message)
        });
    }
  };
  return (
    <RtCard title={`${id ? 'Edit' : 'Add'} Team Member`}>
      <AboutPageForm
        data={data}
        formInputFields={teamMemberInputFields}
        onSubmit={handleAddTeamMember}
      />
    </RtCard>
  );
};

export default AddTeamMember;
