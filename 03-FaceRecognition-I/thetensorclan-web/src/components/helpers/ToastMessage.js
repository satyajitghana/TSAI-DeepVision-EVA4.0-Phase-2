import React from "react";
import { Toast } from "react-bootstrap";

const ToastMessage = ({ heading, message, showMessage, setShowMessage }) => {
    return (
        <Toast
            onClose={() => setShowMessage(false)}
            show={showMessage}
            className="mx-auto mt-5 bg-dark text-white shadow-lg"
        >
            <Toast.Header>
                <strong className="mr-auto">{heading}</strong>
                <small>just now</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
};

export default ToastMessage;
