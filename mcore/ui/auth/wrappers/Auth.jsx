import React from 'react'
import { Container, Grid, Card } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

const { public: { siteName } } = Meteor.settings


const Auth = ({ component, authenticated, ...props }) => !authenticated ? (
    <Container text className="auth-container">
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Card raised fluid>
                    <Card.Content>
                        <Card.Header as='h2' color='blue' textAlign='center'>
                            {i18n.__('Welcome to')} <Link to="/">{siteName}</Link> {i18n.__('Administration')}
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        {React.createElement(component, { ...props, authenticated })}
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>
    </Container>
) : <Redirect to='/' />

export default Auth
