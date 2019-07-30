import React from 'react'
import { HTTP } from 'meteor/http'
import connectField from 'uniforms/connectField'
import get from 'lodash/get'
import AutoField from 'uniforms-semantic/AutoField'
import { Form } from 'semantic-ui-react'
import { compose, withProps, lifecycle } from 'recompose'
import {
    withScriptjs, withGoogleMap, GoogleMap, Marker
} from 'react-google-maps'
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'


const { googleMapKey } = Meteor.settings.public

const AddressWithMapAndSearch = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '250px' }} />,
        containerElement: <div className="field" />,
        mapElement: <div className="ui segment" style={{ height: '250px' }} />,
    }),
    lifecycle({
        componentDidMount() {
            const refs = {}
            const { value = {}, onChange } = this.props
            if (!value.searchString) {
                value.searchString = ''
            }
            if (!value.zoom) {
                value.zoom = 16
            }
            if (value.geoType === 'searchstring' && value.searchString ){
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
            } else {
                if (!value.latitude) {
                    value.latitude = 41.9
                }
                if (!value.longitude) {
                    value.longitude = -87.624
                }
            }
            this.setState({
                bounds: null,
                zoom: value.zoom,
                center: {
                    lat: parseFloat(value.latitude),
                    lng: parseFloat(value.longitude),
                },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref
                },
                onBoundsChanged: () => {
                    const places = refs.searchBox.getPlaces() || []
                    onChange({
                        geoType: 'searchstring',
                        searchString: places.length ? places.shift().formatted_address : this.props.value.searchString,
                        zoom: refs.map.getZoom(),
                        latitude: refs.map.getCenter().lat(),
                        longitude: refs.map.getCenter().lng(),
                    })
                },
                onStandaloneSearchBoxMounted: ref => {
                    refs.searchBox = ref
                },
                onDblClick: () => {
                    const nextCenter = {
                        lat: refs.map.getCenter().lat(),
                        lng: refs.map.getCenter().lng(),
                    }
                    const newMarker = {
                        title: 'New Place',
                        position: {
                            lat: refs.map.getCenter().lat(),
                            lng: refs.map.getCenter().lng(),
                        }
                    }
                    this.setState({
                        center: nextCenter,
                        zoom: refs.map.getZoom(),
                        markers: [newMarker]
                    })
                    onChange({
                        geoType: 'geocoordinates',
                        searchString: this.props.value.searchString,
                        zoom: refs.map.getZoom(),
                        longitude: refs.map.getCenter().lng(),
                        latitude: refs.map.getCenter().lat(),
                    })
                },
                onPlacesChanged: () => {

                    const places = refs.searchBox.getPlaces()
                    const bounds = new google.maps.LatLngBounds()
                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.lawyer)
                        }
                    })

                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location
                    }))
                    const nextCenter = get(nextMarkers, '0.position', this.state.center)
                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    })
                    // refs.map.fitBounds(bounds)
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap,
)(props => {
    const {
        value,
        onChange,
    } = props
    return (
        <div className="outerMapContainer">
            <GoogleMap
                ref={props.onMapMounted}
                defaultZoom={Number(props.zoom)}
                center={props.center}
                onDblClick={props.onDblClick}
                onBoundsChanged={props.onBoundsChanged}
            >
                {props.markers.map((marker, index) =>
                    <Marker key={index} position={marker.position} />
                )}
            </GoogleMap>

            <div className="ui fields">
                <AutoField name="geoType" value={value.geoType} />
                <Form.Field width={10}>
                    <label>
                        {i18n.__('Search String')}
                    </label>
                    <StandaloneSearchBox
                        ref={props.onStandaloneSearchBoxMounted}
                        bounds={props.bounds}
                        onPlacesChanged={props.onPlacesChanged}
                    >
                        <input
                            type="text"
                            placeholder={props.searchString}
                            defaultValue={value.searchString}
                            onChange={(event) => onChange({ ...value, searchString: event.target.value })}
                            onKeyPress={(event) => { if (event.which === 13) { event.preventDefault() } }}
                        />
                    </StandaloneSearchBox>
                </Form.Field>
                <AutoField name="zoom" value={value.zoom} />
            </div>
        </div>
    )
})

export default connectField(AddressWithMapAndSearch, { includeInChain: true, includeParent: true })
