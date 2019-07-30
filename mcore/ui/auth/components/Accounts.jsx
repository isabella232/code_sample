import React from 'react'
import { Accounts, STATES } from 'meteor/std:accounts-ui'
import isObject from 'lodash/isObject'
import filter from 'lodash/filter'
import { List, Ref, Message, Form, Button, Label } from 'semantic-ui-react'

class _Form extends Accounts.ui.Form {
    render() {
        const {
            // hasPasswordService,
            oauthServices,
            fields,
            buttons,
            // error,
            message,
            messages,
            ready = true,
            className,
            formState
        } = this.props
        return (
            <Ref innerRef={node => this.form = node}>
                <Form
                    className={[className, ready ? 'ready' : null, 'accounts-ui'].join(' ')}
                    noValidate
                >
                    <Accounts.ui.Fields fields={fields} />
                    <Accounts.ui.Buttons buttons={buttons} />
                    <Accounts.ui.PasswordOrService oauthServices={oauthServices} />
                    <Accounts.ui.SocialButtons oauthServices={oauthServices} />
                    <Accounts.ui.FormMessages messages={messages} />
                </Form>
            </Ref>
        )
    }
}

class _Buttons extends Accounts.ui.Buttons {
    render() {
        const { buttons = {}, className = 'buttons' } = this.props

        return (
            <Form.Field className={className}>

                {filter({ ...buttons }, ({ type }) => type !== 'link').map((button, key) => (
                    <Accounts.ui.Button {...{ ...button, fluid: true }} key={ key } />
                ))}
                <Message>
                    <List divided horizontal link>
                        {filter({ ...buttons }, ({ type }) => type === 'link').map((button, key) => (
                            <Accounts.ui.Button key={key} {...{ ...button, className: 'item', role: 'listitem' }} />
                        ))}
                    </List>
                </Message>
            </Form.Field>
        )
    }
}

class _Button extends Accounts.ui.Button {
    render() {
        const {
            label,
            href = null,
            type,
            disabled = false,
            onClick,
            className,
            icon,
        } = this.props
        return type == 'link' ? (
            <a
                href={href}
                style={{ cursor: 'pointer' }}
                className={className}
                onClick={onClick}
            >
                {icon ? (<i className={['ui icon ', icon].join(' ')} />) : null}{ icon ? ' | ' : ''}{ label }
            </a>
        ) : (
            <Button
                className={[type === 'submit' ? 'primary' : '', disabled ? 'disabled' : '', className].join(' ')}
                type={type}
                disabled={disabled}
                onClick={onClick}
            >
                {icon ? (<i className={['ui icon ', icon].join(' ')} />) : null}{ icon ? ' | ' : '' }{ label }
            </Button>
        )
    }
}

class _Fields extends Accounts.ui.Fields {
    render() {
        let { fields = {}, className = '' } = this.props
        return Object.keys(fields).map((id) => <Accounts.ui.Field {...fields[id]} key={id} />)
    }
}

class _Field extends Accounts.ui.Field {
    render() {
        const {
            id,
            hint,
            label,
            type = 'text',
            onChange,
            message = '',
            required = false,
            className,
            defaultValue = ""
        } = this.props
        const { mount = true } = this.state
        return mount ? (
            <Form.Field className={[className, 'floating-label', required ? "required" : ""].join(' ')}>
                <input
                    id={id}
                    className="form-control"
                    name={id}
                    type={type}
                    ref={node => this.input = node}
                    autoCapitalize={type === 'email' ? 'none' : 'false'}
                    autoCorrect="off"
                    onChange={onChange}
                    defaultValue={defaultValue}
                    required={required ? 'required' : ''}
                />
                <label htmlFor={id}>{label || hint}</label>
                <Accounts.ui.FormMessage message={message} />
            </Form.Field>
        ) : null
    }
}
class _PasswordOrService extends Accounts.ui.PasswordOrService {
    render() {
        let { className, style = {} } = this.props
        let { hasPasswordService, services } = this.state
        let labels = services
        if (services.length > 2) {
            labels = []
        }

        if (hasPasswordService && services.length > 0) {
            return (
                <Form.Group>
                    <div className="or-sep">
                        <p style={style} className={className}>
                            {`${i18n.__('or use')} ${labels.join(' / ')}`}
                        </p>
                    </div>
                </Form.Group>
            )
        }
        return null
    }
}
class _FormMessages extends Accounts.ui.FormMessages {
    render() {
        const { messages = [], className = 'messages', style = {} } = this.props
        return messages.length > 0 && (
            <div className={className} style={style}>
                {messages
                    .filter(message => !('field' in message))
                    .map(({ message, type }, i) => (
                        <Accounts.ui.FormMessage
                            message={message}
                            type={type}
                            pointing={false}
                            key={i}
                        />
                    ) )}
            </div>
        )
    }
}

class _SocialButtons extends Accounts.ui.SocialButtons {
    render() {
        let { oauthServices = {}, className = "social-buttons" } = this.props

        if (Object.keys(oauthServices).length > 0) {
            return (
                <Form.Group>
                    <div className={[className].join(' ')}>
                        {Object.keys(oauthServices).map((id, i) => {
                            var mapObj = {
                                google: "google-plus",
                                "meteor-developer": ""
                            }
                            let serviceClass = id.replace(/google|meteor\-developer/gi, (matched) => {
                                return mapObj[matched]
                            })

                            return (
                                <Accounts.ui.Button
                                    key={i}
                                    {...oauthServices[id]}
                                    className={serviceClass.length > 0 ? `btn-social btn-${serviceClass}` : ''}
                                    icon={serviceClass.length > 0 ? `fa-${serviceClass}` : ''} />
                            )
                        })}
                    </div>
                </Form.Group>
            )
        } else {
            return null
        }
    }
}
class _FormMessage extends Accounts.ui.FormMessage {
    render() {
        let {
            message,
            type,
            pointing = true,
            className = "small",
            style = {},
            deprecated
        } = this.props
        message = isObject(message) ? message.message : message // If message is object, then try to get message from it
        return message ? (
            <Label
                basic
                color='red'
                pointing={pointing}
                className={[className, type].join(' ')}
                style={style}
            >
                {message}
            </Label>
        ) : null
    }
}
// Notice! Accounts.ui.LoginForm manages all state logic at the moment, so avoid
// overwriting this one, but have a look at it and learn how it works. And pull
// requests altering how that works are welcome.

// Alter provided default unstyled UI.
Accounts.ui.Form = _Form
Accounts.ui.Buttons = _Buttons
Accounts.ui.Button = _Button
Accounts.ui.Fields = _Fields
Accounts.ui.Field = _Field
Accounts.ui.PasswordOrService = _PasswordOrService
Accounts.ui.SocialButtons = _SocialButtons
Accounts.ui.FormMessage = _FormMessage
Accounts.ui.FormMessages = _FormMessages

// Export the themed version.
export { Accounts, STATES }
export default Accounts
