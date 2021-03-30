import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51IO4ktDfyI74KcXisWnBf89wCfgFOpVPJ2aAVGMxKB4KM0n6ioztWr1rB6Mn6l9JYG7cTKQr1LtHBQfQyZchNesv00jFEewIdL";

    const onToken = token => {
        console.log(token);
        
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        })
        .then(response => {
            console.log(response);
            alert('Payment successful');
        })
        .catch(error => {
            console.error(`Payment error: ${JSON.parse(error)}`);
            alert(
                'There was an inssue with your payment. Please make sure you use the provided credit card.'
            );
        });
    }

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