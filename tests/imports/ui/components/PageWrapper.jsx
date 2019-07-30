import React from 'react';
import classNames from 'classnames'
import PageHeader from './PageHeader';

export default ({ title, children, pageClassName, hasBackButton }) => (
    <div className="page">
        <PageHeader title={title} hasBackButton={hasBackButton} />
        <div className={classNames(pageClassName, 'content', 'list-view')}>
            {children}
        </div>
    </div>
)