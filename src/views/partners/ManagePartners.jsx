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
    key: 'url',
    label: 'Url',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'actions',
    _props: { scope: 'col', color: 'light' },
  },
];

const ManagePartners = () => {
  const [servicePartners, setServicePartners] = useState([]);
  const [solutionPartners, setSolutionPartners] = useState([]);
  const [associations, setAssociations] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/partners/service`)
      .then((res) => setServicePartners(res.data))
      .catch((err) => console.log(err));
 
    axios
      .get(`${process.env.REACT_APP_API_URL}/partners/solution`)
      .then((res) => setSolutionPartners(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_API_URL}/partners/association`)
      .then((res) => setAssociations(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteAssociationPartner = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/partners/association/${id}`)
    .then(res => {
      toast.success("Association Partner deleted!")
      axios
      .get(`${process.env.REACT_APP_API_URL}/partners/association`)
      .then((res) => setAssociations(res.data))
      .catch((err) => console.log(err));
    })
    .catch(err => toast.error("error!"))
  };
  const handleDeleteServicePartner = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/partners/service/${id}`)
    .then(res => {
      toast.success("Service Partner deleted!")
      axios
      .get(`${process.env.REACT_APP_API_URL}/partners/service`)
      .then((res) => setServicePartners(res.data))
      .catch((err) => console.log(err));
    })
    .catch(err => toast.error("error!"))
  };
  const handleDeleteSolutionPartner = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/partners/solution/${id}`)
    .then(res => {
      toast.success("Solution Partner deleted!")
      axios
      .get(`${process.env.REACT_APP_API_URL}/partners/solution`)
      .then((res) => setSolutionPartners(res.data))
      .catch((err) => console.log(err));
    })
    .catch(err => toast.error("error!"))
  };


  const servicePartnerTableItems = servicePartners?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      url: item?.url,
      actions: (
        <>
          <Link to={`/partner/service/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteServicePartner(item?._id)}
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
  const solutionPartnerTableItems = solutionPartners?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      url: item?.url,
      actions: (
        <>
          <Link to={`/partner/solution/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteSolutionPartner(item?._id)}
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
  const associationPartnerTableItems = associations?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      url: item?.url,
      actions: (
        <>
          <Link to={`/partner/association/edit/${item?._id}`}>
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
      <RtCard title={'Service Partner'} actionRoute={'/partner/service/add'}>
        <CTable
          columns={partnerTableColumns}
          items={servicePartnerTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>

      <RtCard title={'Solution Partner'} actionRoute={'/partner/solution/add'}>
        <CTable
          columns={partnerTableColumns}
          items={solutionPartnerTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>

      <RtCard title={'Association'} actionRoute={'/partner/association/add'}>
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

export default ManagePartners;
