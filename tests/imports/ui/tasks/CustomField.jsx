import React from 'react';

export default ({ _id, value }) => (
    <div className="custom-field custom-field-single" key={_id}>
        <p className="color-light has-color-tag">
            <span className="field-background" />
            <span className="field-title">{value}</span>
        </p>
    </div>
)
