import React from 'react'
import { Link } from 'react-router-dom'
import { Message, Image, Icon } from 'semantic-ui-react'
import FileCardAbstract from './FileCardAbstract'

export default class FileAvatar extends FileCardAbstract {
    render() {
        const {
            fileId,
            fileName,
            fileUrl,
            fileType,
            handleRemove,
            ...props
        } = this.props
        const extension = fileName
            .split('.')
            .pop()
        return (
            <Message info size="small" className="filled">
                <Link to={fileUrl} target="_blank">
                    <Image alt={fileName} size="small" src={fileUrl} />
                    <Icon
                        size="large"
                        name={"remove"}
                        title="Remove"
                        onClick={event => this.handleRemove(event, fileId)}
                    />
                </Link>
            </Message>
        )
    }
}
