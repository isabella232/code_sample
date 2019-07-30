import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemContainer from '../../containers/ItemContainer'
import FormItem from '../components/FormItem'

class EditPage extends Component {
    static = {
        prefix: PropTypes.string,
        history: PropTypes.object
    }

    render() {
        const { match: { params: { prefix, id } } } = this.props
        return (
            <ItemContainer
                key="item"
                schema="main"
                component={FormItem}
                itemId={id}
                prefix={prefix}
                {...this.props}
            />
        )
    }
}

export default EditPage
