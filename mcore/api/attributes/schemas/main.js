import uniforms from 'uniforms-semantic'
import BaseMainSchema from '../../collection/schemas/main'
import SelectField from '../../../ui/uniforms/Select'
import AttributeParamsField from '../../../ui/uniforms/AttributeParams'
import { ListServices } from '../services'
import {
    ucfirst, slugify
} from '../../../utils'
import * as paramsControls from './controls'

const { public: { ATTRS_GROUP } } = Meteor.settings
const MainSchema = BaseMainSchema
    .omit('alias')
    .extend({
        alias: {
            type: String,
            label: 'Alias',
            optional: true,
            unique: 'true',
            autoValue() {
                const { value } = this
                const title = this.field('title').value
                if (!value && title) {
                    return ListServices.getAlias(slugify(title))
                }
                return value
            },
        },
        // group: {
        //     type: String,
        //     label: 'Attribute Group',
        //     allowedValues: () => Object.keys(ATTRS_GROUP),
        //     uniforms: {
        //         component: SelectField,
        //         transformMultiple(id) {
        //             return {
        //                 value: id,
        //                 text: ATTRS_GROUP[id] || ucfirst(id)
        //             }
        //         },
        //     },
        //     defaultValue: Object.keys(ATTRS_GROUP).shift(),
        // },
        group: {
            type: Array,
            label: 'Attribute Groups',
            uniforms: {
                multiple: true,
                component: SelectField,
                options: () => Object.keys(ATTRS_GROUP),
                transformMultiple(id) {
                    return {
                        value: id,
                        text: ATTRS_GROUP[id] || ucfirst(id)
                    }
                },
            },
            defaultValue: [Object.keys(ATTRS_GROUP).shift()],
        },
        'group.$': String,
        params: {
            type: Object,
            uniforms: {
                component: AttributeParamsField,
            },
            optional: true,

        },
        'params.paramsType': {
            type: String,
            label: 'Attribute Type',
            allowedValues: () => Object.keys(paramsControls),
            uniforms: {
                component: SelectField,
                transformMultiple(id) {
                    return { value: id, text: paramsControls[id].publicName || ucfirst(id) }
                },
            },
            defaultValue: 'string',

        },
        'params.paramsData': {
            type: Object,
            blackbox: true,
            optional: true,
            defaultValue: {},
        },
        order: {
            type: Number,
            optional: true,
            defaultValue: 0,
        },
        isFilter: {
            type: Boolean,
            label: 'Is Filter',
            defaultValue: false
        },
    })

export default MainSchema
