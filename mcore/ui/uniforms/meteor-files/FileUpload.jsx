import React from 'react'
import Dropzone from 'react-dropzone'
import { Card, Icon, Message } from 'semantic-ui-react'
import FileUploadAbstract from './FileUploadAbstract'
import FilesList from './FilesList'
import FileCard from './FileCard'

class FileUploadComponent extends FileUploadAbstract {
    render() {
        return (
            <div className="dropzone">
                <Dropzone
                    onDrop={this.uploadIt}
                    className="ui segment"
                >
                    <Message info>
                        <Icon
                            size="large"
                            name={this.state.inProgress ? 'circle notched': 'cloud upload'}
                            loading={this.state.inProgress} />
                        Try dropping some files here, or click to select files to upload.
                    </Message>
                    {this.showUploads()}
                </Dropzone>

                <FilesList container={Card.Group} containerProps={{ itemsPerRow: 6 }} component={FileCard} />
            </div>
        )
    }
}

export default FileUploadComponent
