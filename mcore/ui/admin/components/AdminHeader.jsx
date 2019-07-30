import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import TreeMenu from '../../components/TreeMenu'


const { public: { siteName } } = Meteor.settings

class AdminHeader extends Component {
    handleLogout = (event) => {
        event.preventDefault()
        Meteor.logout()
    }

    render() {
        const { items = [] } = this.props

        return (
            <Menu inverted stackable fixed="top" className="admin-menu">
                <Menu.Item header as={Link} to="/admin">
                    {siteName} {i18n.__('Administration')}
                </Menu.Item>

                <TreeMenu items={items} />

                <Menu.Menu position="right">
                    <Menu.Item name="site" as={Link} to="/">
                        <Icon name="globe" />
                        {i18n.__('Site')}
                    </Menu.Item>
                    <Menu.Item name="profile" as={Link} to="/admin/profile">
                        <Icon name="user" />
                        {i18n.__('Profile')}
                    </Menu.Item>
                    <Menu.Item name="logout" onClick={this.handleLogout}>
                        <Icon name="sign out" />
                        {i18n.__('Logout')}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default AdminHeader
