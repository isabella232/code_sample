import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemContainer from '../../containers/ItemContainer'
// import { Link } from 'react-router-dom'
import FormItem from '../components/FormItem'

class NewPage extends Component {
    static = {
        history: PropTypes.object
    }

    render() {
        const { match: { params: { prefix } } } = this.props
        return (
            <ItemContainer
                key="item"
                schema="main"
                component={FormItem}
                prefix={prefix}
                {...this.props}
            />
        )
    }
}

export default NewPage
