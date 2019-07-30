import React, { Fragment } from 'react'
import ListText from 'meteor/mcore/ui/uniforms/ListText'
import BaseListSchema from '../../collection/schemas/list'

const ListSchema = BaseListSchema
    .omit('alias')
    .extend({
        params: {
            type: String,
            label: 'Type / Group',
            uniforms: {
                component: ListText,
                transform(value) {
                    return (
                        <span style={{ fontWeight: this.findValue('isFilter') ? 'bold' : ''}}>
                            {value ? value.paramsType : JSON.stringify(value)}
                            /
                            {this.findValue('group')}
                        </span>
                    )
                },
            },
        },
        order: {
            type: Number,
            label: 'Order',
            uniforms: {
                component: ListText,
                sort: true
            }
        }
    })

export default ListSchema
