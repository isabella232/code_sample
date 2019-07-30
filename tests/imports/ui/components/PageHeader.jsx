import React from 'react';
import classNames from 'classnames'

export default ({ title, hasBackButton = true }) => (
    <div className="page-header">
        <div className={classNames('content', hasBackButton && 'has-back-button')}>
            {hasBackButton && <div className="back-button">
                <a>
                    <i className="icon-chevron-left" />
                </a>
            </div>}
            <div className="content-block">
                <div className="page-title">
                    <h1>{title}</h1>
                </div>
            </div>
        </div>
    </div>
)
