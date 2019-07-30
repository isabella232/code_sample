import React, { Component } from 'react'
import { Menu, Dropdown, Input } from 'semantic-ui-react'
import { PAGE_SIZE, sizeOptions } from '../../../utils/constants'


class TableNavigation extends Component {
    state = {
        activeItem: this.props.params.page ? this.props.params.page.toString() : '1'
    }

    static defaultProps = {
        setParams: () => null
    }

    handleItemClick = (e, { value }) => {
        e.preventDefault()
        if (this.changePageNum) { clearTimeout(this.changePageNum) }

        this.setState({ activeItem: value })
        this.changePageNum = setTimeout(() => {
            this.props.setParams('page', parseInt(value, 10))
        }, 1000)
    }

    handleSizeChange = (e, {
        value
    }) => {
        e.preventDefault()
        this.props.setParams('page', 1)
        this.props.setParams('limit', parseInt(value, 10))
    }

    render() {
        const {
            activeItem
        } = this.state
        const {
            counts,
            params: {
                page = 1,
                limit = PAGE_SIZE
            }
        } = this.props
        const pagesCount = counts ? Math.ceil(counts / limit) : 1
        const showFrom = (page - 1) * limit + 1
        const showTo = Math.min(page * limit, counts)
        return counts ? (
            <Menu secondary color="blue" className="table-navigation">
                <Menu.Item>
                    <div>
                        {i18n.__('Show')}
                        {' '}
                        <Dropdown
                            selection
                            compact
                            id={'pageSize'}
                            options={sizeOptions}
                            text={limit.toString()}
                            defaultValue={limit}
                            onChange={this.handleSizeChange}
                        />
                        {' '} {i18n.__('entries')}
                    </div>
                </Menu.Item>
                <Menu.Item>
                    {i18n.__('Records')} {' '} {showFrom}-{showTo} {' '} {i18n.__('from')} {' '} {counts}
                    <br />
                    {i18n.__('Active Page')} {' '} {activeItem} {' '} {i18n.__('from')} {' '} {pagesCount}
                </Menu.Item>
                <Menu.Item icon="arrow left" onClick={(e) => this.handleItemClick(e, { value: Math.max(Number(activeItem) - 1, 1) })} />
                <Menu.Item style={{ flexGrow: '1' }}>
                    {/* pagesCount > 1 && <Pagination
                        defaultActivePage={activeItem}
                        totalPages={pagesCount}
                        onPageChange={this.handleItemClick}
                    /> */}
                    {pagesCount > 1 && <Input
                        fluid
                        min={1}
                        max={pagesCount}
                        onChange={this.handleItemClick}
                        type='range'
                        value={activeItem}
                    />}
                </Menu.Item>
                <Menu.Item icon="arrow right" onClick={(e) => this.handleItemClick(e, { value: Math.min(Number(activeItem) + 1, pagesCount) })} />
            </Menu>
        ) : null
    }
}

export default TableNavigation
