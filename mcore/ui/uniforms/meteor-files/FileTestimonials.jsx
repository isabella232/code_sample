import React from 'react'
import { Link } from 'react-router-dom'
import { Feed, Image, Label } from 'semantic-ui-react'
import FileCardAbstract from './FileCardAbstract'

export default class FileTestimonials extends FileCardAbstract {
    render() {
        const {
            fileId,
            fileName,
            fileUrl,
            fileType,
            handleRemove,
            ...props
        } = this.props
        return (
            <Feed.Event>
                <Label
                    floating
                    circular
                    icon='remove'
                    color='red'
                    onClick={event => this.handleRemove(event, fileId)} />
                <Feed.Content as={Link} to={fileUrl} target="_blank">
                    <Image src='/img/graduate-diploma.png' centered />
                    <div className="caption">
                        {fileName}
                    </div>
                </Feed.Content>
            </Feed.Event>

        )
    }
}
