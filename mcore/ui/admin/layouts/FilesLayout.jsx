import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import { Container } from 'semantic-ui-react'

class FilesLayout extends Component {
    state = {}

    render() {
        const { route } = this.props
        return (
            <Container fluid style={{ marginTop: '-2.9rem' }}>
                {renderRoutes(route.routes)}
            </Container>
        )
    }
}

export default FilesLayout
