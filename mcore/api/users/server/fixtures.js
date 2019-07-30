import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import { Accounts } from 'meteor/accounts-base'

const fixtures = (count = 1) => {
  // if (count === 0) {
  //   Meteor.users.remove({})
  // } else if (!Meteor.users.find().count()) {
  //   const users = [ {
  //     email: 'admin@attus.org',
  //     language: 'ru',
  //     password: 'adminattus',
  //     username: 'adminattus',
  //     roles: [ 'admin', 'user' ],
  //   }, {
  //     email: 'miniwe@mail.ru',
  //     language: 'ru',
  //     password: 'diamond',
  //     username: 'Miniwe',
  //     roles: [ 'admin', 'user' ],
  //   }, {
  //     email: 'logger@attus.org',
  //     language: 'en',
  //     password: 'logger123456',
  //     username: 'logger [do not remove role `logger`]',
  //     roles: ['logger'],
  //   } ]

  //   users.forEach(({ email, password, username, language, roles }) => {
  //     const userExists = Meteor.users.findOne({ 'emails.address': email })

  //     if (!userExists) {
  //       const userId = Accounts.createUser({ email, password, username, language })
  //       Roles.addUsersToRoles(userId, roles)
  //     }
  //   })
  // }
}

export default fixtures
