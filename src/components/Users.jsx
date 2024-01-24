import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDelete from './UserDelete';

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(()=>{

      //Move this function out of useEffect and invoke it inside useEffect 
      // Then pass this function as a prop to delete compoenent
      // Destrucure it there and invoke after the delte API's success
      // Remove users from dependancy array
      
       const getUsers = async ()=>{

       try {
        
        const res = await axios.get("https://restro-backend-e24-render.onrender.com/api/v1/users", {withCredentials:true});

        setUsers(res.data.users);

       } catch (error) {
        toast.error(error.message);
       }

        }

        getUsers();

    },[users]);


  return (
    <Container>
        <Row>
            <Col className='mt-3'>
                <h3>Users</h3>
            </Col>
        </Row>
        <ToastContainer position="top-center"  />
        <Row>
            <Col>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
       
       {users && users.map((u,i) => (
         <tr key={i}>
         <td>{i + 1}</td>
         <td>{u.fullname}</td>
         <td>{u.email}</td>
         <td>
          <Link to={`/user/${u._id}`} ><BorderColorIcon/></Link>
         </td>
         <td>
          <UserDelete id={u._id} />
         </td>
       </tr>
       ))}
        
      </tbody>
    </Table>
            </Col>
        </Row>
        </Container>
  )
}

export default Users