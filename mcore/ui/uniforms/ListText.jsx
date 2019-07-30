import React from 'react'
import connectField from 'uniforms/connectField'

const ListText = (props) => {
    const { id, name, label, value, transform} = props
    let tValue = value
    if (typeof(props.transform) === 'function') {
        tValue = props.transform(value)
    }
    return (
        <div id={id}>
            {label && <label htmlFor={id}>{label}: </label>}
            {tValue}
        </div>
    )
}

export default connectField(ListText)
