import { cilSave } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCol, CForm, CFormInput, CImage } from '@coreui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { isEmptyObject } from 'src/utils/common';

const PartnerPageForm = ({ form = 'partner', formInputFields, data, onSubmit }) => {
  const [Img, setImg] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  console.log('partnerData______', data);

  useEffect(() => {
    if (!isEmptyObject(data)) {
      const imgurl = data?.photoURL || data?.iconURL || data?.imgUrl || data?.coverPhoto;
      setImg(`${process.env.REACT_APP_API_URL}/static/${imgurl}`);

      for (const key in data) {
        setValue(key, data[key]);
      }
    }
  }, [data, setValue]);

  useEffect(() => {
    if (form === 'training') {
      register('divDescription', { required: true });
    }
    if (form === 'career') {
      register('description', { required: true });
    }
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue('divDescription', editorState);
  };
  const onDescStateChange = (editorState) => {
    setValue('description', editorState);
  };

  const editorContent = watch('divDescription');
  const descContent = watch('description');

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
              // required: field?.required,
              message: field?.message,
            })}
          />
          {errors?.[field?.name] && <span className="text-danger">{field?.message}</span>}
        </CCol>
      ))}
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
      {form === 'training' && (
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
      )}
      {form === 'career' && (
        <CCol md={12}>
          <label htmlFor="description" className="mb-2">
            Description
          </label>
          <ReactQuill
            id="description"
            theme="snow"
            value={descContent}
            onChange={onDescStateChange}
          />
        </CCol>
      )}
      <div className="text-end">
        <CButton type="submit" color="success" className="mt-3 text-white">
          <CIcon icon={cilSave} className="me-2" />
          {!isEmptyObject(data) ? 'Update' : 'Save'}
        </CButton>
      </div>
    </CForm>
  );
};

export default PartnerPageForm;
