import React from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'

const { public: { siteName } } = Meteor.settings

const HelmetHead = (props) => {
    const {
        title,
        description = '',
        keywords,
        url = Meteor.settings.public.domain,
        ...rest
    } = props
    return (
        <Helmet defaultTitle={siteName} titleTemplate={`%s | ${siteName}`}>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />
        </Helmet>
    )
}
export default withRouter(HelmetHead)
