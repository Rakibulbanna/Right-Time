import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CTable } from '@coreui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';

 /*
        name: {
          type: String,
          require: true,
          unique: true
        },
       
          coverPhoto: {
            type: String,
            require: true,
          },
          divTitle: {
            type: String,
            require: true,
          },
          divDescription: {
            type: String,
            require: true,
          },

*/
const serviceTableColumns = [
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

const ManageServices = () => {
  const [certificationServices, setCertificationServices] = useState([]);
  const [consultationServices, setConsultationServices] = useState([]);
  const [auditingServices, setAuditingServices] = useState([]);
  const [securityTestingServices, setSecurityTestingServices] = useState([]);
  const [managedServices, setManagedServices] = useState([]);


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/services/allAuditing`)
      .then((res) => setAuditingServices(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.REACT_APP_API_URL}/services/allCertification`)
      .then((res) => setCertificationServices(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.REACT_APP_API_URL}/services/allConsultation`)
      .then((res) => setConsultationServices(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.REACT_APP_API_URL}/services/allSecurityTesting`)
      .then((res) => setSecurityTestingServices(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.REACT_APP_API_URL}/services/allManagedServices`)
      .then((res) => setManagedServices(res.data))
      .catch((err) => console.log(err));
  }, []);


  const handleDeleteAuditingServices = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/services/auditing/${id}`)
    .then((res) => {
      toast.success('Auditing services training deleted')
      axios
      .get(`${process.env.REACT_APP_API_URL}/services/allAuditing`)
      .then((res) => setAuditingServices(res.data))
      .catch((err) => console.log(err));
    })
    .catch((err) => toast.error('Error'));
  };
  const handleDeleteCertificationServices = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/services/certification/${id}`)
    .then((res) => {
      toast.success('certification services training deleted')
      axios
      .get(`${process.env.REACT_APP_API_URL}/services/allCertification`)
      .then((res) => setCertificationServices(res.data))
      .catch((err) => console.log(err));
    })
    .catch((err) => toast.error('Error'));
  };
  const handleDeleteConsultationService = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/services/consultation/${id}`)
    .then((res) => {
      toast.success('consultation services training deleted')
      axios
      .get(`${process.env.REACT_APP_API_URL}/services/allConsultation`)
      .then((res) => setConsultationServices(res.data))
      .catch((err) => console.log(err));
    })
    .catch((err) => toast.error('Error'));
  };
  const handleDeleteSecurityTestingServices = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/services/securityTesting/${id}`)
    .then((res) => {
      toast.success('securityTesting services training deleted')
      axios
      .get(`${process.env.REACT_APP_API_URL}/services/allSecurityTesting`)
      .then((res) => setSecurityTestingServices(res.data))
      .catch((err) => console.log(err));
    })
    .catch((err) => toast.error('Error'));
  };
  const handleDeleteManagedServices = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/services/managedServices/${id}`)
    .then((res) => {
      toast.success('managedServices deleted')
      axios
      .get(`${process.env.REACT_APP_API_URL}/services/allManagedServices`)
      .then((res) => setManagedServices(res.data))
      .catch((err) => console.log(err));
    })
    .catch((err) => toast.error('Error'));
  };
  
  const consultationServiceTableItems = consultationServices?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      actions: (
        <>
          <Link to={`/service/consultation-service/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteConsultationService(item?._id)}
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
  const certificationServicesTableItems = certificationServices?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      actions: (
        <>
          <Link to={`/service/certification-service/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteCertificationServices(item?._id)}
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
  const auditingServicesTableItems = auditingServices?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      actions: (
        <>
          <Link to={`/service/auditing-service/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteAuditingServices(item?._id)}
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
  const securityTestingServicesTableItems = securityTestingServices?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      actions: (
        <>
          <Link to={`/service/security-testing-service/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteSecurityTestingServices(item?._id)}
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
  const managedServicesTableItems = managedServices?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      actions: (
        <>
          <Link to={`/service/managed-service/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteManagedServices(item?._id)}
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
      <RtCard title={'Consultation Services'} actionRoute={'/add-consultation-service'}>
        <CTable
          columns={serviceTableColumns}
          items={consultationServiceTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>
      <RtCard title={'Certification Services'} actionRoute={'/add-certification-service'}>
        <CTable
          columns={serviceTableColumns}
          items={certificationServicesTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>
      <RtCard title={'Auditing Services'} actionRoute={'/add-auditing-service'}>
        <CTable
          columns={serviceTableColumns}
          items={auditingServicesTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>
      <RtCard title={'Security Testing Services'} actionRoute={'/add-security-testing-service'}>
        <CTable
          columns={serviceTableColumns}
          items={securityTestingServicesTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>
      <RtCard title={'Managed Services'} actionRoute={'/add-managed-service'}>
        <CTable
          columns={serviceTableColumns}
          items={managedServicesTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>
    </>
  );
};

export default ManageServices;
