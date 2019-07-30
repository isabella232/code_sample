import { Meteor } from 'meteor/meteor'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import { Container, Menu, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import HelmetHead from '../../components/HelmetHead'
import PageHeader from '../components/PageHeader'
import ListItems from '../components/ListItems'
import ListContainer from '../../containers/ListContainer'
import Rights from '../../../api/rights'

const breadcrumbs = []

class CollectionPage extends Component {
    static propTypes = {
        prefix: PropTypes.string,
        history: PropTypes.object
    }

    state = {
        query: { },
        params: { }
    }

    setParams = (name, value) => {
        const { params } = this.state
        if (typeof value === 'undefined') {
            delete params[name]
        } else {
            params[name] = value
        }
        this.setState({ params: { ...params } })
    }

    setQuery = (name, value) => {
        const { query } = this.state
        if (typeof value === 'undefined') {
            delete query[name]
        } else {
            query[name] = value
        }
        this.setState({ query: { ...query, [name]: value} })
    }

    handleRemove = (event) => {
        event.preventDefault()
        const { history, match: { params: { prefix, id } } } = this.props
        if (confirm(i18n.__('Remove Item?'))) {
            Meteor.call(`${prefix}.remove`, id, (error) => {
                if (error) {
                    toast.error(error.reason)
                } else {
                    const confirmation = i18n.__('remove success')
                    toast.success(confirmation)
                    history.push(`/admin/${prefix}`)
                }
            })
        }
    }

    renderList = () => {
        const { query, params } = this.state
        const { match: { params: { prefix } } } = this.props
        return (
            <Fragment>
                <HelmetHead title={`${i18n.__('List')} ${prefix} | ${i18n.__('Admin')}`} />
                <ListContainer
                    {...this.props}
                    schema='list'
                    groupContainer={ListItems}
                    setQuery={this.setQuery}
                    setParams={this.setParams}
                    query={query}
                    params={params}
                    prefix={prefix}
                />
            </Fragment>
        )
    }
    render() {
        const { route, location: { pathname }, match: { params: { prefix, id } } } = this.props

        const isEdit = pathname.split('/').indexOf('edit') > -1
        const noNew = id !== 'new'

        const user = Meteor.user()
        const rights = user && Rights.findOne({ collection: prefix, role: { $in: user.roles } }) || {}
        const { insert, view, update, remove } = rights

        return (
            <Fragment>
                <PageHeader title={prefix} breadcrumbs={breadcrumbs}>
                    <Menu inverted style={{ background: 'inherit' }}>
                        {id ? <Menu.Item as={Link} to={`/admin/${prefix}`}>
                            <Icon name="content" />
                            {i18n.__('List')}
                        </Menu.Item> : null}
                        {!(id === 'new') && insert ? <Menu.Item as={Link} to={`/admin/${prefix}/new`}>
                            <Icon name="add" />
                            {i18n.__('New')}
                        </Menu.Item> : null}
                        {id && isEdit && noNew && view ? <Menu.Item as={Link} to={`/admin/${prefix}/${id}`}>
                            <Icon name="binoculars" />
                           {i18n.__('View')}
                        </Menu.Item> : null}
                        {id && !isEdit && noNew && update ? <Menu.Item as={Link} to={`/admin/${prefix}/${id}/edit`}>
                            <Icon name="edit" />
                            {i18n.__('Edit')}
                        </Menu.Item> : null}
                        {id && noNew && remove ? <Menu.Item as={Link} to={`/admin/${prefix}/${id}/remove`} onClick={this.handleRemove}>
                            <Icon name="remove" />
                            {i18n.__('Remove')}
                        </Menu.Item> : null}
                        {id && id !== 'new' ? <Menu.Item as={'a'} href={`/${prefix}/${id}`} target="_blank">
                            <Icon name="globe" />
                            {i18n.__('View On Site')}
                        </Menu.Item> : null}

                    </Menu>
                </PageHeader>
                <Container>
                    {id ? renderRoutes(route.routes) : this.renderList()}
                </Container>
            </Fragment>
        )
    }
}


export default CollectionPage
