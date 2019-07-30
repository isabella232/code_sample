import React, { Component } from 'react'
import connectField from 'uniforms/connectField'
import { Form, Dropdown } from 'semantic-ui-react'

class SetAndColorControl extends Component {
    static publicName = 'SetAndColor'
    getOptions = (items = []) => {
        return items.map((item, index) => ({
            text: `${item.title} - ${item.color}`,
            value: item.title,
            key: index,
        }))
    }

    onChange = (event, data) => {
        const { multiple, onChange } = this.props
        const { value } = data
        onChange(multiple && value.length ? value.join(',') : value)
    }

    render() {
        const { multiple, items, value } = this.props
        return (
            <Form.Field>
                <Dropdown
                    placeholder="Select Items"
                    fluid
                    multiple={multiple}
                    selection
                    options={this.getOptions(items)}
                    onChange={this.onChange}
                    value={multiple && value.length ? value.split(',') : value}
                />
            </Form.Field>
        )
    }
}

export default connectField(SetAndColorControl)
