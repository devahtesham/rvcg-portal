import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { MAIN_HEADINGS } from "../../../../data";
import { useLocation } from "react-router-dom";
import { errorNotify } from "../../../../Toastify/Toastify";

const ARVCalculator = () => {
    const [purchasePrice, setPurchasePrice] = useState("");
    const [repairCosts, setRepairCosts] = useState("");
    const [arv, setArv] = useState(null);

    const { pathname } = useLocation();

    const calculateARV = () => {
        if (!purchasePrice || !repairCosts) {
            errorNotify("Both fields are required to Calculate ARV.");
            setArv(null);
            return;
        }
        const arvValue = parseFloat(purchasePrice) + parseFloat(repairCosts);
        setArv(arvValue);
    };

    return (
        <Row className="justify-content-center mt-5">
            <Col lg={6}>
                <Card className="p-4 mb-4">
                    <div className="d-flex">
                        <h2 className="mb-4">{MAIN_HEADINGS[pathname]}</h2>
                    </div>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Purchase Price ($)</Form.Label>
                            <Form.Control
                                type="number"
                                value={purchasePrice}
                                onChange={(e) => setPurchasePrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Repair Costs ($)</Form.Label>
                            <Form.Control
                                type="number"
                                value={repairCosts}
                                onChange={(e) => setRepairCosts(e.target.value)}
                            />
                        </Form.Group>

                        <Button className="btn-main-clr text-white my-2" onClick={calculateARV}>
                            Calculate ARV
                        </Button>
                    </Form>

                    {arv !== null && (
                        <h4 className="mt-3 text-end">${arv.toLocaleString()}</h4>
                    )}
                </Card>
            </Col>
        </Row>
    );
}

export default ARVCalculator


