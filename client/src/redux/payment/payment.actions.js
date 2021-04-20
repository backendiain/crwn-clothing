import PaymentActionTypes from './payment.types';

export const paymentStart = () => ({
    type: PaymentActionTypes.PAYMENT_START
});

export const paymentSuccess = response => ({
    type: PaymentActionTypes.PAYMENT_SUCCESS,
    payload: response
});

export const paymentFailure = error => ({
    type: PaymentActionTypes.PAYMENT_FAILURE,
    payload: error
});