import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {authUserSuccess} from '../redux/userAuth';
import { useDispatch } from 'react-redux';



function Login() {

    const [validated, setValidated] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormSubmit = async (e)=>{

        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
          }
        else{

          try {
            let res = await axios.post('https://restro-backend-e24-render.onrender.com/api/v1/login',{
                email:userEmail,
                password:userPassword
         },{
            withCredentials:true
         }
         );
            if(res.data.success){

                if(res.data.isAuthenticated){

                    dispatch(authUserSuccess({user:res.data.user,isAuthenticated:res.data.isAuthenticated }));
                }
              
                toast.success(res.data.message, {
                    autoClose:1000
                });

                await new Promise((resolve) => setTimeout(resolve, 1000));

                navigate('/');

            }else{
                toast.error(res.data.message, {
                    autoClose:100
                });
            }
            
          } catch (error) {
            toast.error(error.message);
            // console.log(error.response.data.message);
          }

        }  

        setValidated(true);

    }

    const handleUserEmail = (e)=>{
        setUserEmail(e.target.value);
    }

    const handleUserPassword= (e)=>{
        setUserPassword(e.target.value);
    }

  return (
    <Container>
        <Row>
            <Col className='mt-3'>
                <h3>Login</h3>
            </Col>
        </Row>
            <Row>
                <Col className='mt-3'>
                <ToastContainer position="top-center" autoClose={1000}  />
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit} >
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" onChange={(e) => handleUserEmail(e)} required />
                            <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Email looks good</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(e) => handleUserPassword(e)} required />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit" >
                            Login
                        </Button>
                    </Form>
           
                    

                </Col>
            </Row>
        </Container>
  )
}

export default Login