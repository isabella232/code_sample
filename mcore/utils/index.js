import { Meteor } from 'meteor/meteor'
import format from 'date-fns/format'
// import sanitizeHtml from 'sanitize-html'


const LARGE_TABLE_SCREEN = 780

export const closestByClass = (el, elClass) => {
    while (el.className.indexOf(elClass) < 0) {
        el = el.parentNode
        if (!el) {
            return null
        }
    }
    return el
}

export const closestByTag = (el, elTag) => {
    while (el.tagName.toLowerCase() != elTag.toLowerCase()) {
        el = el.parentNode
        if (!el) {
            return null
        }
    }
    return el
}

export function noquotes(string) {
    return string.replace(/"/g, '&quot')
}

export function addslashes(string) {
    return string.replace(/\\/g, '\\\\')
        .replace(/\u0008/g, '\\b')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\f/g, '\\f')
        .replace(/\r/g, '\\r')
        .replace(/'/g, '\\\'')
        .replace(/"/g, '\\"')
}


export const sortByText = (a, b) => {
    const x = a.text.toLowerCase()
    const y = b.text.toLowerCase()
    if (x < y) { return -1 }
    if (x > y) { return 1 }
    return 0
}

export const stripTags = (html) => {
    // const div = document.createElement('div')
    // div.innerHTML = html
    // return div.textContent || div.innerText || ''
    // return sanitizeHtml(html, {
    //     allowedTags: false,
    //     allowedAttributes: false
    // })
    return stripTagsExtended(html, [])
}

export function stripTagsExtended(_html, allowedTags = []) {
    // return sanitizeHtml(_html, {
    //     allowedTags
    // })

    var _tags = [],
        _tag = "";
    for (var _a = 0; _a < allowedTags.length; _a++) {
        _tag = allowedTags[_a].replace(/<|>/g, '').trim();
        if (allowedTags[_a].length > 0) _tags.push(_tag, "/" + _tag);
    }

    if (!(typeof _html == "string") && !(_html instanceof String)) return "";
    else if (_tags.length == 0) return _html.replace(/<(\s*\/?)[^>]+>/g, "");
    else {
        var _re = new RegExp("<(?!(" + _tags.join("|") + ")\s*\/?)[^>]+>", "g");
        return _html.replace(_re, '');
    }
}

export const formatDate = (date) => {
    return format(date, Meteor.settings.public.dateFormat || "DD/MM/YYYY hh:mm")
}

export const ucfirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
/** @desc Slugify Block */

// if you are lazy just... add more letter and their replacements and get rid of duplicates
const reduce = () => {
    const a = ('йцукенгшщзхъфывапролджэячсмитьбюàáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:' + 'ąàáäâãåæćęęèéëêìíïîłńòóöôõøśùúüûñçżź').split('')
    const b = ('icukengsszhyfivaproldjeicsmitjbuaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------' + 'aaaaaaaaceeeeeeiiiilnoooooosuuuunczz').split('')

    return a.reduce((acc, current, index) => {
        const exist = acc.a.find(char => char === current)

        if (exist) {
            return acc
        }

        acc.a.push(current)
        acc.b.push(b[index])

        return acc
    }, {
        a: [],
        b: []
    })
}

const reduced = reduce()
const a = reduced.a.join('') // "àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:ąãåćęłõøż"
const b = reduced.b.join('') // "aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------aaacelooz"
const p = new RegExp(a.split('').join('|'), 'g')

export const slugify = (text = '') => (
    text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
)
/** @desc /Slugify Block */

export const replaceArray = (inputString, find, replace) => {
    let replacedString = inputString
    for (let i = 0; i < find.length; i += 1) {
        const regex = new RegExp(find[i], 'g')
        replacedString = replacedString.replace(regex, replace[i])
    }
    return replacedString
}

export const omit = (obj, ...fields) => (Object.keys(obj)
    .filter(key => fields.indexOf(key) < 0)
    .reduce((newObj, key) => Object.assign(newObj, {
        [key]: obj[key]
    }), {}))

export const getBodyHeight = () => {
    const {
        body,
        documentElement,
    } = document

    return Math.max(
        body.scrollHeight,
        body.offsetHeight,
        documentElement.clientHeight,
        documentElement.scrollHeight,
        documentElement.offsetHeight,
    )
}

export const isMobile = () => Meteor.isCordova || window.innerWidth < LARGE_TABLE_SCREEN

export const canViewAll = (userId) => {
    const canView = userId ? true : false
    return canView
}

export const allowedTags = 'h1 h2 h3 h4 h5 ul li ol h6 b i small hr em strong span p br'

export const doClear = (value) => {
    let pValue = value
    pValue = pValue.replace(/<br>/g, '000111<br>')
    pValue = stripTagsExtended(pValue, allowedTags.split(' '))
    pValue = pValue.replace(/000111/g, '<br />')
    pValue = pValue.replace(/\t/gm, '').replace(/((\r\n|\n|\r){2,10})/gm, '\r\n')
    pValue = pValue.replace('<p>\s*</p>', '')
    pValue = pValue.replace('<p>.ic {float:left; clear:left; background: url(&#39;//www.anwalt.de/upload/shadow.gif&#39;) no-repeat bottom right !important; margin-left:4px; margin-right:13px; margin-top:6px; margin-bottom:0px;} .ic img {border:1px solid #ffffff; display:block; position:relative; background-color:#fff; margin:-6px 6px 6px -6px;} .reg {font-size: 13px; font-family: Arial,Helvetica;} .big {font-size: 14px; font-family: Arial,He  lvetica;} .hr {border:1px solid; margin-top:17px; margin-bottom:17px;} .p {border:0px solid; margin-top:9px; margin-bottom:0px;} --&gt;', '')
    pValue = pValue.replace(".ic {float:left; clear:left; background: url('//www.anwalt.de/upload/shadow.gif') no-repeat bottom right !important; margin-left:4px; margin-right:13px; margin-top:6px;margin-bottom:0px;}.ic img {border:1px solid #DDDDDD; display:block; position:relative; background-color:#fff; margin:-6px 6px 6px -6px;}.reg {FONT-SIZE: 13px; FONT-FAMILY: Arial,Helvetica;}.big {FONT-SIZE: 14px; FONT-FAMILY: Arial,Helvetica;}.hr {border:1px solid;margin-top:17px;margin-bottom:17px;}.p {border:0px solid;margin-top:9px;margin-bottom:0px;}", '')
    pValue = pValue.replace(".ic {float:left; clear:left; background: url('//www.anwalt.de/upload/shadow.gif') no-repeat bottom right !important; margin-left:4px; margin-right:13px; margin-top:6px; margin-bottom:0px;}.ic img {border:1px solid #DDDDDD; display:block; position:relative; background-color:#fff; margin:-6px 6px 6px -6px;}.reg {font-size: 13px; font-family: Arial,Helvetica;}.big {font-size: 14px; font-family: Arial,Helvetica;}.hr {border:1px solid; margin-top:17px; margin-bottom:17px;}.p {border:0px solid; margin-top:9px; margin-bottom:0px;}", '')
    pValue = pValue.replace(/.ic[\w\W]*-->/gm, '')
    pValue = pValue.replace(/((\r\n|\n|\r){2,10})/gm, '')
    pValue = pValue.replace(/<p><\/p>/g, '')
    pValue = pValue.replace(/(<br \/>){2,}/g, '<br />')
    pValue = pValue.replace(/^<br \/>/g, '')
    pValue = pValue.replace(/&amp;(\w)/g, '&$1')
    return pValue
}

export { default as rateLimit } from './rate-limit'


