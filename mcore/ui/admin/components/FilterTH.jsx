import React, { Component } from 'react'
import { Table, Popup, Label, Icon, Input, Button } from 'semantic-ui-react'

class FilterTH extends Component {
    state = {
        value: '',
        sort: 1
    }

    onChange = (event, { value }) => {
        event.stopPropagation()
        this.setState({ value })
        this.props.onQueryChange(value)
    }

    clear = () => {
        this.setState({ value: '' })
        this.props.onQueryChange('')
    }

    toggleSort = () => {
        const sort = this.state.sort * -1
        this.setState({ sort })
        this.props.onSortChange(sort)
    }

    render() {
        "sort alphabet up"
        const { label, onSortChange, onQueryChange, width } = this.props
        const { value, sort } = this.state
        const sortOptions = {
            content: i18n.__(label)
        }
        if (onSortChange) {
            Object.assign(sortOptions, {
                icon: `sort ${sort > 0 ? 'alphabet down' : 'alphabet up'}`,
                onClick: this.toggleSort,
            })
        } else {
            Object.assign(sortOptions, {
                active: false
            })
        }
        return (
            <Table.HeaderCell width={width}>
                <Button.Group fluid>
                    <Button {...sortOptions} />
                    {onQueryChange ? (
                        <Popup
                            on="click"
                            trigger={<Button compact icon={value ? 'bookmark' : 'bookmark outline'} style={{ maxWidth: '3rem' }} />}
                        >
                            <Input value={value} action={{ icon: 'remove', onClick: this.clear, color: 'red' }} placeholder="Value..." onChange={this.onChange} />
                        </Popup>
                    ) : null}
                </Button.Group>
            </Table.HeaderCell>
        )
    }
}

export default FilterTH
