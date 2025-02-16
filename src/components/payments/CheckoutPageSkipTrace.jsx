import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const CheckoutPageSkipTrace = () => {
    const stripePromise = loadStripe("pk_test_51Qpjy7JNMQb5bj6tBJFkNN0sVu8NclWAexFIJwGyPAn4lIsdOVNk4YEZdiQsb1P3ZF4KF6Zdgmdx4hpthkSwWfCr00SNt07knK");
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <Elements stripe={stripePromise}>
                <PaymentForm amount={99.99} />
            </Elements>
        </div>
    )
}

export default CheckoutPageSkipTrace