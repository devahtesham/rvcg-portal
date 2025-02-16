import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { MdImageSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
    const navigate = useNavigate();

    const skipTrace = () => {

    }
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="text-center p-4 shadow-lg">
                <Card.Body>
                    <h2 className="text-success">Payment Successful!</h2>
                    <p>Your payment has been processed successfully.</p>
                    <div className="d-flex justify-content-center">
                    <button onClick={skipTrace} className='btn btn-success fw-500 d-flex gap-1'><MdImageSearch size={22} /> Proceed To Skip Trace</button>

                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SuccessPayment;
