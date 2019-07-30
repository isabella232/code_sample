import { Meteor } from 'meteor/meteor'
import SendGrid from '@sendgrid/mail'
import { Email } from 'meteor/email'
import { prefix } from '..'
import { ListServices as SettingsListServices } from '../../settings/services'

class MailServices {
    // static replacePlaceholders(body, sId, username, userId) {
    //     const set = PLACEHOLDERS.reduce((set, item) => {
    //         let value
    //         switch (item) {
    //         case 'Letter Header': {
    //             value = PagesItemServices.getItemByCode('LETTER_HEADER').description
    //             break
    //         }
    //         case 'Letter Footer': {
    //             value = PagesItemServices.getItemByCode('LETTER_FOOTER').description
    //             break
    //         }
    //         case 'User Name': {
    //             value = username
    //             break
    //         }
    //         case 'Last Posts': {
    //             const lastPosts = PostsListServices.cards({isDeleted: false, pubDate: { $lt: new Date()} }, {limit: 6, sort: {updatedAt: -1}})
    //             value = lastPosts.reduce((str, item) => {
    //                 return str + `<li><a href="${DOMAIN}/posts/${item._id}">${item.title}</a></li>`
    //             }, '<ul>') + '</ul>'
    //             break
    //         }
    //         case 'Unsubscribe Link': {
    //             const link = `${DOMAIN}/unsubscribe/${userId}`
    //             value = `<div><a href="${link}">${link}</a></div>`
    //             break
    //         }
    //         }
    //         if (value) {
    //             set[`%${item}%`] = value
    //         }
    //         return set
    //     }, {})
    //     const r = replaceArray(body, Object.keys(set), Object.values(set))
    //     return r
    // }

    static send(contact) {
        const { public: { siteName } } = Meteor.settings
        const sender = SettingsListServices.list({ code: { $in: ['SITE_EMAIL', 'SENDER_NAME'] } }).reduce((obj, { code, value }) => {
            obj[code] = value
            return obj
        }, {})
        if (sender) {
            const options = {
                to: `${sender.SENDER_NAME} <${sender.SITE_EMAIL}>`,
                from: `${contact.username} <${contact.email}>`,
                subject: `Contact Message from ${siteName} (${contact._id})`,
                text: `You have new message from site ${Meteor.settings.public.domain}. Sender: ${contact.username} ${contact.email}. Subject: ${contact.subject}. Message: ${contact.text}`,
                html: `<p>You have new message from site ${Meteor.settings.public.domain}<br /> Sender: ${contact.username} ${contact.email}</p> <p>Subject: ${contact.subject}</p> <p>Message: ${contact.text.replace(/(?:\r\n|\r|\n)/g, '<br />')}</p>`,
            }

            try {
                SendGrid.setApiKey(Meteor.settings.sendgrid)
                SendGrid.send(options)
            } catch (err) {
                Email.send({
                    ...options,
                    subject: `test: ${options.subject}`
                })
                throw new Meteor.Error(err.code, err.message)
            }

            return {
                ...options,
                sendResult: true
            }
        }
        throw new Meteor.Error(prefix, 'Nothing to send')
    }
}

export default MailServices
