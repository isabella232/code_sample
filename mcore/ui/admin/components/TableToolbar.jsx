import React, { Children, cloneElement } from 'react'
import { Menu } from 'semantic-ui-react'

const TableToolbar = ({ children }) => {
    return (
        <Menu secondary attached="bottom">
            {Children.map(children, (item, key) => cloneElement(item, { key }))}
        </Menu>
    )
}

export default TableToolbar
