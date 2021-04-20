import { all, call, takeLatest, put } from 'redux-saga/effects';
import PaymentActionTypes from './payment.types';
import { clearCart } from '../cart/cart.actions';

export function* clearCartOnPaymentSuccess() {
    yield put(clearCart());
}

export function* onPaymentSuccess() {
    yield takeLatest(PaymentActionTypes.PAYMENT_SUCCESS, clearCartOnPaymentSuccess);
}

export function* paymentSagas() {
    yield(
        all(
            [
            call(onPaymentSuccess)
        ])
    )
}