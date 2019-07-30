import React from 'react'
import AutoField from 'uniforms-semantic/AutoField'
import AutoForm from 'uniforms-semantic/AutoForm'
import { Grid } from 'semantic-ui-react'

export default class ViewWrapper extends AutoForm {
    render() {
        const { parent, ...nativeFormProps } = this.getNativeFormProps()
        return (
            <Grid {...nativeFormProps}>
                {this.getChildContextSchema().getSubfields().map(
                    (key, index) => <AutoField key={ index } name={key} parent={parent} />
                )}
            </Grid>
        )
    }
}
