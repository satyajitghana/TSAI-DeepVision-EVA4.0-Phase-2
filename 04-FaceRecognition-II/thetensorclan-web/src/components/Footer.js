import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Footer = () => {
    return (
        <Container className="mt-5">
            <Navbar>
                <Navbar.Text className="m-auto">
                    Made with <i className="fas fa-heart" /> and{" "}
                    <i className="fas fa-mug-hot" /> by TheTensorClan
                </Navbar.Text>
            </Navbar>
        </Container>
    );
};

export default Footer;
