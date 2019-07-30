import React, { Component, Fragment } from 'react'
import {
    Container
} from 'semantic-ui-react'
import PageHeader from '../components/PageHeader'

class NotFoundPage extends Component {
    render() {
        return (
            <Fragment>
                <PageHeader title={'PageNotFound'} />
                <Container>
                    Page Not Found
                </Container>
            </Fragment>
        )
    }
}

export default NotFoundPage
