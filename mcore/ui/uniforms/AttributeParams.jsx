import React, { Component } from 'react'
import AutoField from 'uniforms-semantic/AutoField'
import connectField from 'uniforms/connectField'
import { Grid } from 'semantic-ui-react'
import * as attributesSchemes from '../../api/attributes/schemas/controls'
import ViewWrapper from '../admin/components/ViewWrapper'

class AttributeParams extends Component {
    changeParams = (params) => {
        const { value = {}, onChange } = this.props
        value.paramsData = params
        onChange(value)
    }

    render() {
        const { value = {} } = this.props
        const { paramsType, paramsData = {} } = value
        const schema = attributesSchemes[paramsType]
        const cleanData = schema ? schema.clean(paramsData) : paramsData

        return (
            <Grid className="fields">
                <Grid.Column width={4}>
                    <AutoField name="paramsType" />
                </Grid.Column>
                <Grid.Column width={12}>
                    {schema ? <ViewWrapper schema={schema} onChangeModel={this.changeParams} model={cleanData} /> : null}
                </Grid.Column>
            </Grid>
        )
    }
}

export default connectField(AttributeParams)
