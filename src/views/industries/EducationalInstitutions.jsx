import axios from 'axios';
import { useEffect, useState } from 'react';
import RtCard from 'src/components/Ui/Card';
import IndustriesPageForm from 'src/forms/IndustriesPageForm';

const EducationalInstitutions = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/industries/`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateEducationalInstitutions = (data) => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('div', data.div);
    formData.append('coverPhoto', data.coverPhoto[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/industries/`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <RtCard title={'Educational Institutions'}>
        <IndustriesPageForm onSubmit={handleUpdateEducationalInstitutions} />
      </RtCard>
    </>
  );
};

export default EducationalInstitutions;
