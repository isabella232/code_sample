import React, {createElement} from 'react'
import connectField from 'uniforms/connectField'
import { Grid } from 'semantic-ui-react'

const ViewText = (props) => {
    let {
        value,
    } = props
    const {
        id,
        tag,
        label,
        colWidth = 13,
        transform,
    } = props


    value = typeof (transform) === 'function' ? transform(value) : value
    const offsetCol = (16 - colWidth > 0) ? { width: 16 - colWidth } : {}

    return (
        <Grid.Row id={id}>
            <Grid.Column {...offsetCol}>{label && <label htmlFor={id}>{label}: </label>}</Grid.Column>
            <Grid.Column width={colWidth}>{tag ? createElement(tag, { children: [value] }) : value}</Grid.Column>
        </Grid.Row>
    )
}

export default connectField(ViewText)
