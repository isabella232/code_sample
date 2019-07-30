import React from 'react'
import classnames from 'classnames'
import connectField from 'uniforms/connectField'
import filterDOMProps from 'uniforms/filterDOMProps'
import { TextArea } from 'semantic-ui-react'

const LongText = ({
  className,
  disabled,
  error,
  errorMessage,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  required,
  showInlineError,
  value,
  ...props
}) => (
  <div className={classnames(className, { disabled, error, required }, 'field')} {...filterDOMProps(props)}>
    {label && <label htmlFor={id}>{label}</label>}

    <TextArea
      autoHeight
      id={id}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e, { value }) => onChange(value)}
      ref={inputRef}
      value={value}
    />

    {!!(error && showInlineError) && <div className='ui red basic pointing label'>{errorMessage}</div>}
  </div>
)

export default connectField(LongText)
