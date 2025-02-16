import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FailedPayment = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center p-4 shadow-lg">
        <Card.Body>
          <h2 className="text-danger">Payment Failed!</h2>
          <p>Something went wrong. Please try again.</p>
          <Button variant="danger" onClick={() => navigate("/")}>
            Try Again
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FailedPayment;
