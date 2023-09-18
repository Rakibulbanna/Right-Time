import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CTable } from '@coreui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';

const careerTableColumns = [
  {
    key: 'id',
    label: 'Sl. No.',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'title',
    label: 'title',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'actions',
    _props: { scope: 'col', color: 'light' },
  },
];

const Careers = () => {
  const [careers, setCareers] = useState([]);

  const careerTableItems = careers?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.title,
      actions: (
        <>
          <Link to={`/career/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteCareer(item?._id)}
          >
            <CIcon icon={cilTrash} className="nav-icon" />
          </CButton>
        </>
      ),
      _cellProps: {
        _cellProps: { id: { scope: 'row' } },
      },
    };
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/career/`)
      .then((res) => {
        setCareers(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteCareer = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/career/${id}`)
    .then((res) => {
      toast.success('career deleted successfully!');
      axios
      .get(`${process.env.REACT_APP_API_URL}/career/`)
      .then((res) => {
        setCareers(res?.data);
      })
      .catch((err) => console.log(err));
    })
    .catch((err) => toast.error('Error!'));
  };

  return (
    <>
      <RtCard title={'Careers'} actionRoute={'/career/add'}>
        <CTable
          columns={careerTableColumns}
          items={careerTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>
    </>
  );
};

export default Careers;
