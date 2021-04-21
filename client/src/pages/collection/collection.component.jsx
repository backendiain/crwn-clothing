import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';
import Spinner from '../../components/spinner/spinner.component';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
    if(collection) {
        const {title, items} = collection;

        return(
            <div className="collection-page">
                <h2 className="title">{title}</h2>
        
                <div className="items">
                    {
                        items.map(item => (
                            <CollectionItem key={item.id} item={item} />
                            )
                        )
                    }
                </div>
            </div>
        );
    }

    return <Spinner />;
};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);