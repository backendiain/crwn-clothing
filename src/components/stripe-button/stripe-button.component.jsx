import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = (token) => {
    console.log(token);
    alert("Payment successful!")
}

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51IO4ktDfyI74KcXisWnBf89wCfgFOpVPJ2aAVGMxKB4KM0n6ioztWr1rB6Mn6l9JYG7cTKQr1LtHBQfQyZchNesv00jFEewIdL";

    return (
        <StripeCheckout 
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;