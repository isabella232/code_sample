import React from 'react'
import { Grid } from 'semantic-ui-react'
import connectField from 'uniforms/connectField'

const ViewArray = (props) => {
    let {id, name, label, value, fieldName} = props
    if (typeof props.listItemLabel === 'function') {
        value = props.listItemLabel(value)
    }

    return (
        <Grid.Row id={id}>
            <Grid.Column width={3}>{label && (
                <label htmlFor={id}>
                    {label}:
                </label>
            )}</Grid.Column>
            <Grid.Column width={13}>
                {value.map((item, index) => (
                    <li key={index}>
                        {fieldName
                            ? item[fieldName]
                            : item}
                    </li>
                ))}
            </Grid.Column>
        </Grid.Row>
    )
}

export default connectField(ViewArray)
