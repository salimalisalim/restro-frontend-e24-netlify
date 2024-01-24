import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Modal } from 'react-bootstrap';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDelete({id, getUsers}) {

    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete= async() => {

       try {
        
        const res = await instance.delete(`api/v1/user/${id}`, {
            withCredentials:true
        });

        if(!res.data.success){
            toast.error(res.data.message);
        }

        setShow(false);
        getUsers();
        toast.success(res.data.message);

       } catch (error) {
        toast.error(error.response.data.message);
       }


    }

  return (
    <>
    <DeleteIcon onClick={handleShow} />
    <ToastContainer position="top-center"  />
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>User Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

    </>
    
  )
}

export default UserDelete