import React, { useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Home() {

    const [count, setCount] = useState(10);

    const restaurants = useSelector((state) => state.data.restaurants);

    
    const updateCount = ()=>{
        setCount(40);

    }


    //stateless components ....> FN components
    //stateful components -----> Class based comp
    //Hooks ===> Fn that will add extra features  // useState();

    console.log("homeeeeeeeeeeeeee");

    return (
        <Container>
            <button onClick={updateCount}>Update Count</button>
            <Row>

                {restaurants && restaurants.map((res, index) =>(
                    <Col md={4} className='mt-3' key={index}>
                    <Card>
                        <Card.Img variant="top" src={process.env.REACT_APP_SERVER_URL + res.photograph} />
                        <Card.Body>
                            <Card.Title>{res.name}</Card.Title>
                            <p>{res.neighborhood}, {res.address}</p>
                            <hr />
                            <p><strong>Cuisine Type:</strong>{res.cuisine_type}</p>
                            <Button as= {Link} to={`/details/${res._id}`} variant="primary">More Info</Button>
                        </Card.Body>
                    </Card>
                </Col>
                ))}


                
            </Row>
        </Container>
    )
}

export default Home