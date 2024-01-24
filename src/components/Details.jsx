import React, { useEffect, useState } from 'react'
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'

function Details() {

    const {id} = useParams();
    const restaurants = useSelector((state) => state.data.restaurants);




    const currentRes = restaurants.find((res) => res._id == id);

    console.log(currentRes);

  return (
    <Container>
        {currentRes &&  <Row>
            <Col className='mt-3' md={8}>
            <Card >
      <Card.Img variant="top" src={process.env.REACT_APP_SERVER_URL + currentRes.photograph} />
      <Card.Body>
        <Card.Title>{currentRes.name}</Card.Title>
        <p>
        {currentRes.neighborhood}, {currentRes.address}
        </p>
      </Card.Body>
    </Card>
            </Col>

            <Col className='mt-3'  md={4}>
            <Card >
      <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card>
            </Col>
        </Row> }
       
    </Container>
  )
}

export default React.memo(Details)