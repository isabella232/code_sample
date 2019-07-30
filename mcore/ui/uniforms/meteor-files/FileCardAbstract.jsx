import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

const getUrlParam = (paramName) => {
    const reParam = new RegExp('(?:[\?&]|&)' + paramName + '=([^&]+)', 'i')
    const match = window.location.search.match(reParam)
    return (match && match.length > 1) ? match[1] : null
}

class FileCardAbstract extends Component {
    static = {
        fileName: PropTypes.string.isRequired,
        fileSize: PropTypes.number.isRequired,
        fileUrl: PropTypes.string,
        fileId: PropTypes.string.isRequired,
        fileType: PropTypes.string,
        handleRemove: PropTypes.func
    }

    static defaultProps = {
        handleRemove: () => null
    }

    handleRemove = (event, fileId) => {
        event.preventDefault()
        const { handleRemove } = this.props
        handleRemove(fileId)
        return this.removeFile(event)
    }

    removeFile = () => {
        const {
            fileId,
            handleRemove
        } = this.props
        if (confirm('Are you sure you want to delete the file?')) {
            Meteor.call('file.remove', fileId, (err, res) => {
                if (err) {
                    throw new Meteor.Error(err)
                }
            })
            handleRemove(fileId)
        }
    }

    selectFile = (event) => {
        event.preventDefault()

        const funcNum = getUrlParam('CKEditorFuncNum')
        const { fileUrl, fileName } = this.props

        window.opener.CKEDITOR.tools.callFunction(funcNum, fileUrl, function () {
            // Get the reference to a dialog window.
            const dialog = this.getDialog()
            // Check if this is the Image Properties dialog window.
            if (dialog.getName() === 'image') {
                // Get the reference to a text field that stores the "alt" attribute.
                const element = dialog.getContentElement('info', 'txtAlt')
                // Assign the new value.
                if (element)
                    element.setValue(fileName)
            }
            // Return "false" to stop further execution. In such case CKEditor will ignore the second argument ("fileUrl")
            // and the "onSelect" function assigned to the button that called the file manager (if defined).
            // return false
        })
        window.close()
    }

    renameFile = () => {
        const validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi
        let prompt = window.prompt('New file name?', this.props.fileName)

        if (prompt && !isEmpty(prompt)) {
            prompt = prompt.replace(validName, '-')
            prompt.trim()
            Meteor.call('file.rename', {
                id: this.props.fileId,
                name: prompt
            }, (err, res) => {
                if (err) {
                    throw new Meteor.Error(err)
                }
            })
        }
    }

    render() {
        const {
            fileName,
            fileUrl,
            fileSize,
            fileType,
            ...props
        } = this.props
        return (
            <div>
                <a href="fileUrl" target="_blank"> {fileName}</a>
                / {fileSize} bytes
                <br />
                <a href="#rename" onClick={this.renameFile}>rename</a>
                <a href="#remove" onClick={this.removeFile}>remove</a>
            </div>
        )
    }
}

export default FileCardAbstract
