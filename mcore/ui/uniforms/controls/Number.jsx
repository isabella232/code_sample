import React, { Component } from 'react'
// import connectField from 'uniforms/connectField'
import NumField from 'uniforms-semantic/NumField'

class NumberControl extends Component {
    static publicName = 'Number'

    render() {
        const { units, ...props } = this.props
        return (
            <NumField {...props} placeholder={units} />
        )
    }
}

export default NumberControl
