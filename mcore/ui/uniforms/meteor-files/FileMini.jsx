import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import getClassNameForExtension from 'font-awesome-filetypes'
import { Feed, Label } from 'semantic-ui-react'
import FileCardAbstract from './FileCardAbstract'

export default class FileMini extends FileCardAbstract {
    render() {
        const {
            fileId,
            fileName,
            fileUrl,
            fileSize,
            fileType,
            handleRemove,
            ...props
        } = this.props

        const extension = fileName
            .split('.')
            .pop()
        const icon = <i style={{ fontSize: '2rem' }}
            className={classnames('fa', getClassNameForExtension(extension))} />
        return (
            <Feed.Event>
                <Feed.Label icon={icon} />
                <Feed.Content>
                    <Feed.Summary>
                        <Link to={fileUrl} target="_blank">{fileName}</Link>
                        <Feed.Date>{fileSize}
                            bytes</Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                        <Label
                            icon='remove'
                            className='button'
                            color='red'
                            size='mini'
                            content='Remove'
                            onClick={event => this.handleRemove(event, fileId)} />
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>
        )
    }
}
