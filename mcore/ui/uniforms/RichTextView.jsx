import React, { createElement } from 'react'
import connectField from 'uniforms/connectField'
import { Grid } from 'semantic-ui-react'

const RichTextView = (props) => {
    const {
        id,
        name,
        tag,
        label,
        colWidth = 13,
        value,
        transform
    } = props

    const content = typeof (transform) === 'function' ? transform(value) : value
    const offsetCol = (16 - colWidth > 0) ? { width: 16 - colWidth } : {}
    return (
        <Grid.Row id={id}>
            <Grid.Column {...offsetCol}>{label && <label htmlFor={id}>{label}: </label>}</Grid.Column>
            <Grid.Column width={colWidth}>{tag ? createElement(tag, { id, name, dangerouslySetInnerHTML: { __html: content } }) : <div dangerouslySetInnerHTML={{ __html: content }} />}</Grid.Column>
        </Grid.Row>
    )

}

export default connectField(RichTextView)
