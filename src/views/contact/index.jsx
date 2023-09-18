import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTable } from '@coreui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RtCard from 'src/components/Ui/Card';
import { cilPen, cilTrash } from '@coreui/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Modal } from '@coreui/coreui';

const Contact = () => {
    
    const contactTableColumns = [
        {
          key: 'id',
          label: 'Sl. No.',
          _props: { scope: 'col', color: 'light' },
        },
        {
          key: 'fullName',
          label: 'Full Name',
          _props: { scope: 'col', color: 'light' },
        },
        {
          key: 'email',
          label: 'Email',
          _props: { scope: 'col', color: 'light' },
        },
        {
          key: 'view',
          label: 'view',
          _props: { scope: 'col', color: 'light' },
        },
        {
          key: 'actions',
          label: 'actions',
          _props: { scope: 'col', color: 'light' },
        },
      ];
      const [contact, setContact] = useState([]);

      const [visible, setVisible] = useState(false)

      useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/contact/`)
          .then((res) => {
            setContact(res?.data);
          })
          .catch((err) => console.log(err));
      }, []);



  const contactTableItems = contact?.map((item, index) => {
    return {
      id: index + 1,
      fullName: item?.fullName,
      email: item?.email,
      
      view: (
        <>
          <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Message Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
      {Object.keys(item).map((keyName, i) => (
    <p className="travelcompany-input" key={i}>
        
        <p><span style={{color: "red",fontSize:"20px"}}>{keyName}</span><br /> {item[keyName]}</p>


    </p>
))}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
       
      </CModalFooter>
    </CModal>
          <CButton color="success" className="action-btn me-2" variant="outline"
          onClick={() => setVisible(!visible)}
          >
              view details
            </CButton>
        </>
      ),
      actions: (
        <>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteContact(item?._id)}
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
  const handleDeleteContact = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/contact/${id}`)
    .then((res) => {
      toast.success('contact deleted successfully!');
      axios
      .get(`${process.env.REACT_APP_API_URL}/contact/`)
      .then((res) => {
        setContact(res?.data);
      })
      .catch((err) => console.log(err));
    })
    .catch((err) => toast.error('Error!'));
  };
  return (
    <>
      
        <CTable 
        columns={contactTableColumns}
         items={contactTableItems} 
         hover
         bordered 
         responsive 
         />
   
    </>
  );
};

export default Contact;
