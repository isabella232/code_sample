import React, { Component } from 'react'
import { Segment, Container, Menu } from 'semantic-ui-react'

class PageHeader extends Component {
    render() {
        const { title = i18n.__('Admin'), children } = this.props
        return (
            <Segment inverted className="admin-page-header">
                <Container>
                    <Menu inverted secondary>
                        <Menu.Item header style={{ textTransform: 'uppercase',  fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>
                            {i18n.__(title)}
                        </Menu.Item>
                        {children}
                    </Menu>
                </Container>
            </Segment>
        )
    }
}

export default PageHeader
