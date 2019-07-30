import React, { Component } from 'react'
import { Form, Message } from 'semantic-ui-react'

class UnknownControl extends Component {
    static publicName = 'Unknown'
    render() {
        const { attribute, comment, value } = this.props
        return comment ? (
            <Form.Field>
                <Message
                    info
                    size="small"
                    content={comment}
                />
            </Form.Field>
        ) : null
    }
}

export default UnknownControl
