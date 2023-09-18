import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CTable } from '@coreui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';
/*
 name:{
        type:String
    },
   
        coverPhoto:{
            type:String,
            require: true
        },
        divTitle:{
            type: String,
            require: true
        },
        divDescription:{
            type: String,
            require: true
        },

*/
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

const ManageSolutions = () => {
  const [securitySolutions, setSecuritySolutions] = useState([]);
  const [cyberSecuritySolutions, setCyberSecuritySolutions] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/solutions/security/`)
      .then((res) => setSecuritySolutions(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.REACT_APP_API_URL}/solutions/cyberSecurity/`)
      .then((res) => setCyberSecuritySolutions(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteCyberSecuritySolutions = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/solutions/cyberSecurity/${id}`)
      .then((res) => {
        toast.success('CyberSecurity Solution training deleted');
        axios
          .get(`${process.env.REACT_APP_API_URL}/solutions/cyberSecurity/`)
          .then((res) => setCyberSecuritySolutions(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error('Error'));
  };
  const handleDeleteSecuritySolutions = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/solutions/security/${id}`)
      .then((res) => {
        toast.success('Security Solution training deleted');
        axios
          .get(`${process.env.REACT_APP_API_URL}/solutions/security/`)
          .then((res) => setSecuritySolutions(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error('Error'));
  };

  const securitySolutionTableItems = securitySolutions?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      url: item?.url,
      actions: (
        <>
          <Link to={`/solution/security-assessment/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteSecuritySolutions(item?._id)}
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
  const cyberSecuritySolutionsTableItems = cyberSecuritySolutions?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      url: item?.url,
      actions: (
        <>
          <Link to={`/solution/management-solution/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteCyberSecuritySolutions(item?._id)}
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
      <RtCard
        title={'Security Assessment (VA & Tools)'}
        actionRoute={'/solution/security-assessment/add'}
      >
        <CTable
          columns={partnerTableColumns}
          items={securitySolutionTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>

      <RtCard
        title={'Cyber Security Visibility & Management Solutions'}
        actionRoute={'/solution/management-solution/add'}
      >
        <CTable
          columns={partnerTableColumns}
          items={cyberSecuritySolutionsTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>
    </>
  );
};

export default ManageSolutions;
