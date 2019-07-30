import React, { Component } from 'react'
import connectField from 'uniforms/connectField'
import { RichTextEdit } from './RichTextEdit'

class ExtEdit extends Component {
    componentDidMount() {
        const {
            onChange,
            value
        } = this.props

        Meteor.call('texts.getText', value, (err, res) => {
            if (err) {
                throw new Meteor.Error(err)
            }
            onChange(res && res.text ? res.text : '')
        })
    }

    render() {
        return (
            <RichTextEdit {...this.props} />
        )
    }
}

export default connectField(ExtEdit)
