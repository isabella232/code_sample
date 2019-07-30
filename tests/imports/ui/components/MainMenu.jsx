import React from 'react';
import MenuItem from './MenuItem'

export default ({ items = [] }) => (
    <div className="app-mainmenu">
        <div className="container">
            <div className="menu-list">
                {items.map(MenuItem)}
            </div>
        </div>
    </div>
)