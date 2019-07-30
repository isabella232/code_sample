import React from 'react';

export default ({ name }, index) => (
    <span className="icon-indicator" key={index}>
        <i className={`icon-${name}`} />
    </span>
)
