import React from 'react';
import classNames from 'classnames';
import Indicator from './Indicator'
import CustomField from './CustomField'
import { getIndicators } from '../../utils'

export default ({
    _id,
    title,
    style,
    color,
    status,
    customFields = [],
    ...rest
}) => {
    const indicators = getIndicators(rest)
    return (
        <div className="task" key={_id}>
            <a
                className={classNames('task-link', color && 'has-color-tag')}
                href="#"
                {...(color ? { style: { borderColor: color } } : null)}
            >
                <div className="task-link-head">
                    <div className="task-checkbox">
                        <label className="checkbox">
                            <input type="checkbox" defaultChecked={status === 'completed'} />
                            <span className="checkbox-toggle">
                                <i className="checkbox-icon icon-check" />
                            </span>
                        </label>
                    </div>
                    <div className="task-title">
                        <p>{title}</p>
                    </div>
                </div>
                <div className="task-link-body">
                    {indicators.length > 0 ? <div className="indicators">
                        {indicators.map(Indicator)}
                    </div> : null}
                    {customFields.length > 0 ? <div className="custom-fields">
                        {customFields.map(CustomField)}
                    </div> : null}
                </div>
            </a>
        </div>
    )
}