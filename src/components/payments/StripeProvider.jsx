import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51Qpjy7JNMQb5bj6tBJFkNN0sVu8NclWAexFIJwGyPAn4lIsdOVNk4YEZdiQsb1P3ZF4KF6Zdgmdx4hpthkSwWfCr00SNt07knK");

export const StripeProvider = ({ children }) => (
    <Elements stripe={stripePromise}>
        {children}
    </Elements>
);