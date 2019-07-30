import React, { Component } from 'react'
import connectField from 'uniforms/connectField'
import { Form, Dropdown } from 'semantic-ui-react'
import { sortByText } from 'meteor/mcore/utils'

class DirectoryControl extends Component {
    static publicName = 'Directory'
    state = {
        items: [],
        keyword: ''
    }

    componentDidMount() {
        this.getOptions()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.keyword !== this.state.keyword) {
            this.getOptions()
        }
    }

    addItems = (list) => {
        const { items } = this.state
        list.forEach(({ title, _id }) => {
            const index = items.findIndex(({ value }) => value === _id)
            if (index < 0) {
                items.push({
                    text: title,
                    value: _id,
                })
            }
        })
        this.setState({ items })
    }

    getOptions = () => {
        const { value, directory } = this.props
        const { keyword } = this.state
        const query = {}
        const params = {
            limit: 20
        }

        if (keyword) {
            query.keyword = keyword
        } else {
            if (value) {
                query._id = { $in: value.split(',') }
            }
        }

        Meteor.call(`${directory}.staticList`, query, params, (err, list) => {
            if (err) {
                throw new Meteor.Error(err)
            }
            this.addItems(list)
        })
    }

    onChange = (event, { value }) => {
        const { multiple, onChange } = this.props
        onChange((multiple && value.length ? value.join(',') : value).toString())
    }

    onSearchChange = (event, { searchQuery }) => {
        this.setState({ keyword: searchQuery })
    }

    render() {
        const { directory, multiple, value } = this.props
        const { items } = this.state

        const data = (
            <Form.Field>
                <Dropdown
                    placeholder="Select Directory Items"
                    fluid
                    multiple={multiple}
                    selection
                    search
                    options={items.sort(sortByText)}
                    onChange={this.onChange}
                    onSearchChange={this.onSearchChange}
                    value={multiple ? value.split(',').filter(v => v) : value.toString()}
                />
            </Form.Field>
        )
        return data
    }
}

export default connectField(DirectoryControl)
