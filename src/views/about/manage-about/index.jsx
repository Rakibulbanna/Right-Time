import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CTable } from '@coreui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtCard from 'src/components/Ui/Card';
import AboutPageForm from 'src/forms/AboutPageForm';

const aboutInputFields = [
  {
    col: 12,
    id: 'titleInput',
    name: 'title',
    type: 'text',
    label: 'Title',
    placeholder: 'Enter Title',
    required: true,
    message: 'Title is required',
  },
  {
    col: 12,
    id: 'descriptionInput',
    name: 'divDescription',
    type: 'text',
    label: 'Description',
    placeholder: 'Enter Description',
    required: true,
    message: 'Description is required',
  },
];

const teamMemberTableColumns = [
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
    key: 'designation',
    label: 'Designation',
    _props: { scope: 'col', color: 'light' },
  },
  {
    key: 'actions',
    _props: { scope: 'col', color: 'light' },
  },
];

const ManageAbout = () => {
  const [data, setData] = useState();
  const [teamMembers, setTeamMembers] = useState([]);
  const [aboutId, setAboutId] = useState();

  const doSome = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/about/`)
      .then((res) => {
        console.log(res);
        setAboutId(res.data?._id);
        setData(res.data);
      })
      .catch((err) => console.log(err));

    await axios
      .get(`${process.env.REACT_APP_API_URL}/about/teamMember`)
      .then((res) => {
        console.log(res);

        setTeamMembers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    doSome();
  }, []);

  const handleEditAbout = (data) => {
    if (aboutId) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/about/${aboutId}`, data)
        .then((res) => toast.success('About updated successfully!'))
        .catch((error) => {
          console.log(error);
          toast.error('Error');
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/about/`, data)
        .then((res) => toast.success('About added successfully!'))
        .catch((error) => {
          console.log(error);
          toast.error('Error');
        });
    }
  };

  const teamMemberTableItems = teamMembers?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      designation: item?.designation,
      actions: (
        <>
          {/* TODO */}
          <Link to={`/about/team-member/edit/${item?._id}`}>
            <CButton color="success" className="action-btn me-2" variant="outline">
              <CIcon icon={cilPen} className="nav-icon" />
            </CButton>
          </Link>
          <CButton
            color="danger"
            className="action-btn"
            variant="outline"
            onClick={() => handleDeleteTeamMember(item?._id)}
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

  const handleDeleteTeamMember = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/about/teamMember/${id}`)
      .then(async (res) => {
        toast.success('team member deleted');

        await axios
          .get(`${process.env.REACT_APP_API_URL}/about/teamMember`)
          .then((res) => {
            console.log(res);

            setTeamMembers(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        toast.error('error');
      });
  };

  return (
    <>
      <RtCard title={'About'}>
        <AboutPageForm data={data} formInputFields={aboutInputFields} onSubmit={handleEditAbout} />
      </RtCard>

      <RtCard title={'Team Members'} actionRoute={'/about/team-member/add'}>
        <CTable
          columns={teamMemberTableColumns}
          items={teamMemberTableItems}
          hover
          bordered
          responsive
        />
      </RtCard>
    </>
  );
};

export default ManageAbout;
