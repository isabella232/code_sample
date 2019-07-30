import { Meteor } from 'meteor/meteor'
import React, { PureComponent, createElement } from 'react'
import { Counts } from 'meteor/ros:publish-counts'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'

class ListContainer extends PureComponent {
    static = {
        history: PropTypes.object,
        prefix: PropTypes.string,
        schema: PropTypes.string,
        groupContainer: PropTypes.any,
        query: PropTypes.object,
        params: PropTypes.object,
        loading: PropTypes.bool,
    }

    render() {
        const {
            items,
            schema,
            groupContainer,
            ...props
        } = this.props
        return schema ? createElement(
            groupContainer,
            {
                items: items || [],
                schema,
                ...props
            },
        ) : (
            <div className="ui red message">
                <h4 className="ui header">Error</h4>
                Collection and Scheme not defined
            </div>
        )
    }
}

const mapStateToProps = ({ core: { collections } }, { prefix }) => ({ collection: collections[prefix] })

export default compose(
    connect(mapStateToProps),
    withTracker((props) => {
        const {
            collection,
            prefix,
            query = {},
            params = {
                allSubcollections: true
            },
            schema,
        } = props
        const collectionHandle = Meteor.subscribe(`${prefix}.list`, query, params)
        Meteor.subscribe(`${prefix}.counts`, query)
        const loading = !collectionHandle.ready()
        const counts = Counts.get(`${prefix}.counts`)
        const list = !loading ? collection.list(query, params).fetch() : []

        return {
            loading,
            collection,
            counts,
            items: list,
            ...props,
            schema: collection && collection.getSchema ? collection.getSchema(schema) : false,
        }
    })
)(ListContainer)
