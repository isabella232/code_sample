import React, { Component } from 'react'
import { Segment, Container, Divider } from 'semantic-ui-react'
import { pkginfo } from 'meteor/mcore'

class AdminFooter extends Component {
    render() {
        return (
            <Segment basic tertiary>
                <Container text>
                    <Divider inverted horizontal>
                        {i18n.__('Designed by')} <a href={`mailto:${pkginfo.email}`}>{pkginfo.author} 2019</a>
                        {' | '}
                        version: {pkginfo.version}
                    </Divider>
                </Container>
            </Segment>
        )
    }
}

export default AdminFooter
