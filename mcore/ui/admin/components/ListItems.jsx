import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoFields from 'uniforms-semantic/AutoFields'
import {
    Table, Button, Message, Loader, Icon
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ListWrapper from './ListWrapper'
import TableNavigation from './TableNavigation'
import FilterTH from './FilterTH'
import Rights from '../../../api/rights'

class ListItems extends Component {
    static = {
        history: PropTypes.object,
        prefix: PropTypes.string,
        items: PropTypes.array,
        schema: PropTypes.object,
    }

    handleRemove = (id) => {
        if (confirm(i18n.__('Remove Item?'))) {
            Meteor.call(`${this.props.prefix}.remove`, id, (error) => {
                if (error) {
                    toast.error(error.reason)
                } else {
                    const confirmation = i18n.__('remove success')
                    toast.success(confirmation)
                }
            })
        }
    }

    renderFieldHeader = (field, item) => {
        const { setQuery, setParams, history } = this.props
        const {
            uniforms: {
                filter,
                sort,
                width,
                ...uniformsProps
            } = {},
            label = item
        } = field
        const thOptions = {
            label,
            width,
            key: item
        }
        if (filter) {
            thOptions.onQueryChange = (value) => {
                setQuery(item, value)
            }
        }
        if (sort) {
            thOptions.onSortChange = (value) => {
                setParams('sort', item)
                setParams('order', value)
            }
        }
        return filter || sort ? <FilterTH {...thOptions} /> : (
                <Table.HeaderCell key={item} width={width}>
                    {i18n.__(label)}
                </Table.HeaderCell>
            )
    }

    render() {
        const {
            items, setParams, schema, refLink, params, prefix, counts,
            ...props
        } = this.props

        const user = Meteor.user()
        const rights = user && Rights.findOne({ collection: prefix, role: { $in: user.roles } }) || {}
        const { view, update, remove } = rights

        return (
            <Table striped selectable compact stackable>
                <Table.Header>
                    <Table.Row>
                        {schema._firstLevelSchemaKeys.map((item) => this.renderFieldHeader(schema._schema[item], item))}
                        <Table.HeaderCell width={2}>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.length > 0 && !props.loading ? items.map(model => (
                        <ListWrapper key={model._id} model={model} schema={schema} ref={refLink} prefix={prefix}>
                            <AutoFields />
                            <Table.Cell collapsing style={{ pointerEvents: 'auto' }}>
                                <Button.Group fluid size="small">
                                    { view && (
                                        <Button as={Link} to={`/admin/${prefix}/${model._id}`} basic color="green" title={i18n.__('View')}>
                                            <Icon name="binoculars" />
                                        </Button>
                                    )}
                                    {/* <Button as={Link} to={`/${prefix}/${model._id}`} basic color="green" title={i18n.__('View On Site')}>
                                        <Icon name="globe" />
                                    </Button> */}
                                    {update && (
                                        <Button basic color="blue" as={Link} to={`/admin/${prefix}/${model._id}/edit`} title={i18n.__('Edit')}>
                                            <Icon name="edit" />
                                        </Button>
                                    )}
                                    {remove && (
                                        <Button basic color="red" onClick={() => this.handleRemove(model._id)} title={i18n.__('Delete')}>
                                            <Icon name="remove" />
                                        </Button>
                                    )}
                                </Button.Group>
                            </Table.Cell>
                        </ListWrapper>
                    )) : (
                        <Table.Row>
                            <Table.Cell colSpan={schema._firstLevelSchemaKeys.length + 1}>
                                {props.loading
                                    ? <Loader active={props.loading} inline="centered" />
                                    : <Message warning>{i18n.__('No items yet')}</Message>
                                }
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={schema._firstLevelSchemaKeys.length + 1}>
                            <TableNavigation params={params} counts={counts} setParams={setParams} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}
export default ListItems

