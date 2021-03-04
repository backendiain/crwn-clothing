import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{

    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    render() { 
        const { match } = this.props;
        const { loading } = this.state;

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} 
                    render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
                
                <Route path={`${match.path}/:collectionId`} 
                    render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
            </div>
        )
    }
    
    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');
        
        // Get our collections from firebase using the Observer pattern
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     console.log(snapshot);
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     console.log(collectionsMap);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });

        // get collections with promises and firebase
        collectionRef.get().then(snapshot => {
            console.log(snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            console.log(collectionsMap);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });

        // Or via native fetch
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-project-clothing/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections));
    }
    
    componentWillUnmount() {
        // Unsubscribe per the Observer pattern
        // this.unsubscribeFromSnapshot();
    }
    
}

const mapDispatchToProps = () => dispatch => ({
    updateCollections: collectionsMap => 
        dispatch(updateCollections(collectionsMap))
});

export default connect(
    null, 
    mapDispatchToProps
)(ShopPage);