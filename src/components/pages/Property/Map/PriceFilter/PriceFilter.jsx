import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const PriceFilter = () => {
    const [price, setPrice] = useState(50); // Default price range

    const handleChange = (event) => {
        const newPrice = Number(event.target.value);
        setPrice(newPrice);
        console.log("Selected Price Range:", newPrice);
    };

    return (
        <>
            <Row>
                <Col>
                    <Form.Label>Min: $0</Form.Label>
                </Col>
                <Col className="text-end">
                    <Form.Label>Max: $100</Form.Label>
                </Col>
            </Row>
            <Form.Range
                min={0}
                max={900}
                value={price}
                onChange={handleChange}
            />
        </>

    );
};

export default PriceFilter;
