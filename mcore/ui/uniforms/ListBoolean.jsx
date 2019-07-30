import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import connectField from 'uniforms/connectField'
import { closestByTag } from 'meteor/mcore/utils'

class ListBoolean extends Component {
    static = {
        id: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.bool,
    }

    componentDidMount() {
        const { value, state } = this.props
        if (state) {
            const trEl = closestByTag(this.item, 'tr')
            if (trEl) {
                trEl.classList[value ? 'remove' : 'add']('disabled')
            }
        }
    }

    render() {
        const {
            id,
            label,
            name,
            value
        } = this.props
        return (
            <div id={id} ref={(item) => (this.item = item)}>
                {label && <label htmlFor={id}>{label}: </label>}
                {value ? <Label basic color="green">{i18n.__('Yes')}</Label> : <Label basic color="red">{i18n.__('No')}</Label>}
            </div>
        )
    }
}

export default connectField(ListBoolean)
