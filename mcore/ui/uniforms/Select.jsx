import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import classnames from 'classnames'
import connectField from 'uniforms/connectField'
import filterDOMProps from 'uniforms/filterDOMProps'
import { Dropdown } from 'semantic-ui-react'
import { sortByText } from '../../utils'


const ALL_LIMIT = 20

const setOptions = ({ allowedValues, options, transformMultiple }) => {
    let sOptions = []
    if (options) {
        sOptions = options().reduce((sOptions, item) => {
            sOptions.push(transformMultiple ? transformMultiple(item) : {
                value: item,
                text: item
            })
            return sOptions
        }, [])
    } else if (allowedValues && allowedValues.length) {
        sOptions = allowedValues.reduce((sOptions, item) => {
            sOptions.push(transformMultiple ? transformMultiple(item) : item)
            return sOptions
        }, [])
    }
    return sOptions
}

class Select extends Component {
    state = {
        value: this.props.value,
        sOptions: setOptions(this.props)
    }

    handleAddition = (e, { value }) => {
        this.setState({
            sOptions: [{ text: value, value }, ...this.state.sOptions],
        })
    }

    getData = (query = {}, params = {} ) => {
        const { name, search, multiple } = this.props
        const { value } = this.state

        params.limit = multiple && value && value.length ? value.length + ALL_LIMIT : ALL_LIMIT

        if (search) {
            if (value) {
                query = {
                    $or: [
                        { _id: { $in: multiple ? value : [ value ] }},
                        query
                    ]
                }
            }
            Meteor.call(search, {query, params}, (err, result) => {
                const options = result ? result.map(item => ({
                    text: item.label || item.name || item.title || `${item.last_name} ${item.first_name}`,
                    value: item._id
                })) : []
                this.setState({ sOptions: options })
            })
        }
    }

    static getDerivedStateFromProps({ value }) {
        return {
            value
        }
    }

    componentDidMount() {
        // this.getData()
    }

    onSearchChange = (e, { searchQuery }) => {
        if (searchQuery.trim().length > 0) {
            // this.getData({ title: new RegExp(eval('/' + searchQuery.split(' ').join('|') + '/gi')) })
            this.getData({ title: searchQuery.trim() })
        }
    }


    handleChange = (e, { value }) => {
        const { onChange, multiple } = this.props
        // const fixedValue = multiple ? (value.length ? value : []) : (value ? value : '')
        this.setState({ value })
        return onChange(value)
    }

    render() {
        const {
            // allowedValues,
            // checkboxes,
            className,
            disabled,
            error,
            errorMessage,
            transformMultiple,
            options,
            // fieldType,
            id,
            // inputRef,
            label,
            name,
            uniforms: { placeholder } = {},
            search,
            multiple,
            allowAdditions,
            required,
            showInlineError,
            // transform,
            // search,
            // setFields,
            ...props
        } = this.props

        const { sOptions = [], value } = this.state
        const searchFlag = Boolean(search).valueOf()
        const sortedOptions = sOptions.sort(sortByText)

        return (
            <div className={classnames({ disabled, error, required }, className, 'field')} {...filterDOMProps(props)}>
                {label && <label htmlFor={id}>{label}</label>}

                <Dropdown
                    fluid
                    selection
                    search={searchFlag}
                    multiple={multiple}
                    allowAdditions={allowAdditions}
                    disabled={disabled}
                    id={id}
                    name={name}
                    placeholder={placeholder || label || name}
                    options={sortedOptions}
                    value={value}
                    onAddItem={this.handleAddition}
                    onSearchChange={searchFlag ? this.onSearchChange : null}
                    onChange={this.handleChange}
                />
                {!!(error && showInlineError) && (
                    <div className="ui red basic pointing label">{errorMessage}</div>
                )}

            </div>
        )
    }
}

export default connectField(Select)
