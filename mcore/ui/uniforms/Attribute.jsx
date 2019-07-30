import React from 'react'
import AutoField from 'uniforms-semantic/AutoField'
import connectField from 'uniforms/connectField'
import {
    Grid, Label, Form
} from 'semantic-ui-react'
import Attributes from '../../api/attributes'
import * as controls from './controls'

export default connectField(({ value: { attributeId } = {} }) => {
    const attribute = Attributes.findOne(attributeId) || { name: 'Unknown', params: {} }
    const { params: { paramsData = {}, paramsType = 'unknown' } } = attribute
    return (
        <Grid>
            <Grid.Column width={4}>
                <AutoField name="attributeId" />
            </Grid.Column>
            <Grid.Column width={8}>
                <AutoField
                    name="attributeValue"
                    attribute={attribute}
                    component={controls[paramsType]}
                    {...paramsData}
                />
            </Grid.Column>
            <Grid.Column width={4}>
                <Form.Field>
                    <Label.Group size="small">
                        <Label color="blue">{attribute.group}</Label>
                        <Label color="yellow">{paramsType}</Label>
                    </Label.Group>
                </Form.Field>
            </Grid.Column>
        </Grid>
    )
})
