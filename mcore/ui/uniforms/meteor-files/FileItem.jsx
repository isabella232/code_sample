import React from 'react'
import getClassNameForExtension from 'font-awesome-filetypes'
import { Feed, Icon, List, Divider } from 'semantic-ui-react'
import FileCardAbstract from './FileCardAbstract'

class FileItem extends FileCardAbstract {
    render() {
        const {
            fileName,
            fileUrl,
            uuid,
            fileSize,
            fileType,
            ...props
        } = this.props

        const isImage = fileType.substring(0, 5) == 'image'
        const extension = fileName.split('.').pop()
        const className = getClassNameForExtension(extension)
        const isInsert = window.location.search.indexOf('CKEditor') > -1

        return (
            <Feed.Event key={uuid} data-uuid={uuid}>
                <Feed.Content>
                    <Feed.Summary>
                        <a href={fileUrl} target="_blank">
                            <Icon className={`fa ${className}`} />
                            {fileName}
                        </a>
                        <Feed.Date>
                            <div>{fileSize} bytes</div>
                        </Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                        <List horizontal divided size="small">
                            {isInsert && <List.Item onClick={this.selectFile} active>
                                <List.Icon color="blue" name="check" />
                                {i18n.__('Select')}
                            </List.Item>}
                            <List.Item onClick={this.renameFile}>
                                <List.Icon name="edit" />
                                {i18n.__('Edit')}
                            </List.Item>
                            <List.Item onClick={this.removeFile}>
                                <List.Icon color="red" name="edit" />
                                {i18n.__('Remove')}
                            </List.Item>
                        </List>
                    </Feed.Meta>
                    <Feed.Summary>
                        <Divider />
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        )
    }
}

export default FileItem
