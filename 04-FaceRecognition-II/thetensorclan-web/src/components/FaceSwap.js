import React, { Fragment, useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Image,
    Button,
    ProgressBar,
    Spinner,
    Toast,
} from "react-bootstrap";
import { FACE_SWAP_ENDPOINT } from "../constants/APIEndpoints";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const FaceSwap = () => {
    const [faceOne, setFaceOne] = useState({});
    const [faceTwo, setFaceTwo] = useState({});
    const [swappedImage, setSwappedImage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const swapFaces = async () => {
        const formData = new FormData();
        formData.append("files", faceOne);
        formData.append("files", faceTwo);

        try {
            // clear out the messages
            setShowMessage(false);
            setMessage("");
            // show the progress bar
            setShowLoading(true);
            const results = await axios.post(
                `${FACE_SWAP_ENDPOINT}`,
                formData,
                {
                    crossDomain: true,
                    onUploadProgress: (progressEvent) => {
                        setUploadPercentage(
                            parseInt(
                                Math.round(
                                    (progressEvent.loaded * 100) /
                                        progressEvent.total
                                )
                            )
                        );
                    },
                }
            );
            setSwappedImage(results.data);
        } catch (e) {
            // some error occured, reset states and show message
            setMessage(JSON.stringify(e));
            setShowMessage(true);
            setSwappedImage("");
        }

        // we are done, now turn off the loading and progress bar
        setShowLoading(false);

        setTimeout(() => {
            setUploadPercentage(0);
        }, 5000);
    };

    return (
        <Container>
            <Form>
                <Row className="justify-content-around">
                    <Col sm={12} md={8} lg={5} className="m-1">
                        <Form.Group as={Row}>
                            <Form.Label>
                                <h5>
                                    <strong>Select Face 01</strong>
                                </h5>
                            </Form.Label>

                            <Form.File custom>
                                <Form.File.Input
                                    onChange={(e) =>
                                        setFaceOne(e.target.files[0])
                                    }
                                    accept=".jpg,.png,.jpeg"
                                />
                                <Form.File.Label data-browse="Browse">
                                    {faceOne.name === undefined
                                        ? "Select Face One"
                                        : faceOne.name}
                                </Form.File.Label>
                            </Form.File>
                            {faceOne.name && (
                                <Image
                                    src={URL.createObjectURL(faceOne)}
                                    style={{ width: "85%" }}
                                    className="mx-auto mt-5"
                                    rounded
                                    fluid
                                />
                            )}
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={8} lg={5} className="m-1">
                        <Form.Group as={Row}>
                            <Form.Label>
                                <h5>
                                    <strong>Select Face 02</strong>
                                </h5>
                            </Form.Label>

                            <Form.File custom>
                                <Form.File.Input
                                    onChange={(e) =>
                                        setFaceTwo(e.target.files[0])
                                    }
                                    accept=".jpg,.png,.jpeg"
                                />
                                <Form.File.Label data-browse="Browse">
                                    {faceTwo.name === undefined
                                        ? "Select Face Two"
                                        : faceTwo.name}
                                </Form.File.Label>
                            </Form.File>
                            {faceTwo.name && (
                                <Image
                                    src={URL.createObjectURL(faceTwo)}
                                    style={{ width: "85%" }}
                                    className="mx-auto mt-5"
                                    rounded
                                    fluid
                                />
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button
                        variant="dark"
                        className="mt-5 mx-auto shadow-lg"
                        size="lg"
                        disabled={
                            faceOne.name === undefined ||
                            faceTwo.name === undefined
                        }
                        onClick={() => swapFaces()}
                    >
                        Swap Faces !
                    </Button>
                </Row>
                <Row>
                    <Col>
                        {/* Show the Upload Progress */}
                        <ProgressBar
                            className="mt-5"
                            striped
                            variant="dark"
                            now={uploadPercentage}
                            label={`${uploadPercentage}%`}
                            hidden={!showLoading}
                        />
                    </Col>
                </Row>
                <Row>
                    <Button
                        variant="dark"
                        className="mt-5"
                        hidden={!showLoading}
                        disabled
                        block
                    >
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />{" "}
                        Loading...
                    </Button>
                </Row>

                <Row>
                    <Col md={6} lg={6} className="mx-auto mt-5">
                        {swappedImage !== "" && (
                            <Fragment>
                                <h1 className="text-center">Swapped Image</h1>
                                <Image
                                    src={swappedImage}
                                    style={{ width: "85%" }}
                                    className="mx-auto mt-5"
                                    rounded
                                    fluid
                                />
                            </Fragment>
                        )}
                    </Col>
                </Row>

                <Row>
                    <Toast
                        onClose={() => setShowMessage(false)}
                        show={showMessage}
                        className="mx-auto mt-5 bg-dark text-white shadow-lg"
                        as={Row}
                    >
                        <Toast.Header>
                            <strong className="mr-auto">Message</strong>
                            <small>just now</small>
                        </Toast.Header>
                        <Toast.Body>{message}</Toast.Body>
                    </Toast>
                </Row>
            </Form>
        </Container>
    );
};

export default FaceSwap;
