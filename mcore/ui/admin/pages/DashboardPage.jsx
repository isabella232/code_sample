import { Meteor } from 'meteor/meteor'
import React, { Component, Fragment } from 'react'
import {
    Grid, Container, Card, Icon, Menu, Button, Header,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import PageHeader from '../components/PageHeader'
import HelmetHead from '../../components/HelmetHead'

const emptyData = {
    total: 0,
    last: {
        id: '',
        name: '',
    }
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        link: '',
        current: true,
    }
]

class Dashboard extends Component {
    state = {
        data: {}
    }

    componentDidMount() {
        Meteor.call('admin.dashboard', (err, res) => {
            this.setState({
                data: {
                    ...this.state.data,
                    ...res
                }
            })
        })
    }

    doAction = (event, key) => {
        const el = event.target
        el.classList.add('loading')
        Meteor.call(`admin.${key}`, (err, res) => {
            el.classList.remove('loading')
            if (err) {
                toast.error(err.reason)
            } else {
                const confirmation = i18n.__('Action success')
                toast.success(confirmation)
            }
        })
    }

    render() {
        const { collections, actions } = this.props
        const user = Meteor.user()
        const collectionsList = Object.keys(collections).filter(collection => (
            user && collections.rights.findOne({ collection, view: true, role: { $in: user.roles } })
        ))

        const { data } = this.state
        return (
            <Fragment>
                <HelmetHead title={`${i18n.__('Dashboard')} | ${i18n.__('Admin')}`} />
                <PageHeader title={i18n.__(`Dashboard`)} breadcrumbs={breadcrumbs} />
                <Container>
                    <Grid stackable>
                        <Grid.Column width="12">
                            <Header as="h3" dividing content={i18n.__('Collections')} />
                            <Card.Group doubling itemsPerRow={3}>
                                {collectionsList.map((item, index) => {
                                    const slug = item.toLowerCase()
                                    const { total, last = { id: '', title: '' } } = data[slug] ? data[slug] : emptyData
                                    return (
                                        <Card color="blue" key={`${slug}`}>
                                            <Card.Content>
                                                <Card.Header as={Link} to={`/admin/${slug}`}>
                                                    <h3 style={{ textTransform: 'capitalize' }}>{i18n.__(item)}</h3>
                                                </Card.Header>
                                                <Card.Meta>
                                                    <div className="count">
                                                        {i18n.__('Count')}
                                                        {': '}
                                                        {total}
                                                    </div>
                                                    <div className="last">
                                                        {i18n.__('Last Updated')}
                                                        {': '}
                                                        <Link to={`/admin/${slug}/${last.id}/edit`}>
                                                            {last.title}
                                                        </Link>
                                                    </div>
                                                </Card.Meta>
                                            </Card.Content>
                                            <Card.Content extra>
                                                {'canInsertGetFromCollection//Todo' ? (
                                                    <Button fluid size="tiny" primary as={Link} to={`/admin/${slug}/new`}>
                                                        {i18n.__('New Record')}
                                                        <Icon name="right chevron" />
                                                    </Button>
                                                ) : null}
                                            </Card.Content>
                                        </Card>
                                    )
                                })}
                                <Card color='green'>
                                    <Card.Content>
                                        <Card.Header as={Link} to={`/admin/files`}>
                                            <h3>{i18n.__('Files')}</h3>
                                        </Card.Header>
                                        <Card.Meta>
                                            <span className='count'>{i18n.__('Count')}: {data && data.files ? data.files.total : 0}</span>
                                        </Card.Meta>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        </Grid.Column>
                        <Grid.Column width="4">
                            <Header as="h3" dividing content={i18n.__('Actions')} />
                            <Menu fluid vertical>
                                {actions.map(({ title, color, icon, key }) => (
                                    <Menu.Item
                                        color={color}
                                        icon={icon}
                                        key={key}
                                        content={i18n.__(title)}
                                        onClick={(event) => this.doAction(event, key)}
                                    />
                                ))}
                            </Menu>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ core: { collections, actions } }) => ({ collections, actions })

export default connect(mapStateToProps)(Dashboard)
