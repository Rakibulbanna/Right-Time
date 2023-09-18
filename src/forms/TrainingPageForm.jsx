import { cilSave } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCol, CForm, CFormInput } from '@coreui/react';
import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { isEmptyObject } from 'src/utils/common';

const TrainingPageForm = ({ formInputFields, data, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isEmptyObject(data)) {
      for (const key in data) {
        setValue(key, data[key]);
      }
    }
  }, [data, setValue]);

  return (
    <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
      {formInputFields?.map((field, index) => (
        <CCol key={index} md={field?.col}>
          <CFormInput
            type={field?.type}
            id={field?.id}
            label={field?.label}
            placeholder={field?.placeholder}
            {...register(field?.name, {
              required: field?.required,
              message: field?.message,
            })}
          />
          {errors?.[field?.name] && <span className="text-danger">{field?.message}</span>}
        </CCol>
      ))}
      <div className="text-end">
        <CButton type="submit" color="success" className="mt-3 text-white">
          <CIcon icon={cilSave} className="me-2" />
          {!isEmptyObject(data) ? 'Update' : 'Save'}
        </CButton>
      </div>
    </CForm>
  );
};

export default TrainingPageForm;
