import React from 'react'
import connectField from 'uniforms/connectField'

const ListArray = (props) => {
    let {id, name, label, value} = props
    // if (typeof(props.listItemLabel) === 'function') {   value =
    // props.listItemLabel(value) }
    return (
        <div id={id}>
            <label htmlFor={id}>
                {label}
                Elements:
            </label>
            {value.length}
        </div>
    )
}

export default connectField(ListArray)
