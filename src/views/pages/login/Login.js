import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { UserContext } from 'src/App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'


const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = (data) => {
   // console.log("hitted ",data);
		axios
			.post(`${process.env.REACT_APP_API_URL}/user/login`, data)
			.then((res) => {
				// console.log(res.data)
				//toast.success(res?.data?.message);
				if(res?.data?.message=='User Not Found'){
					
					toast.error("User Not Found");
				}else{
				localStorage.setItem('user', JSON.stringify(res.data));
								setLoggedInUser(res.data);
								if (res?.data) {
									navigate('/home');
								} 	
				}
				
			})
			.catch((err) => {
				toast.error(err?.data?.message);
			});
	};
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(handleSubmitForm)}>
                    <h4 className='d-flex justify-content-center'>Right Time Admin</h4> <br />
                    {/* <h5 className="text-medium-emphasis d-flex justify-content-center">Right Time Admin</h5> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                      type="email"
                       placeholder="email"
                        autoComplete="email" 
                        {...register('email', {
                          required: true,
                          // minLength: 11,
                          // maxLength: 14,
                        })}
                        
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register('password', {
                          required: true,
                         // pattern: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                        })}
                      />
                    </CInputGroup>
                   
                     <div className='d-flex justify-content-around'>
                         <CButton type="submit" color="primary" className="px-4 text-center   ">
                          Login
                        </CButton>
                      </div>
                              
                      
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                  
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    // <div
		// 	className="d-flex align-items-center justify-content-center"
		// 	style={{ height: '90vh' }}
		// >
		// 	<div className="col-md-4">
		// 		<LoginForm authType={'login'} onSubmit={handleSubmit} />
		// 	</div>
		// </div>
  )
}

export default Login
