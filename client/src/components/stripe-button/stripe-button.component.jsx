import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import { paymentStart, paymentFailure, paymentSuccess } from '../../redux/payment/payment.actions';

const StripeCheckoutButton = ({ price, paymentStart, paymentFailure, paymentSuccess }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51IO4ktDfyI74KcXisWnBf89wCfgFOpVPJ2aAVGMxKB4KM0n6ioztWr1rB6Mn6l9JYG7cTKQr1LtHBQfQyZchNesv00jFEewIdL";

    const onToken = token => {
        paymentStart();
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
            paymentSuccess(response);
        })
        .catch(error => {
            console.error('Payment error:', error);
            alert(
                'There was an inssue with your payment. Please make sure you use the provided credit card.'
            );
            paymentFailure(error);
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

const mapDispatchToProps = dispatch => ({
    paymentStart: () => dispatch(paymentStart()),
    paymentFailure: (response) => dispatch(paymentFailure(response)),
    paymentSuccess: (error) => dispatch(paymentSuccess(error))
})

export default connect(
    null, 
    mapDispatchToProps
)(StripeCheckoutButton);