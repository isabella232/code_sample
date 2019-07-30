import Admin from './Admin'
import {
    ProfilePage, DashboardPage, FilesPage,
    CollectionPage, NewPage, EditPage, ViewPage,
    NotFoundPage
} from './pages'

const prefix = '/admin'
const routes = collectionsList => ([{
    component: Admin,
    routes: [
        {
            name: 'root',
            path: prefix,
            exact: true,
            component: DashboardPage,
            title: 'Alt Page',
        },
        {
            name: 'profile',
            path: `${prefix}/profile`,
            exact: true,
            component: ProfilePage,
            title: 'Profile',
        },
        {
            path: `${prefix}/files`,
            exact: true,
            component: FilesPage,
            title: 'Files',
        },
        {
            path: `${prefix}/files/browser`,
            exact: true,
            component: FilesPage,
            title: 'Files',
        },
        {
            path: `${prefix}/:prefix(${collectionsList})/:id?`,
            component: CollectionPage,
            title: 'CollectionPage',
            routes: [
                {
                    path: `${prefix}/:prefix(${collectionsList})/new`,
                    component: NewPage,
                    exact: true,
                    title: 'New',
                },
                {
                    path: `${prefix}/:prefix(${collectionsList})/:id`,
                    exact: true,
                    component: ViewPage,
                    title: 'View',
                },
                {
                    path: `${prefix}/:prefix(${collectionsList})/:id/edit`,
                    exact: true,
                    component: EditPage,
                    title: 'Edit',
                }
            ],
        },
        {
            name: 'admin_page_not_found',
            path: `${prefix}/*`,
            component: NotFoundPage,
            title: 'Page Not Found',
        }
    ],
}])

export default routes
