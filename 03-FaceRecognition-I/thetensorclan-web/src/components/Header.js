import React from "react";
import { Navbar, Container } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TitleWrapper = styled(Link)`
    font-size: calc(5vh + 1vw);
    max-width: 100%;
    font-weight: bolder;
    color: #000;
    text-decoration: none;
    text-shadow: 4px 3px 4px #8395a7;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

const Header = ({ title }) => {
    return (
        <Container>
            <Navbar variant="light" bg="none" sticky="top" className="px-2">
                <TitleWrapper className="display-4 m-auto py-3" to="/">
                    <i className="fas fa-quidditch" /> {title}
                </TitleWrapper>
            </Navbar>
            <hr />
        </Container>
    );
};

export default Header;
