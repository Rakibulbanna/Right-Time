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

const ManageTraining = () => {
  const [assessmentTraining, setAssessmentTraining] = useState([]);
  const [managementTraining, setManagementTraining] = useState([]);
  const [customizedTraining, setCustomizedTraining] = useState([]);
  const [securityTraining, setSecurityTraining] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/training/allAssesment`)
      .then((res) => setAssessmentTraining(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.REACT_APP_API_URL}/training/allCustomized`)
      .then((res) => setCustomizedTraining(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.REACT_APP_API_URL}/training/allManagement`)
      .then((res) => setManagementTraining(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.REACT_APP_API_URL}/training/allSecurity`)
      .then((res) => {
        setSecurityTraining(res.data)
      })
      .catch((err) => console.log(err));

  }, []);

  function tableItems (path, data, deleteFunction) {
    const arr = data?.map((item, index) => {
      return {
        id: index + 1,
        name: item?.name,
        url: item?.url,
        actions: (
          <>
            <Link to={`/training/${path}/edit/${item?._id}`}>
              <CButton color="success" className="action-btn me-2" variant="outline">
                <CIcon icon={cilPen} className="nav-icon" />
              </CButton>
            </Link>
            <CButton
              color="danger"
              className="action-btn"
              variant="outline"
              onClick={() => deleteFunction(item?._id)}
            >
              <CIcon icon={cilTrash} className="nav-icon" />
            </CButton>
          </>
        ),
        _cellProps: {
          _cellProps: { id: { scope: 'row' } },
        },
      };
    })
    return arr; 
  }

  const handleDeleteAssessment = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/training/assessment/${id}`)
    .then(res => {
      toast.success('Assessment training deleted')
      axios
      .get(`${process.env.REACT_APP_API_URL}/training/allAssesment`)
      .then((res) => setAssessmentTraining(res.data))
      .catch((err) => console.log(err));
    })
    .catch(err => toast.error('Error'))
  };
  const handleDeleteManagement = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/training/management/${id}`)
    .then(res => {
      toast.success('Management training deleted')
      axios
      .get(`${process.env.REACT_APP_API_URL}/training/allManagement`)
      .then((res) => setManagementTraining(res.data))
      .catch((err) => console.log(err));
    })
    .catch(err => toast.error('Error'))
  }; 
  const handleDeleteCustomized = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/training/customized/${id}`)
    .then(res => {
      toast.success('Customized training deleted')
      axios
      .get(`${process.env.REACT_APP_API_URL}/training/allCustomized`)
      .then((res) => setCustomizedTraining(res.data))
      .catch((err) => console.log(err));
    })
    .catch(err => toast.error('Error'))
  };
  const handleDeleteSecurity = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/training/security/${id}`)
    .then(res => {
      toast.success('Security training deleted')
      axios
      .get(`${process.env.REACT_APP_API_URL}/training/allSecurity`)
      .then((res) => {
        setSecurityTraining(res.data)
      })
      .catch((err) => console.log(err));
    })
    .catch(err => toast.error('Error'))
  };

  const assessmentTableItems = tableItems('assessment', assessmentTraining, handleDeleteAssessment);
  const managementTableItems = tableItems('management', managementTraining, handleDeleteManagement);
  const customizedTableItems = tableItems('customized', customizedTraining, handleDeleteCustomized);
  const securityTableItems = tableItems('security', securityTraining, handleDeleteSecurity);
  console.log(securityTableItems);

  return (
    <>
      <RtCard title={'Assessment'} actionRoute={'/training/assessment/add'}>
        <CTable
          columns={partnerTableColumns}
          items={assessmentTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>

      <RtCard title={'Management'} actionRoute={'/training/management/add'}>
        <CTable
          columns={partnerTableColumns}
          items={managementTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>

      <RtCard title={'Customized'} actionRoute={'/training/customized/add'}>
        <CTable
          columns={partnerTableColumns}
          items={customizedTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>

      <RtCard title={'Security'} actionRoute={'/training/security/add'}>
        <CTable
          columns={partnerTableColumns}
          items={securityTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>
    </>
  );
};

export default ManageTraining;

