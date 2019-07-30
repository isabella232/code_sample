import React, { Component } from 'react'

class StringControl extends Component {
    static publicName = 'String'
    render() {
        const { value } = this.props
        return (
            <div>
                String Control: {value}
            </div>
        )
    }
}

export default StringControl
