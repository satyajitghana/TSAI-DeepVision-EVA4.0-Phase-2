import React, { useState, Fragment } from "react";
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
    Alert,
} from "react-bootstrap";
import {
    CLASSIFY_ENDPOINT,
    FACE_ALIGN_ENDPOINT,
} from "../constants/APIEndpoints";
import axios from "axios";

import ClassificationResult from "./ClassificationResult";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const IndianFaceRecognizer = () => {
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("Please select a Face image");
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [results, setResults] = useState([]);
    const [alignedFace, setAlignedFace] = useState("");

    // https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    const classifyImage = async () => {
        try {
            setMessage("");
            setAlignedFace("");
            setShowMessage(false);
            setShowLoading(true);
            setResults([]);
            const formData = new FormData();
            formData.append("file", file);

            // align the face first
            const aligned_face = await axios.post(
                `${FACE_ALIGN_ENDPOINT}`,
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

            setAlignedFace(aligned_face.data);

            const alignedFormData = new FormData();
            const alignedFaceFile = dataURLtoBlob(aligned_face.data);
            alignedFormData.append("file", alignedFaceFile, "aligned.jpg");

            // request classification from end-point
            const results = await axios.post(
                `${CLASSIFY_ENDPOINT}/indian-face`,
                alignedFormData,
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
            setFileName("Please select a Face Image (should be in dataset)");
        }
    };
    return (
        <Container>
            <Form>
                <Row>
                    <Col>
                        <Form.Group as={Row}>
                            <Form.Label className="mb-5">
                                <h5>
                                    <strong>Select Face Image</strong>
                                </h5>

                                <p>Supported Faces are:</p>
                                <code>
                                    ["Dr_APJ_Abdul_Kalam", "Dr_Sabita_Ghana",
                                    "Gaur_Gopal_Das", "MS_Dhoni",
                                    "Mukesh_Ambani", "Narendra_Modi",
                                    "Ratan_Tata", "Rohan_Shravan",
                                    "Sachin_Tendulkar", "Viswanathan_Anand"]
                                </code>
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
                        Align and Classify !
                    </Button>
                </Row>
                <Row>
                    <Col md={6} lg={6} className="mx-auto mt-5">
                        {alignedFace !== "" && (
                            <Fragment>
                                <h1 className="text-center">Aligned Face</h1>
                                <Image
                                    src={alignedFace}
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

export default IndianFaceRecognizer;
