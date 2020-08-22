import React, { useState } from "react";
import {
    Container,
    Form,
    Row,
    Col,
    Button,
    Spinner,
    Toast,
    ProgressBar,
    Image,
} from "react-bootstrap";
import { CLASSIFY_ENDPOINT } from "../constants/APIEndpoints";
import axios from "axios";
import ClassificationResult from "./ClassificationResult";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const Classifiers = () => {
    const [file, setFile] = useState("");
    const [modelType, setModelType] = useState("resnet34-imagenet");
    const [fileName, setFileName] = useState("Please select an image");
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [results, setResults] = useState([]);

    const classifyImage = async () => {
        try {
            setMessage("");
            setShowMessage(false);
            setShowLoading(true);
            const formData = new FormData();
            formData.append("file", file);

            // request classification from end-point
            const results = await axios.post(
                `${CLASSIFY_ENDPOINT}/${modelType}`,
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
            // console.log(JSON.stringify(results.data));
            setResults(results.data);
        } catch (e) {
            // some error occured, create a Toast !
            setMessage(JSON.stringify(e));
            setShowMessage(true);
            setResults([]);
        }

        // we are done, now turn off the loading and progress bar
        setShowLoading(false);

        // reset the states
        setTimeout(() => {
            setUploadPercentage(0);
        }, 5000);
    };

    const onFileSelect = (e) => {
        if (e.target.files.length >= 1) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        } else {
            setFileName("Please select an Image");
        }
    };

    return (
        <Container>
            <Form>
                <Row>
                    <Col>
                        <Form.Group
                            as={Row}
                            controlId="exampleForm.ControlSelect1"
                            className="py-5"
                        >
                            <Form.Label>
                                <h5>
                                    <strong>Select Model</strong>
                                </h5>
                            </Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) => setModelType(e.target.value)}
                                value={modelType}
                            >
                                <option value="resnet34-imagenet">
                                    ImageNet Classifier - ResNet
                                </option>
                                <option value="mobilenetv2-ifo">
                                    IFO Classifier - MobileNetV2
                                </option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label>
                                <h5>
                                    <strong>Select Image</strong>
                                </h5>
                            </Form.Label>

                            <Form.File custom>
                                <Form.File.Input
                                    onChange={onFileSelect}
                                    accept=".jpg,.png,.jpeg"
                                />
                                <Form.File.Label data-browse="Browse">
                                    {fileName}
                                </Form.File.Label>
                            </Form.File>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={6} className="mx-auto">
                        {file.name && (
                            <Image
                                src={URL.createObjectURL(file)}
                                style={{ width: "85%" }}
                                className="mx-auto mt-5"
                                rounded
                                fluid
                            />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Button
                        variant="dark"
                        className="mt-5 mx-auto shadow-lg"
                        size="lg"
                        onClick={() => classifyImage()}
                        disabled={file.name === undefined}
                    >
                        Classify !
                    </Button>
                </Row>
                <Row>
                    <Col md={6} lg={6} className="mx-auto mt-5">
                        {results.length > 0 && (
                            <ClassificationResult results={results} />
                        )}
                    </Col>
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

export default Classifiers;
