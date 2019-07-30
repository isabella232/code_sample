import React from 'react'
import classnames from 'classnames'
import connectField from 'uniforms/connectField'
import compact from 'lodash/compact'
import remove from 'lodash/remove'
import filterDOMProps from 'uniforms/filterDOMProps'
import Dropzone from 'react-dropzone'
import {
    Divider, Card, Icon, Message
} from 'semantic-ui-react'
import {
    FileUploadAbstract,
    FilesList,
    FileCard,
    FileMini,
    FileAvatar,
    FileTestimonials,
} from './meteor-files'


class _Upload extends FileUploadAbstract {
    componentDidMount() {
        const { onChange, value } = this.props
        import('react-dragula').then(({ default: Dragula }) => {
            const dragArea = Array.from(document.querySelectorAll('.ui.cards')).shift()
            Dragula([dragArea]).on('dragend', () => {
                const orderedIds = Array.from(dragArea.querySelectorAll('[data-uuid]')).map(el => el.getAttribute('data-uuid'))
                Meteor.call('files.order', orderedIds, (err) => {
                    if (err) {
                        throw new Meteor.Error(err)
                    }
                })
            })
        })

        onChange(compact(value))
    }

    handleRemove = (fileId) => {
        const {onChange, value, minCount, disabled} = this.props
        const limitNotReached = !disabled && !(minCount >= value.length)
        const newValue = value
        remove(newValue, item => item == fileId)
        return limitNotReached && onChange(compact(newValue))
    }

    render() {
        const {
            className,
            disabled,
            error,
            errorMessage,
            id,
            // inputRef,
            label,
            accept = '',
            multiple = true,
            maxCount = 100,
            // minCount,
            // name,
            // onChange,
            viewMode = '',
            fileLocator,
            required,
            value,
            showInlineError = true,
            field,
            wrapClassName,
            ...props
        } = this.props
        const {uniforms: { placeholder }} = field
        let card
        if (viewMode === 'avatar') {
            card = FileAvatar
        } else if (viewMode === 'card') {
            card = FileCard
        } else if (viewMode === 'testimonials') {
            card = FileTestimonials
        } else {
            card = FileMini
        }
        return (
            <div
                className={classnames(className, {
                    disabled,
                    error,
                    required,
                }, viewMode, 'dropzone', 'field')}
                {...filterDOMProps(props)}>
                {label && <label htmlFor={id}>
                    {label}
                </label>}
                <Divider hidden />
                <FilesList
                    container={Card.Group}
                    containerProps={{ itemsPerRow: 6 }}
                    component={card}
                    query={{ _id: { $in: value || [] }, 'meta.locator': fileLocator }}
                    params={{ sort: { 'meta.order': 1 } }}
                    handleRemove={this.handleRemove}
                />
                <Divider hidden />
                {maxCount > value.length && (
                    <Dropzone
                        multiple={multiple}
                        accept={accept}
                        onDrop={this.uploadIt}
                        className={classnames('ui', wrapClassName, 'dropzone')}>
                        {({ getRootProps, getInputProps }) => (
                            <div className="item">
                                <Message info size="small" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Icon
                                        size="large"
                                        name={this.state.inProgress ? 'circle notched' : 'cloud upload'}
                                        loading={this.state.inProgress} />
                                    {placeholder}
                                </Message>
                                {this.showUploads()}
                            </div>
                        )}
                    </Dropzone>
                )}

                {!!(error && showInlineError) && <Message negative>{errorMessage}</Message>}
            </div>
        )
    }
}
_Upload.prototype.displayName = 'Upload'

export default connectField(_Upload)
