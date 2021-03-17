import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import CollectionPageContainer from '../collection/collection.container';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

class ShopPage extends React.Component{
    render() { 
        const { match } = this.props;

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} 
                    component={CollectionsOverviewContainer} />
                
                <Route path={`${match.path}/:collectionId`} 
                    component={CollectionPageContainer} />
            </div>
        )
    }
    
    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
    }
    
    componentWillUnmount() {
        // Unsubscribe per the Observer pattern
        // this.unsubscribeFromSnapshot();
    }
    
}

const mapDispatchToProps = () => dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(
    null, 
    mapDispatchToProps
)(ShopPage);