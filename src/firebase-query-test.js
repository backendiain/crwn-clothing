import firebase from './firebase/firebase.utils';
import 'firebase/firestore';

const firestore = firebase.firestore();

// example firestore query
firestore.collection('users').doc('foobar').collection('cartItems').doc('barfoo');

// specific doc query, equivalent to above
firestore.doc('/users/foobar/cartItems/barfoo');

// get collection
firestore.collection('/users/foobar/cartItems/barfoo');