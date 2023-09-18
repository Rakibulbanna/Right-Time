import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';
import IndustriesPageForm from 'src/forms/IndustriesPageForm';

const AddIndustry = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if(id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/industries/${id}`)
        .then((res) => {
          setData(res?.data)
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAddIndustry = (data) => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('div', data.div);
    formData.append('coverPhoto', data.coverPhoto[0]);

    if(id) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/industries/${id}`, formData)
        .then((res) => {
          toast.success("Industry updated successfully!")
          navigate('/industries')
        })
        .catch((err) => toast.error("Error!"));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/industries/`, formData)
        .then((res) => {
          toast.success("Industry added successfully!")
          navigate('/industries')
        })
        .catch((err) => toast.error("Error!"));

    }
  };

  return (
    <>
      <RtCard title={`${id ? 'Edit' : 'Add'} Industry`}>
        <IndustriesPageForm data={data} onSubmit={handleAddIndustry} />
      </RtCard>
    </>
  );
};

export default AddIndustry;
