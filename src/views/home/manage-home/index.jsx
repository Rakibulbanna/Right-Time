import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CRow, CTable } from '@coreui/react';
import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from 'src/App';
import RtCard from 'src/components/Ui/Card';

const heroTableColumns = [
  {
    key: 'id',
    label: 'Sl. No.',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'title',
    label: 'Title',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'subtitle',
    label: 'Subtitle',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'actions',
    _props: { scope: 'col', color: 'light' },
  },
];

const serviceTableColumns = [
  {
    key: 'id',
    label: 'Sl. No.',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'title',
    label: 'Title',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'subtitle',
    label: 'Subtitle',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'actions',
    _props: { scope: 'col', color: 'light' },
  },
];

const associationTableColumns = [
  {
    key: 'id',
    label: 'Sl. No.',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'title',
    label: 'Title',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'subtitle',
    label: 'Subtitle',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'actions',
    _props: { scope: 'col', color: 'light' },
  },
];

const partnerTableColumns = [
  {
    key: 'id',
    label: 'Sl. No.',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'imgURL',
    label: 'Image',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'actions',
    _props: { scope: 'col', color: 'light' },
  },
];

const clientTableColumns = [
  {
    key: 'id',
    label: 'Sl. No.',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'photoURL',
    label: 'Image',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'actions',
    _props: { scope: 'col', color: 'light' },
  },
];

const feedbackTableColumns = [
  {
    key: 'id',
    label: 'Sl. No.',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'title',
    label: 'Title',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'subtitle',
    label: 'Subtitle',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'actions',
    _props: { scope: 'col', color: 'light' },
  },
];

const Home = () => {
  const [heros, setHeros] = useState([]);
  const [services, setServices] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [partners, setPartners] = useState([]);
  const [clients, setClients] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  useEffect(() => {
    // console.log(loggedInUser?.token);
    axios
      .get(`${process.env.REACT_APP_API_URL}/home/banner`,{
        headers: {
          Authorization: `${loggedInUser?.token}`,
        },
      })
      .then((res) => {
        setHeros(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_API_URL}/home/service`)
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_API_URL}/home/association`)
      .then((res) => {
        setAssociations(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_API_URL}/home/partnerCarousel`)
      .then((res) => {
        setPartners(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_API_URL}/home/clientCarousel`)
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_API_URL}/home/clientFeedback`)
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => console.log(err));
  }, [loggedInUser]);

  const heroTableItems = heros?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.title,
      subtitle: item?.subtitle,
      actions: (
        <>
          <Link to={`/home/hero/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteHero(item?._id)}
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

  const serviceTableItems = services?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.title,
      subtitle: item?.subtitle,
      actions: (
        <>
          <Link to={`/home/service/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteService(item?._id)}
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

  const associationTableItems = associations?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.title,
      subtitle: item?.subtitle,
      actions: (
        <>
          <Link to={`/home/association/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteAssociation(item?._id)}
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

  const partnerTableItems = partners?.map((item, index) => {
    return {
      id: index + 1,
      imgURL: item?.imgURL,
      actions: (
        <>
          <Link to={`/home/partner/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeletePartner(item?._id)}
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

  const clientTableItems = clients?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.title,
      subtitle: item?.subtitle,
      actions: (
        <>
          <Link to={`/home/client/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteClient(item?._id)}
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

  const feedbackTableItems = feedbacks?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.title,
      designation: item?.designation,
      actions: (
        <>
          <Link to={`/home/feedback/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteFeedback(item?._id)}
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

  const handleDeleteHero = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/home/banner/${id}`,{
        headers: {
          Authorization: `${loggedInUser?.token}`,
        },
      })
      .then((res) => {
        toast.success('Hero deleted successfully!');
        axios
          .get(`${process.env.REACT_APP_API_URL}/home/banner`,{
            headers: {
              Authorization: `${loggedInUser?.token}`,
            },
          })
          .then((res) => {
            setHeros(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error('Hero deletion failed!'));
  };

  const handleDeleteService = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/home/service/${id}`)
      .then((res) => {
        toast.success('Service deleted successfully!');
        axios
          .get(`${process.env.REACT_APP_API_URL}/home/service`)
          .then((res) => {
            setServices(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error('Service deletion failed!'));
  };

  const handleDeleteAssociation = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/home/association/${id}`)
      .then((res) => {
        toast.success('Association deleted successfully!');
        axios
          .get(`${process.env.REACT_APP_API_URL}/home/association`)
          .then((res) => {
            setAssociations(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error('Association deletion failed!'));
  };

  const handleDeletePartner = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/home/partnerCarousel/${id}`)
      .then((res) => {
        toast.success('partnerCarousel deleted successfully!');
        axios
          .get(`${process.env.REACT_APP_API_URL}/home/partnerCarousel`)
          .then((res) => {
            setPartners(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error('partnerCarousel deletion failed!'));
  };

  const handleDeleteClient = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/home/clientCarousel/${id}`)
      .then((res) => {
        toast.success('Client deleted successfully!');
        axios
          .get(`${process.env.REACT_APP_API_URL}/home/clientCarousel`)
          .then((res) => {
            setClients(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error('Client deletion failed!'));
  };

  const handleDeleteFeedback = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/home/clientFeedback/${id}`)
      .then((res) => {
        toast.success("Client's feedback deleted successfully!");
        axios
          .get(`${process.env.REACT_APP_API_URL}/home/clientFeedback`)
          .then((res) => {
            setFeedbacks(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error("Client's feedback deletion failed!"));
  };

  return (
    <>
      <RtCard title={'Banner Section'} actionRoute={'/home/hero/add'}>
        <CTable columns={heroTableColumns} items={heroTableItems} hover bordered responsive />
      </RtCard>

      <RtCard title={'Services'} actionRoute={'/home/service/add'}>
        <CTable columns={serviceTableColumns} items={serviceTableItems} hover bordered responsive />
      </RtCard>

      <RtCard title={'Associations'} actionRoute={'/home/association/add'}>
        <CTable
          columns={associationTableColumns}
          items={associationTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>

      <RtCard title={'Partners'} actionRoute={'/home/partner/add'}>
        <CTable columns={partnerTableColumns} items={partnerTableItems} hover bordered responsive />
      </RtCard>

      <RtCard title={'Client Showcase'} actionRoute={'/home/client/add'}>
        <CTable columns={clientTableColumns} items={clientTableItems} hover bordered responsive />
      </RtCard>

      <RtCard title={'Client Feedbacks'} actionRoute={'/home/feedback/add'}>
        <CTable
          columns={feedbackTableColumns}
          items={feedbackTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>
    </>
  );
};

export default Home;
