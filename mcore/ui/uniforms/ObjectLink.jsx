import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import connectField from 'uniforms/connectField'
import filterDOMProps from 'uniforms/filterDOMProps'
import { Form, Button } from 'semantic-ui-react'
import { EDITOR_CONFIG } from '../../utils/constants'

class RichTextEdit extends Component {
    state = {}

    render() {
        const {
            className,
            disabled,
            error,
            errorMessage,
            id,
            label,
            typeId = this.props.findValue('typeId'),
            name,
            required,
            showInlineError,
            value,
            ...props
        } = this.props

        return (
            <Form.Field className={classnames(className, { disabled, error, required })} {...filterDOMProps(props)}>

                <Button basic primary fluid size="large" as={Link} to={`/admin/${typeId}/${value}/edit`}>
                    {label && <label htmlFor={id}>{i18n.__(label)}</label>} {typeId}:{value}
                </Button>
                {!!(error && showInlineError) && <Label basic color="red" pointing>{errorMessage}</Label>}
            </Form.Field>
        )
    }
}

export default connectField(RichTextEdit)
