import React from "react";
import { Container, CardDeck, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <CardDeck>
                        <Card className="shadow-lg">
                            <Card.Body>
                                <Card.Title className="font-weight-bold">
                                    Classifier Models
                                </Card.Title>
                                <Card.Text>
                                    The models included are: <br />
                                    <ul>
                                        <li>ImageNetClassifier - ResNet</li>
                                        <li>IFOClassifier - MobileNet</li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to="/classifiers">
                                    <Button variant="dark" block>
                                        Go to Classifiers{" "}
                                        <i className="fas fa-arrow-right"></i>
                                    </Button>
                                </Link>
                            </Card.Footer>
                        </Card>
                        <Card className="shadow-lg">
                            <Card.Body>
                                <Card.Title className="font-weight-bold">
                                    FaceSwap
                                </Card.Title>
                                <Card.Text>
                                    Do you want to see how two people look like
                                    when their faces are swapped ? Head over to
                                    this API to see !
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to="/face-swap">
                                    <Button variant="dark" block>
                                        Go to FaceSwap{" "}
                                        <i className="fas fa-arrow-right"></i>
                                    </Button>
                                </Link>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
