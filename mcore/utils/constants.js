export const PAGE_SIZE = 20

export const sizeOptions = [{
    key: '10',
    text: '10',
    value: '10'
},
{
    key: '20',
    text: '20',
    value: '20'
},
{
    key: '50',
    text: '50',
    value: '50'
},
{
    key: '100',
    text: '100',
    value: '100'
}]

const PLACEHOLDERS = [
    'Letter Header',
    'Letter Footer',
    'User Name',
    'Last Posts',
    'Unsubscribe Link'
]

export const EDITOR_CONFIG = {
    filebrowserBrowseUrl: '/admin/files/browser',
    filebrowserWindowWidth: '996',
    filebrowserWindowHeight: '480',
    filebrowserWindowFeatures: 'resizable=yes,scrollbars=no,directories=no,titlebar=yes,toolbar=no,location=no,status=no,menubar=no',
    toolbarCanCollapse: false,
    resize_enabled: true,
    customConfig: '/ckeditor/custom.js',
    extraPlugins: 'pagebreak,placeholder_select,youtube',
    toolbar: [{
        name: 'tools',
        items: ['Maximize', 'ShowBlocks']
    },
    {
        name: 'basicstyles',
        groups: ['basicstyles', 'cleanup'],
        items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
    },
    {
        name: 'colors',
        items: ['TextColor', 'BGColor']
    },
    {
        name: 'styles',
        items: ['Styles', 'Format', 'Font', 'FontSize']
    },
    // { name: 'editing', groups: ['find', 'selection', 'spellchecker'],
    // items: ['Find', 'Replace', '-', 'SelectAll', '-', 'jQuerySpellChecker'] },
    {
        name: 'insert',
        items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe', 'Youtube']
    },
    '/',
    {
        name: 'paragraph',
        groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
        items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
    },
    {
        name: 'links',
        items: ['Link', 'Unlink', 'Anchor']
    },
    {
        name: 'clipboard',
        groups: ['clipboard', 'undo'],
        items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
    },
    {
        name: 'others',
        items: ['placeholder_select', '-', 'Source']
    },
    // { name: 'document', groups: ['mode', 'document', 'doctools'],
    // items: ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'] },
    // { name: 'about', items: ['About'] }
    ],
    toolbarGroups: [{
        name: 'basicstyles',
        groups: ['basicstyles', 'cleanup']
    },
    {
        name: 'paragraph',
        groups: ['list', 'indent', 'blocks', 'align']
    },
    {
        name: 'styles'
    },
    {
        name: 'colors'
    },
    {
        name: 'clipboard',
        groups: ['clipboard', 'undo']
    },
    // { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
    {
        name: 'links'
    },
    {
        name: 'insert'
    },
    {
        name: 'forms'
    },
    {
        name: 'tools'
    },
    // { name: 'document', groups: ['mode', 'document', 'doctools'] },
    {
        name: 'others'
    },
    '/',
    {
        name: 'about'
    }
    ],
    placeholder_select: {
        placeholders: PLACEHOLDERS,
        format: '%%placeholder%%'
    },
    removeButtons: ''
}

export const SHORT_EDITOR_CONFIG = {
    toolbar: [{
        name: 'tools',
        items: ['Maximize', 'ShowBlocks']
    },
    {
        name: 'basicstyles',
        groups: ['basicstyles', 'cleanup'],
        items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
    },
    {
        name: 'colors',
        items: ['TextColor']
    },
    {
        name: 'insert',
        items: ['Image', 'Table', 'HorizontalRule', 'Smiley']
    },
    {
        name: 'paragraph',
        groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
        items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
    },
    {
        name: 'links',
        items: ['Link', 'Unlink']
    },
    {
        name: 'others',
        items: ['placeholder_select', '-', 'Source']
    },
    ],
    toolbarGroups: [{
        name: 'oneline',
        groups: [
            'tools',
            'basicstyles',
            'colors',
            'insert',
            'paragraph',
            'links',
            'others',
        ]
    }],
}
