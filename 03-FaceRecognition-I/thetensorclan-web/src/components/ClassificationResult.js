import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const SmallTable = styled(Table)`
    * {
        font-size: 0.8rem;
    }
`;

const ClassificationResult = ({ results }) => {
    return (
        <SmallTable size="sm" striped bordered responsive>
            <thead>
                <tr>
                    <th>class_idx</th>
                    <th>class_name</th>
                    <th>confidence</th>
                </tr>
            </thead>
            <tbody>
                {results.map((e, idx) => (
                    <tr key={idx}>
                        <td>{e.class_idx}</td>
                        <td>{e.class_name}</td>
                        <td>{e.confidence.toFixed(4)}</td>
                    </tr>
                ))}
            </tbody>
        </SmallTable>
    );
};

ClassificationResult.propTypes = {
    results: PropTypes.array.isRequired,
};

export default ClassificationResult;
