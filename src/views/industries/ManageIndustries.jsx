import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CTable } from '@coreui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';

const partnerTableColumns = [
  {
    key: 'id',
    label: 'Sl. No.',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'name',
    label: 'Name',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'actions',
    _props: { scope: 'col', color: 'light' },
  },
];

const ManageIndustries = () => {
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/industries`)
      .then((res) => setIndustries(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteAssociationPartner = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/industries/${id}`)
      .then((res) => {
        toast.success('Industry deleted successfully!');
        axios
          .get(`${process.env.REACT_APP_API_URL}/industries`)
          .then((res) => setIndustries(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error('Error!'));
  };

  const associationPartnerTableItems = industries?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      actions: (
        <>
          <Link to={`/industry/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteAssociationPartner(item?._id)}
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
  return (
    <>
      <RtCard title={'Industries'} actionRoute={'/industry/add'}>
        <CTable
          columns={partnerTableColumns}
          items={associationPartnerTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>
    </>
  );
};

export default ManageIndustries;
