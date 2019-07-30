import React, { Fragment } from 'react';
import MainMenu from '../components/MainMenu';
import items from '../../data/menuItems'

export default ({ children }) => (
    <Fragment>
        <MainMenu items={items} />
        {children}
    </Fragment>
)
