import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import {
    Icon, Dropdown, Menu,
} from 'semantic-ui-react'

class TreeMenu extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    renderSubMenu = (title, to, items, key, icon ) => (
        'flat' in this.props ? (
            <Menu.Item key={key}>
                <Menu.Header as={NavLink} to={to}>
                    {icon && <Icon name={icon} />}
                    <span className="caption">{i18n.__(title)}</span>
                </Menu.Header>
                <Menu.Menu>
                    {this.renderMenu(items)}
                </Menu.Menu>
            </Menu.Item>
        ) : (
            <Dropdown item text={i18n.__(title)} key={key}>
                <Dropdown.Menu>
                    {this.renderMenu(items)}
                </Dropdown.Menu>
            </Dropdown>
        )
    )

    renderMenu = list => list.map(({
        to, key, title, items, icon, onClick
    }, index) => (
        items && items.length > 0 ? this.renderSubMenu(title, to, items, index) : (
            <Menu.Item key={key || index} as={NavLink} to={to} onClick={onClick}>
                {icon && <Icon name={icon} />}
                <span className="caption">{i18n.__(title)}</span>
            </Menu.Item>
        )))

    render() {
        const { items } = this.props
        return this.renderMenu(items)
    }
}

export default TreeMenu
