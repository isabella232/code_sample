import Collection from './api/collection'

import * as Components from './ui/components'
import * as Auth from './ui/auth'

export const name = 'Admin Project'

export { default as routes } from './ui/admin/routes'
export { default as pkginfo } from './pkginfo'

const UI = {
    Auth,
    Components
}
const API = {
    Collection
}
export {
    UI,
    API
}
