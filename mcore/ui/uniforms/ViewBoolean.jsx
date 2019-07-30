import React from 'react'
import { Grid } from 'semantic-ui-react'
import connectField from 'uniforms/connectField'

const ViewBoolean = ({ id, name, value }) => (
    <Grid.Row id={id}>
        <Grid.Column width={3}>{name && <label htmlFor={id}>{name}: </label>}</Grid.Column>
        <Grid.Column width={13}>{i18n.__(value ? 'Yes' : 'No')}</Grid.Column>
    </Grid.Row>
)

export default connectField(ViewBoolean)
