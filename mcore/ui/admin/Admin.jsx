import React, { createElement } from 'react'
import { renderRoutes } from 'react-router-config'
import AdminLayout from './layouts/AdminLayout'
import FilesLayout from './layouts/FilesLayout'

export default (props) => {
    const { route, location: { pathname } } = props
    let component = AdminLayout
    if (pathname === '/admin/files/browser') {
        component = FilesLayout
    }
    return createElement(component, props, renderRoutes(route.routes))
}
