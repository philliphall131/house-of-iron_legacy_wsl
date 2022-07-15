import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Button, Row } from 'react-bootstrap';
import '../styles/Form.css';
import ironAPI from '../utils/ironAPI';
import { StateContext } from '../ContextObjs';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';

const LoginPage = () => {
  let navigate = useNavigate();
  const { state, dispatch } = useContext(StateContext);

  const validationSchema = yup.object().shape({
    email: yup.string()
      .required('Email is required')
      .email('Not a valid email'),
    password: yup.string()
      .required('Password is required')
      .min(4, 'Password length should be at least 4 characters'),
  })

  const initialValues = {
    email:'',
    password:'',
  };

  const formatErrors = (errors) => {
    let returnString = ''
    for (let i=0; i<errors.length; i++){
      returnString += errors[i] + "\n"
    }
    return returnString
  }

  const onSubmit = async (values, { setSubmitting, setFieldError })=> {
    ironAPI.login(values)
      .then((response)=>{
        console.log(response)
        dispatch({ type: 'SIGN_IN', data: response.data });
        navigate("/dashboard", { replace: true });
      })
      .catch(error=>{
        let errors = error.response.data
        let errorFields = Object.keys(errors)
        for (let i=0; i<errorFields.length; i++){
          if (Object.keys(initialValues).includes(errorFields[i])){
            setFieldError(errorFields[i], formatErrors(errors[errorFields[i]]))
          } else {
            setFieldError('general', formatErrors(errors[errorFields[i]]))
          }
        }
        setSubmitting(false)
      })
      .finally(()=>{
        setSubmitting(false)
      })
  }

  return (
    <Formik 
      validateOnBlur={false}
      validateOnChange={false} 
      {...{initialValues, onSubmit, validationSchema }}
    >
      {({ 
        handleSubmit, 
        handleBlur, 
        handleChange, 
        values, 
        errors, 
        isSubmitting, 
        touched 
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="m-3 justify-content-center">
            <Form.Group className="form-inputs" controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                    type="text" 
                    name="email"
                    value={values.email}
                    placeholder="Enter your email" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-inputs" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password" 
                    name= "password"
                    value={values.password}
                    placeholder="Password" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>
            <Button className="submit-button mt-2" variant="primary" type="submit" disabled={isSubmitting}>
                Submit
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

export default LoginPage