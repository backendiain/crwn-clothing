import PaymentActionTypes from './payment.types';

const INITIAL_STATE = {
    success: {},
    error: {}
};

const paymentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentActionTypes.PAYMENT_START:
            return {
                ...state,
                success: {},
                error: {}
            }      

        case PaymentActionTypes.PAYMENT_SUCCESS:
            return {
                ...state,
                success: action.payload,
                error: {}
            }            
            
        case PaymentActionTypes.PAYMENT_FAILURE:
            return {
                ...state,
                success: {},
                error: action.payload
            }

        default:
            return state;
    }
}

export default paymentReducer;