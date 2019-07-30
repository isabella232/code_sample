// import { EJSON } from 'meteor/ejson'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Rights from 'meteor/mcore/api/rights'
import {
    Container,
    Header,
    Feed,
    Divider,
    List
} from 'semantic-ui-react'
import PageHeader from '../components/PageHeader'

class ProfilePage extends Component {
    state = { }

    render() {
        return (
            <Fragment>
                <PageHeader title={i18n.__('ProfilePage')} />
                <Container>
                    <Header as="h2">
                        {Meteor.user().username}
                        {/* {EJSON.stringify(Meteor.user(), { indent: true })} */}
                        <Header.Subheader>
                            <List horizontal divided>
                                {Meteor.user().roles.map(role => (
                                    <List.Item key={role}>
                                        {role}
                                    </List.Item>
                                ))}
                            </List>
                        </Header.Subheader>
                    </Header>
                    <Divider />
                    <Feed>
                        {Rights.find({
                            role: { $in: Meteor.user().roles },
                            view: true
                        }).fetch().map(right => (
                            <Feed.Event key={right._id}>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <Feed.User>
                                            <Link to={`/admin/${right.collection}`}>{right.collection}</Link>
                                        </Feed.User>
                                        <Feed.Date>
                                            {right.role}
                                        </Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Meta>
                                        <List horizontal divided>
                                            <List.Item>
                                                view:
                                                {' '}
                                                {right.view.toString()}
                                            </List.Item>
                                            <List.Item>
                                                insert:
                                                {' '}
                                                {right.insert.toString()}
                                            </List.Item>
                                            <List.Item>
                                                update:
                                                {' '}
                                                {right.update.toString()}
                                            </List.Item>
                                            <List.Item>
                                                remove:
                                                {' '}
                                                {right.remove.toString()}
                                            </List.Item>
                                        </List>
                                        {/* EJSON.stringify(right, { indent: true }) */}
                                    </Feed.Meta>
                                </Feed.Content>
                            </Feed.Event>
                        ))}
                    </Feed>
                </Container>
            </Fragment>
        )
    }
}

export default ProfilePage
