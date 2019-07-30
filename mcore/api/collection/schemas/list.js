import React from 'react'
import SimpleSchema from 'simpl-schema'
import { Link } from 'react-router-dom'
import uniforms from 'uniforms-semantic'
import ListBoolean from '../../../ui/uniforms/ListBoolean'
import ListText from '../../../ui/uniforms/ListText'

const ListSchema = new SimpleSchema({
    alias: {
        type: String,
        label: 'Alias',
        uniforms: {
            component: ListText,
            filter: true,
            sort: true,
            width: '4',
        },
    },
    title: {
        type: String,
        label: 'Title',
        uniforms: {
            component: ListText,
            filter: true,
            sort: true,
            width: '5',
            transform(value) {
                const id = this.findValue('_id')
                return (
                    <Link to={`/admin/${this.parent.props.prefix}/${id}/edit`}>
                        {value}
                    </Link>
                )
            }
        }
    },
    isActive: {
        type: Boolean,
        label: 'Is Active',
        uniforms: {
            component: ListBoolean,
            state: true,
            filter: false,
            sort: true,
            width: '3',
        }
    }
})

export default ListSchema
