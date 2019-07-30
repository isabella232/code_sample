import React from 'react';
import MenuItem from './MenuItem'
import classNames from 'classnames'

export default ({ title, href = '#', onClick, icon, active }, index) => (
    <a key={index} className={classNames('list-item',{ active })} href={href} onClick={onClick}>
        <i className={classNames('item-icon', icon)} />
        <p>{title}</p>
    </a>
)