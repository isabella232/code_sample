import React, { Component, Fragment } from 'react'
import { renderRoutes } from 'react-router-config'
import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.min.css'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withTracker } from 'meteor/react-meteor-data'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/AdminFooter'
import { ucfirst } from '../../../utils'

const prefix = '/admin'
class AdminLayout extends Component {
    render() {
        const { route, items } = this.props
        return (
            <Fragment>
                <AdminHeader items={items} />
                {renderRoutes(route.routes)}
                <AdminFooter />
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
            </Fragment>
        )
    }
}

const mapStateToProps = ({ app: { currentUser }, core: { collections } }, { loading }) => {
    const getItems = () => Object.keys(collections)
        .filter(collection => (
            !loading && currentUser && collections.rights.findOne(
                { collection, view: true, role: { $in: currentUser.roles } }
            )
        ))
        .map(item => ({
            to: `${prefix}/${item.toLowerCase()}`,
            title: ucfirst(i18n.__(item))
        }))
    const items = [
        {
            to: `${prefix}/`,
            title: 'Dashboard',
        },
        {
            to: '#',
            title: 'Tables',
            onClick: ({ preventDefault }) => preventDefault(),
            items: getItems()
        }, {
            to: `${prefix}/files`,
            title: 'Files',
        },
    ]
    return { collections, items }
}

export default compose(
    withTracker((props) => {
        const collectionHandle = Meteor.subscribe('rights.list', {}, { limit: 1000, page: 1 })
        const loading = !collectionHandle.ready()
        return { loading, collectionHandle, ...props }
    }),
    connect(mapStateToProps)
)(AdminLayout)
