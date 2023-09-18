import { cilSave } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCol, CForm, CFormInput, CImage } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { isEmptyObject } from 'src/utils/common';

const IndustriesPageForm = ({ data, onSubmit }) => {
  const [Img,setImg]=useState('');
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isEmptyObject(data)) {
      const imgurl = data?.photoURL || data?.iconURL || data?.imgUrl || data?.coverPhoto;
      setImg(`${process.env.REACT_APP_API_URL}/static/${imgurl}`)
     
      for (const key in data) {
        setValue(key, data[key]);
      }
    }
  }, [data, setValue]);

  useEffect(() => {
    register('div', { required: true });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue('div', editorState);
  };

  const editorContent = watch('div');

  return (
    <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
      <CCol md={12}>
        <CFormInput
          type="file"
          id="coverImageUpload"
          label="Cover Photo"
          {...register('coverPhoto', {
            // required: true,
            message: 'Cover photo is required',
          })}
        />
        {errors?.coverPhoto && <span className="text-danger">{errors?.coverPhoto?.message}</span>}
      </CCol>
      {
       !isEmptyObject(data)&& <div>
      <CImage
     rounded thumbnail src={Img}
      width={200} height={100}
      fluid
      className="mb-2"
    />
      </div>
      }
      <CCol md={12}>
        <CFormInput
          type="text"
          id="nameInput"
          label="Name"
          placeholder="Enter Name"
          {...register('name', {
            required: true,
            message: 'Name is required',
          })}
        />
        {errors.required && <span className="text-danger">Name is required</span>}
      </CCol>
      <CCol md={12}>
        <label htmlFor="description" className="mb-2">
          Description
        </label>
        <ReactQuill
          id="description"
          theme="snow"
          value={editorContent}
          onChange={onEditorStateChange}
        />
      </CCol>
      <div className="text-end">
        <CButton type="submit" color="success" className="mt-3 text-white">
          <CIcon icon={cilSave} className="me-2" />
          {!isEmptyObject(data) ? 'Update' : 'Save'}
        </CButton>
      </div>
    </CForm>
  );
};

export default IndustriesPageForm;
