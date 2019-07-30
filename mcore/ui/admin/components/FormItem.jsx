import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import AutoForm from 'uniforms-semantic/AutoForm'
import SubmitField from 'uniforms-semantic/SubmitField'
import { toast } from 'react-toastify'
import HelmetHead from '../../components/HelmetHead'

class FormItem extends Component {
    static = {
        history: PropTypes.object,
        prefix: PropTypes.string,
        model: PropTypes.object,
        schema: PropTypes.object,
    }

    handleSave = (error, response) => {
        const {
            returnPath,
            history,
            model,
            itemId,
            prefix
        } = this.props

        if (error) {
            toast.error(error.reason)
        } else {
            const confirmation = response.insertedId ? 'success insert' : 'success update'
            toast.success(i18n.__(confirmation))
            // this.formItem.reset() /** @todo possible need to remove  for fix error on new Directory save */
            if (returnPath) {
                history.push(returnPath)
            } else {
                const resId = response.insertedId || (model ? model._id : itemId)
                if (resId) {
                    history.push(`/admin/${prefix}/${resId}`)
                } else {
                    toast.error(i18n.__('ErrorOnSave'))
                    history.push(`/admin/${prefix}`)
                }
            }
        }
    }

    handleSubmit = (doc) => {
        Meteor.call(`${this.props.prefix}.upsert`, doc, this.handleSave)
    }

    render() {
        const {
            model,
            schema,
            modelTransform,
            submitField,
            customSubmit,
            prefix
        } = this.props
        let customProps = {
            model,
            schema,
            modelTransform: model ? modelTransform : null,
            onSubmit: customSubmit ? customSubmit : this.handleSubmit
        }

        if (submitField) {
            customProps.submitField = submitField
        } else {
            customProps.submitField = () => (
                <Button.Group fluid>
                    <SubmitField className="primary" value={i18n.__('Submit')} style={{ width: 'auto', flexGrow: 1 }} />
                    <Button basic onClick={() => this.form.reset()} style={{ flexGrow: 0 }}>{i18n.__('Reset')}</Button>
                </Button.Group>
            )
        }
        return (
            <div>
                <HelmetHead title={`${model ? `${i18n.__('Edit')} ${model.title} | ${prefix}` : `${i18n.__('New')} ${prefix}`} | ${i18n.__('Admin')}`} />
                <AutoForm ref={node => this.form = node} {...customProps} />
            </div>
        )
    }
}

export default FormItem
