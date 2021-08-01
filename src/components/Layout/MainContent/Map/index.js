import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap';

import './Map.scss';

import MapComponent from './MapComponent';
import { blueIcon, orangeIcon } from '../../../../utils/mapHelper';

const defaultMapCenter = [51.4, -0.09];


const Map = ({ markers }) => {
	const [selectedMarker, setSelectedMarker] = useState(null);
	const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
	const [users, setUsers] = useState([]);

    console.log(selectedMarker)
    console.log(markers)

	return (
		<div className="map-container">
			<MapContainer center={markers.length ? markers[0].latLng : defaultMapCenter} zoom={13}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{markers.map((marker) => {
					return (
						<Marker
							position={marker.latLng}
							icon={marker.shared ? orangeIcon : blueIcon}
							key={marker.id}
							draggable={!marker.shared}
							eventHandlers={{
								dragstart: (e) => {
									setSelectedMarkerInfo(marker);
								},
								dragend: (e) => {
									setSelectedMarkerInfo(marker);
								},
							}}
						>
							<Popup>
								<div>{marker.name} </div> <br />
								{!marker.shared ? (
									<Button
										variant="primary"
										onClick={(e) => {
											setSelectedMarkerInfo(marker);
										}}
									>
										Share Pin
									</Button>
								) : (
									<div>Shared by {marker.user.username}</div>
								)}
							</Popup>
						</Marker>
					);
				})}

				<MapComponent
					setMarkerToAdd={setSelectedMarker}
				/> 
			</MapContainer>
		</div>
	);
};

export default Map;
