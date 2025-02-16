import React, { useState } from 'react';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
// import { CreditCard, Calendar, Lock } from 'lucide-react';
import './PaymentForm.css';
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from 'axios';
import { BASE_URL_AUTH } from '../../config/service';
import { useNavigate, useParams } from 'react-router-dom';


const PaymentForm = ({ amount }) => {
    const navigate = useNavigate()
    const {id} = useParams()
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [cardBrand, setCardBrand] = useState(null);
    const [cardComplete, setCardComplete] = useState({
        cardNumber: false,
        cardExpiry: false,
        cardCvc: false
    });

    const handleElementChange = (event, field) => {
        setCardComplete({
            ...cardComplete,
            [field]: event.complete
        });

        if (field === 'cardNumber') {
            // Update card brand when card number changes
            const brand = event.brand;
            setCardBrand(brand);
        }

        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
        }
    };


    // Shared properties for all card brand icons
    const iconProps = {
        width: "40",
        height: "24",
        className: "card-brand-icon"
    };

    // Function to get card brand icon
    const getCardBrandIcon = () => {
        switch (cardBrand) {
            case 'visa':
                return (
                    <svg {...iconProps} viewBox="0 0 40 24">
                        <rect width="40" height="24" fill="#fff" rx="4" />
                        <path
                            fill="#172B85"
                            d="M15.4 14.3l1.2-7.3h1.9l-1.2 7.3h-1.9zm8.9-7.1c-.4-.2-.9-.2-1.4-.2-1.5 0-2.6.8-2.6 1.9 0 .8.8 1.3 1.4 1.6.6.3.8.5.8.7 0 .4-.5.6-.9.6-.6 0-1.1-.1-1.7-.4l-.2-.1-.3 1.8c.5.2 1.4.4 2.3.4 2.2 0 3.6-.8 3.6-2 0-.7-.4-1.2-1.4-1.6-.6-.3-.9-.5-.9-.7 0-.2.3-.5.9-.5.5 0 .9.1 1.2.2l.1.1.4-1.8zm4.1-.2h-1.5c-.5 0-.8.1-1 .7l-2.9 6.6h2.1l.4-1.1h2.5c.1.3.2.7.2 1.1h1.8l-1.6-7.3zm-2.2 4.7l.8-2c0 .1.1-.2.2-.4l.1.3.5 2.1h-1.6zm-14.9-4.7l-2 5.1-.2-.9c-.4-1.3-1.6-2.7-2.9-3.4l1.9 6.6h2.2l3.3-7.3h-2.2z" />
                        <path
                            fill="#F7B600"
                            d="M7.4 7.1H4.1L4 7.3c2.5.6 4.2 2.1 4.9 3.9l-.7-3.4c-.1-.5-.5-.7-1-.7" />
                    </svg>
                );
            case 'mastercard':
                return (
                    <svg {...iconProps} viewBox="0 0 40 24">
                        <path d="M15.322 4.91A8.59 8.59 0 0 0 11.5 12c0 2.825 1.363 5.344 3.474 6.923A8.59 8.59 0 0 0 18.8 12a8.59 8.59 0 0 0-3.478-7.09z" fill="#FF5F00" />
                        <path d="M15.322 4.91A8.59 8.59 0 0 0 11.5 12c0 2.825 1.363 5.344 3.474 6.923A8.59 8.59 0 0 0 18.8 12a8.59 8.59 0 0 0-3.478-7.09" fill="#FF5F00" />
                        <path d="M23.827 18.923A8.595 8.595 0 0 0 27.3 12a8.595 8.595 0 0 0-3.473-6.923A8.59 8.59 0 0 0 20 4.91a8.59 8.59 0 0 0-3.478 7.09 8.59 8.59 0 0 0 3.478 7.09 8.59 8.59 0 0 0 3.827-.167z" fill="#EB001B" />
                        <path d="M23.827 18.923A8.595 8.595 0 0 0 27.3 12a8.595 8.595 0 0 0-3.473-6.923A8.59 8.59 0 0 0 20 4.91v14.18a8.59 8.59 0 0 0 3.827-.167z" fill="#F79E1B" />
                    </svg>
                );
            case 'amex':
                return (
                    <svg {...iconProps} viewBox="0 0 40 24" fill="#006FCF">
                        <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6zM11.5 15l-2-5-2 5h4zm13-5l-1.5 5h-2L19.5 10h2zm-7 5h4l-2-5-2 5z" />
                    </svg>
                );
            case 'discover':
                return (
                    <svg {...iconProps} viewBox="0 0 40 24" fill="#FF6B00">
                        <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6zM25.5 12c0-2.28-1.867-4-4.167-4H13.5v8h7.833c2.3 0 4.167-1.72 4.167-4z" />
                    </svg>
                );
            case 'diners':
                return (
                    <svg {...iconProps} viewBox="0 0 40 24" fill="#0079BE">
                        <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6zM20 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
                    </svg>
                );
            case 'jcb':
                return (
                    <svg {...iconProps} viewBox="0 0 40 24" fill="#0B4EA2">
                        <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6zM11.5 8h-3v8h3c2.2 0 4-1.8 4-4s-1.8-4-4-4zm8 0h-3v8h3c2.2 0 4-1.8 4-4s-1.8-4-4-4zm8 0h-3v8h3c2.2 0 4-1.8 4-4s-1.8-4-4-4z" />
                    </svg>
                );
            default:
                return <BsCreditCard2FrontFill size={24} className="text-muted" />;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.log('Stripe or elements not initialized');
            return;
        }

        setProcessing(true);
        setError(null); // Clear any previous errors

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

        try {
            // 1. Create PaymentIntent
            const response = await axios.post(`${BASE_URL_AUTH}/create-payment-intent`,
                { amount },
                { headers }
            );

            const { clientSecret } = response.data;
            console.log('Client Secret received:', clientSecret);

            if (!clientSecret) {
                throw new Error('No client secret received from the server');
            }

            // 2. Confirm the payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        // Add billing details if needed
                        // name: 'Jenny Rosen',
                    },
                }
            });

            console.log('Payment confirmation result:', result);

            if (result.error) {
                // Handle error from Stripe
                console.error('Stripe error:', result.error);
                setError(result.error.message || 'Payment failed');
                setProcessing(false);
            } else {
                // Payment successful
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded:', result.paymentIntent);
                    setSucceeded(true);
                    // You might want to call your backend here to update the order status
                    const response = await axios.post(`${BASE_URL_AUTH}/payment-success`, {
                        paymentIntentId: result.paymentIntent.id
                    }, { headers });

                    if(response.data?.status === "success"){
                        window.location.href = `/dashboard/display-details/${id}`
                    }
                }
                setProcessing(false);
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError(err.message || 'An error occurred while processing your payment.');
            setProcessing(false);
        }
    };

    const inputStyle = {
        base: {
            fontSize: '16px',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            color: '#495057',
            '::placeholder': {
                color: '#6c757d',
            },
        },
        invalid: {
            color: '#dc3545',
        },
    };

    return (
        <Container className="payment-container">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div className="payment-card">
                        <div className="payment-header">
                            <h2>Payment Details</h2>
                            <p className="amount-text">Amount to pay: ${amount}</p>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label className="d-flex align-items-center">
                                    <BsCreditCard2FrontFill size={18} className="me-2" />
                                    Card Number
                                </Form.Label>
                                <div className={`stripe-element-container ${error ? 'is-invalid' : ''} ${cardComplete.cardNumber ? 'is-valid' : ''}`}>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <CardNumberElement
                                                options={{ style: inputStyle }}
                                                onChange={(e) => handleElementChange(e, 'cardNumber')}
                                                className="stripe-element"
                                            />
                                        </div>
                                        <div className="card-brand-container">
                                            {getCardBrandIcon()}
                                        </div>
                                    </div>
                                </div>
                                {error && <div className="invalid-feedback d-block">{error}</div>}
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="d-flex align-items-center">
                                            <FaCalendarAlt size={18} className="me-2" />
                                            Expiry Date
                                        </Form.Label>
                                        <div className="stripe-element-container">
                                            <CardExpiryElement
                                                options={{ style: inputStyle }}
                                                onChange={(e) => handleElementChange(e, 'cardExpiry')}
                                                className="stripe-element"
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="d-flex align-items-center">
                                            <FaLock size={18} className="me-2" />
                                            CVC
                                        </Form.Label>
                                        <div className="stripe-element-container">
                                            <CardCvcElement
                                                options={{ style: inputStyle }}
                                                onChange={(e) => handleElementChange(e, 'cardCvc')}
                                                className="stripe-element"
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {error && (
                                <Alert variant="danger" className="mb-4">
                                    {error}
                                </Alert>
                            )}

                            {succeeded && (
                                <Alert variant="success" className="mb-4">
                                    Payment processed successfully!
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100 payment-button"
                                disabled={
                                    !stripe ||
                                    processing ||
                                    succeeded ||
                                    !Object.values(cardComplete).every(Boolean)
                                }
                            >
                                {processing ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Processing...
                                    </>
                                ) : (
                                    `Pay $${amount}`
                                )}
                            </Button>

                            <div className="security-notice">
                                <FaLock size={14} className="me-1" />
                                Payments are secure and encrypted
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentForm;