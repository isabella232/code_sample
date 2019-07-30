import React from 'react'
import {
    Dimmer, Loader, Segment, Container
} from 'semantic-ui-react'

const AppLoader = ({ msg = ' ' }) => (
    <Container text className="app-loader">
        <Segment basic padded="very">
            <Dimmer active inverted>
                <Loader inverted>
                    {msg}
                </Loader>
            </Dimmer>
        </Segment>
    </Container>
)

export default AppLoader
