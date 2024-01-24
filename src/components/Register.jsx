import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

    const [validated, setValidated] = useState(false);
    const [userFullname, setUserFullname] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const navigate = useNavigate();


    const handleFormSubmit = async (e)=>{

        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
          }
        else{

          try {
            let res = await axios.post('https://restro-backend-e24-render.onrender.com/api/v1/register', {
                fullname:userFullname,
                email:userEmail,
                password:userPassword
            });

            if(res.data.success){
                toast.success(res.data.message, {
                    autoClose:2000
                });

                await new Promise((resolve) => setTimeout(resolve, 2000));

                navigate('/login');

            }else{
                toast.error(res.data.message);
            }
            
          } catch (error) {
            toast.error(error.response.data.message);
          }

        }  

        setValidated(true);

    }

    const handleUserFullname = (e)=>{
        setUserFullname(e.target.value);

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
                <h3>Register</h3>
            </Col>
        </Row>
            <Row>
                <Col className='mt-3'>
                <ToastContainer position="top-center"  />
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit} >
                        <Form.Group className="mb-3">
                            <Form.Label>Fullname:</Form.Label>
                            <Form.Control type="text" placeholder="Enter fullname" onChange={(e) => handleUserFullname(e)} required />
                            <Form.Control.Feedback type='invalid'>Please enter fullname</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Fullname looks good</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" onChange={(e) => handleUserEmail(e)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(e) => handleUserPassword(e)} required />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit" >
                            Register
                        </Button>
                    </Form>
           
                    

                </Col>
            </Row>
        </Container>
  )
}

export default Register