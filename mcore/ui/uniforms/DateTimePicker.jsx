import React from 'react'
import classnames from 'classnames'
import connectField from 'uniforms/connectField'
import filterDOMProps from 'uniforms/filterDOMProps'

import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
// import displayFormat from '../../dateFormat'

const { dateFormat } = Meteor.settings.public

moment.locale('en')
momentLocalizer({
    firstOfWeek: () => 0
})

const formatsDefault = [
    'DD/MM/YYYY',
    'DD-MM-YYYY',
    'DD'
]
const dateFormatFunc = value => (value ? moment(new Date(value)).toDate() : undefined)

const dateParse = (timestamp, onChange) => {
    const date = new Date(timestamp)
    // const date = timestamp
    if (date.getFullYear() < 10000) {
        onChange(timestamp)
    } else if (isNaN(timestamp)) {
        onChange(undefined)
    }
}

const enterFormat = [
    `DD/MM/YYYY`,
    `DD.MM.YYYY`,
    `DD,MM,YYYY`,
    `DD-MM-YYYY`
]

const Date_ = ({
    className,
    disabled,
    error,
    errorMessage,
    icon,
    iconLeft,
    iconProps,
    id,
    inputRef,
    label,
    date,
    time,
    format,
    max,
    min,
    name,
    onChange,
    placeholder,
    culture = 'en-GB',
    parse = formatsDefault,
    required,
    showInlineError,
    value,
    wrapClassName,
    ...props
}) => <div className={classnames(className, { disabled, error, required }, 'field')} {...filterDOMProps(props)}>
    {label && ( <label htmlFor={id}> {label} </label> )}

    <div className={classnames('ui', wrapClassName, { left: iconLeft, icon: icon || iconLeft }, 'input')}>
        <DateTimePicker
            date={date}
            time={time}
            format={dateFormat}
            max={dateFormatFunc(max)}
            min={dateFormatFunc(min)}
            disabled={disabled}
            culture={culture}
            parse={parse}
            id={id}
            parse={enterFormat}
            placeholder={placeholder}
            ref={inputRef}
            onChange={value => dateParse(value, onChange)}
            name={name}
            value={dateFormatFunc(value)}/>
        {(icon || iconLeft) && (<i className={`${icon || iconLeft} icon`} {...iconProps}/>)}
    </div>

    {!!(error && showInlineError) && (
        <div className="ui red basic pointing label">
            {errorMessage}
        </div>
    )}
</div>

Date_.displayName = 'DateTimePicker'

export default connectField(Date_)
