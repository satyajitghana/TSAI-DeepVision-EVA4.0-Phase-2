import React, { Fragment } from "react";
import { ThemeProvider } from "styled-components";
import { Container, Alert } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Classifiers from "./components/Classifiers";
import FaceSwap from "./components/FaceSwap";

function App() {
    return (
        <ThemeProvider theme={{ fontFamily: "JetBrains Mono" }}>
            <Router>
                <Fragment>
                    <GlobalStyles />
                    <Container>
                        <Header title="TheTensorClan" />

                        <Alert variant="info">
                            <Alert.Heading>Note</Alert.Heading>
                            <p>
                                The models are hosted on AWS Lambda, which needs
                                a cold start, you might recieve err::TimedOut
                                once or twice, just click on the button again to
                                send one more Request !
                            </p>
                        </Alert>
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/classifiers">
                                <Classifiers />
                            </Route>
                            <Route path="/face-swap">
                                <FaceSwap />
                            </Route>
                        </Switch>
                        <Footer />
                    </Container>
                </Fragment>
            </Router>
        </ThemeProvider>
    );
}

export default App;
