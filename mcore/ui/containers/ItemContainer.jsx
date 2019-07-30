import { Meteor } from 'meteor/meteor'
import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { withTracker } from 'meteor/react-meteor-data'
import { Loader } from 'semantic-ui-react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

class ItemContainer extends PureComponent {
    static = {
        history: PropTypes.object,
        prefix: PropTypes.string,
        itemId: PropTypes.string,
        component: PropTypes.element,
        schema: PropTypes.string,
        loading: PropTypes.bool,
    }

    item = () => {
        if (this.state.collection) {
            return this.state.collection.findOne({
                _id: this.props.itemId
            })
        }
        return null
    }

    render() {
        const { loading, schema, component, collection: { modelTransform }, item, ...props } = this.props
        if (item) {
            props.model = item
        }
        return !loading ? schema ? createElement(
            component, {
                schema,
                modelTransform,
                ...props
            },
        ) : (
            <div className="ui red message">
                <h4 className="ui header">Error</h4>
                Collection and Scheme not defined
            </div>
        ) : <Loader active inline="centered" />
    }
}

const mapStateToProps = ({ core: { collections } }, { prefix }) => ({ collection: collections[prefix] })

export default compose(
    connect(mapStateToProps),
    withTracker((props) => {
        const { collection } = props
        const collectionHandle = Meteor.subscribe(`${props.prefix}.single`, props.itemId, { allSubcollections: true })
        const loading = !collectionHandle.ready()
        const item = !loading ? collection.findOne(props.itemId) : false
        const model = item && collection.transform ? collection.transform(item) : item
        return {
            loading,
            collection,
            item: model,
            ...props,
            schema: collection && collection.getSchema ? collection.getSchema(props.schema) : false
        }
    })
)(ItemContainer)
