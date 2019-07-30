import React, { Component } from 'react'
import { HTTP } from 'meteor/http'
import connectField from 'uniforms/connectField'
// import AutoField from 'uniforms-semantic/AutoField'
// import { Form } from 'semantic-ui-react'
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const { googleMapKey } = Meteor.settings.public

const getCoords = () => {
    HTTP.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value.searchString.replace(/[^\w]/g, ' ')}&key=${googleMapKey}`, {}, (err, res) => {
        const { statusCode, data: { results } } = res
        if (statusCode === 200 && results.length) {
            const { geometry: { location } } = results.shift()
            onChange({
                geoType: 'searchstring',
                searchString: value.searchString,
                zoom: 15,
                latitude: location.lat,
                longitude: location.lng,
            })
            const markers = [{
                title: value.searchString,
                position: location
            }]
            this.setState({ center: location, markers })
        }
    })
}

class Geolocation extends Component {
    state = {}

    render() {
        const position = [51.505, -0.09]

        return (
            <div>
            <h3>
                Geolocation
            </h3>
{/*                 <Map center={position} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={position}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                </Map> */}

            </div>
        )
    }
}

export default connectField(Geolocation, { includeInChain: true, includeParent: true })
