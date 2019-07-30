import React from 'react'
import getClassNameForExtension from 'font-awesome-filetypes'
import { Card, Image, Button } from 'semantic-ui-react'
import FileCardAbstract from './FileCardAbstract'

class FileCard extends FileCardAbstract {
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
            <Card data-uuid={uuid}>
                <Card.Content as="a" href={fileUrl} target="_blank">
                    {isImage ? <Image src={fileUrl} /> : (
                        <i style={{ fontSize: '5.6rem' }} className={`fa ${className}`} />
                    )}
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        <div style={{ marginBottom: '0.5em', wordBreak: 'break-all' }}>{fileName}</div>
                    </Card.Description>
                    <Card.Meta>
                        <div>{fileSize} bytes</div>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group>
                            {isInsert && <Button color="blue" icon="check" onClick={this.selectFile} />}
                            <Button basic icon="edit" color="black" onClick={this.renameFile} />
                        <Button basic icon="remove" color="red" onClick={this.removeFile} />
                    </Button.Group>
                </Card.Content>
            </Card>
        )
    }
}

export default FileCard
