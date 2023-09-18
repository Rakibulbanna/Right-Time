import { cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const RtCard = ({ title, actionRoute, children }) => {
  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex align-items-center justify-content-between">
        <strong>{title}</strong>
        <div>
          {actionRoute && (
            <Link to={actionRoute}>
              <CButton color="primary" className="text-white action-btn">
                <CIcon icon={cilPlus} className="nav-icon" />
              </CButton>
            </Link>
          )}
        </div>
      </CCardHeader>
      <CCardBody>{children}</CCardBody>
    </CCard>
  );
};

export default RtCard;
