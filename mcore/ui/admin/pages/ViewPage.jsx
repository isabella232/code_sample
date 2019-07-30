import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ItemContainer from '../../containers/ItemContainer'
import ItemView from '../components/ItemView'

class ViewPage extends Component {
    static = {
        prefix: PropTypes.string,
        history: PropTypes.object,
    }

    handleRemove = (id) => {
        if (confirm('Remove Item?')) {
            Meteor.call(`${this.props.prefix}.remove`, id, (error) => {
                if (error) {
                    toast.error(error.reason)
                } else {
                    const confirmation = i18n.__('remove success')
                    toast.success(confirmation)
                    this.props.history.push(`/admin/${this.props.prefix}`)
                }
            })
        }
    }

    render() {
        const { match: {params: {prefix, id}} } = this.props
        return (
            <ItemContainer
                key="item"
                component={ItemView}
                schema='view'
                itemId={id}
                prefix={prefix}
                {...this.props}
            />
        )
    }
}

export default ViewPage
