import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    Button, Icon, Divider, Message
} from 'semantic-ui-react'
import ViewWrapper from './ViewWrapper'

class ItemView extends Component {
    render() {
        const { prefix, model, schema, parent } = this.props
        return model ? (
            <Fragment>
                <ViewWrapper {...{ model, schema }} parent={parent} />
                <Divider />
                <Button primary as="a" href={`/${prefix}/${model.alias ? model.alias : model._id}`} target="_blank">
                    <Icon name="globe" />
                    {i18n.__('View On Site')}
                </Button>
            </Fragment>
        ) : (
            <Message color="red">{i18n.__('Model not defined')}</Message>
        )
    }
}

ItemView.propTypes = {
    model   : PropTypes.object,
    schema  : PropTypes.object
}

export default ItemView
