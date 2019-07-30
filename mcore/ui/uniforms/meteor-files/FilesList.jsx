import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import extend from 'lodash/extend'
import Files from '../../../api/files'

class FilesList extends Component {
    componentWillUnmount() {
        this.props.collectionHandle.stop()
    }

    render() {
        const {
            container,
            containerProps,
            handleRemove,
            list,
            component,
            cardProps
        } = this.props

        return list.length ? React.createElement(container, containerProps, list.map(({
            name, size, type, _id
        }, key) => {
            const link = Files.findOne(_id).link()
            const elementProps = extend({}, {
                key: `file${key}`,
                uuid: _id,
                fileName: name,
                fileUrl: link,
                fileId: _id,
                fileSize: size,
                fileType: type,
                handleRemove
            }, cardProps)
            return React.createElement(component, elementProps)
        })) : null
    }
}

export default withTracker((props) => {
    const {
        query = {},
        params = { }
    } = props
    if (params.limit) {
        if (!isNaN(params.limit)) {
            params.limit = parseInt(params.limit, 10)
        } else {
            params.limit = 999999
        }
    }
    if (!params.sort) {
        params.sort = { 'meta.uploadedAt': -1 }
    }
    const collectionHandle = Meteor.subscribe('files.list', query, params)
    const loading = !collectionHandle.ready()
    const list = Files.find(query, params).fetch()
    return extend({ loading, list, collectionHandle }, props)
})(FilesList)
