import React from 'react';
import classNames from 'classnames';
import TaskItem from './TaskItem';

export default ({ title, open=true, items=[] }) => (
    <div className={classNames('group-container', { open })}>
        <div className="group-head">
            <p>{title}</p>
        </div>
        <div className="group-content">
            {items.map(TaskItem)}
        </div>
    </div>
)