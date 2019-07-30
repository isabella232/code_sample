import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import {
    Feed, Input, Dropdown,
    Container, Menu, Card, Icon
} from 'semantic-ui-react'
import HelmetHead from '../../components/HelmetHead'
import PageHeader from '../components/PageHeader'
import FileUploadAbstract from '../../uniforms/meteor-files/FileUploadAbstract'
import FilesList from '../../uniforms/meteor-files/FilesList'
import FileCard from '../../uniforms/meteor-files/FileCard'
import FileItem from '../../uniforms/meteor-files/FileItem'

class FilesPage extends FileUploadAbstract {
    state = {
        mode: 'list',
        query: { },
        params: { limit: 20, sort: { 'meta.uploadedAt': -1 } }
    }

    static = {
        prefix: PropTypes.string,
        history: PropTypes.object,
    }

    setMode = (event, { mode }) => {
        this.setState({
            mode
        })
    }

    setSort = (event, { sort }) => {
        const { params } = this.state
        this.setState({
            params: {
                ...params,
                sort
            }
        })
    }

    setLimit = (event, { limit }) => {
        const { params } = this.state
        this.setState({
            params: {
                ...params,
                limit
            }
        })
    }

    onChange = (e, { value }) => {
        if (this.searchTimeout) { clearTimeout(this.searchTimeout) }

        this.searchTimeout = setTimeout(() => {
            if (value) {
                this.setState({
                    query: {
                        name: { $regex: new RegExp(eval(`/${value}/i`)) }
                    }
                })
            } else {
                this.setState({ query: {} })
            }
        }, 400)
    }

    render() {
        const { mode, query, params, inProgress } = this.state
        const { limit, sort } = params
        return (
            <Fragment>
                <HelmetHead title={`${i18n.__('Media')} | ${i18n.__('Admin')}`} />
                <PageHeader title={i18n.__('Files')}>
                    <Menu.Menu className="dropzone">
                        <Dropzone onDrop={this.uploadIt}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className="item">
                                    <input {...getInputProps()} />
                                    <Icon
                                        name={inProgress ? 'circle notched' : 'cloud upload'}
                                        loading={inProgress}
                                    />
                                    Drop files here, or click to upload
                                    {this.showUploads()}
                                </div>
                            )}
                        </Dropzone>
                    </Menu.Menu>
                    <Menu.Item link mode="list" active={mode === 'list'} onClick={this.setMode}>
                        <Icon name="list" />
                    </Menu.Item>
                    <Menu.Item link mode="grid" active={mode === 'grid'} onClick={this.setMode}>
                        <Icon name="grid layout" />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Dropdown item text={`${i18n.__('Sort')}`} key={'sort_dropdown'}>
                            <Dropdown.Menu>
                                <Menu.Item sort={{ 'meta.uploadedAt': -1 }} onClick={this.setSort}>{i18n.__('uploadedAtDesc')}</Menu.Item>
                                <Menu.Item sort={{ name: 1 }} onClick={this.setSort}>{i18n.__('nameAcs')}</Menu.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown item text={`${i18n.__('Limit')}: ${limit}`} key={'limit_dropdown'}>
                            <Dropdown.Menu>
                                <Menu.Item limit="20" onClick={this.setLimit}>20</Menu.Item>
                                <Menu.Item limit="40" onClick={this.setLimit}>40</Menu.Item>
                                <Menu.Item limit="100" onClick={this.setLimit}>100</Menu.Item>
                                <Menu.Item limit="All" onClick={this.setLimit}>All</Menu.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Menu.Item>
                            <Input transparent inverted fluid icon="search" placeholder={i18n.__('Search')} onChange={this.onChange} style={{minWidth: '10rem'}} />
                        </Menu.Item>
                    </Menu.Menu>
                </PageHeader>

                <Container>
                    {mode === 'grid' && (
                        <FilesList
                            container={Card.Group}
                            containerProps={{ itemsPerRow: 6 }}
                            component={FileCard}
                            query={query}
                            params={params}
                        />
                    )}
                    {mode === 'list' && (
                        <FilesList
                            container={Feed}
                            containerProps={{ style: { columnCount: 3 } }}
                            component={FileItem}
                            query={query}
                            params={params}
                        />
                    )}
                </Container>
            </Fragment>

        )
    }
}

export default FilesPage
