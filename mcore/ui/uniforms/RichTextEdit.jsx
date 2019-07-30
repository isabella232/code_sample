import React, { Component } from 'react'
import classnames from 'classnames'
import connectField from 'uniforms/connectField'
import filterDOMProps from 'uniforms/filterDOMProps'
import { Form, Label } from 'semantic-ui-react'
import { EDITOR_CONFIG } from '../../utils/constants'

class RichTextEdit extends Component {
    state = {
        CKEditor: undefined
    }

    componentDidMount() {
        import('react-ckeditor-component').then(({ default: CKEditor }) => {
            this.setState({ CKEditor })
        })
    }

    onChange = (evt) => {
        const newContent = evt.editor.getData()
        const { onChange } = this.props
        onChange(newContent)
    }

    render() {
        const {
            className,
            disabled,
            error,
            errorMessage,
            id,
            inputRef,
            label,
            name,
            placeholder,
            required,
            config = EDITOR_CONFIG,
            showInlineError,
            value,
            ...props
        } = this.props
        const { CKEditor } = this.state

        return (
            <Form.Field className={classnames(className, { disabled, error, required })} {...filterDOMProps(props)}>
                {label && <label htmlFor={id}>{label}</label>}
                {CKEditor ? (
                    <CKEditor
                        id={id}
                        name={name}
                        ref={inputRef}
                        config={config}
                        activeClass="p10"
                        content={value}
                        placeholder={placeholder}
                        events={{ change: this.onChange }}
                    />
                ) : (
                    <Form.TextArea defaultValue={value} />
                )}
                {!!(error && showInlineError) && <Label basic color="red" pointing>{errorMessage}</Label>}

            </Form.Field>
        )
    }
}

export { RichTextEdit }
export default connectField(RichTextEdit)
