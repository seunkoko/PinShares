import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Form } from 'react-bootstrap';

import './Map.scss';

import MapComponent from './MapComponent';
import { blueIcon, orangeIcon, createPopup } from '../../../../utils/mapHelper';
import Multiselect from 'multiselect-react-dropdown';
import Modal from '../../../common/Modal';
import { fetchApi } from '../../../../utils/fetchApi';

const defaultMapCenter = [51.4, -0.09];


const Map = ({ markers }) => {
	const [selectedMarker, setSelectedMarker] = useState(null);
	const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
	const [showModal, setModalShow] = useState(false);
	const [showShareModal, setShareModalShow] = useState(false);
	const [newMarkerName, setNewMarkerName] = useState('');
	const [usersToShareWith, setUsersToShareWith] = useState([]);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const asyncFetchApi = async () => await fetchApi('all_users', 'GET')

        asyncFetchApi()
        .then((data) => {
            if (data.status === 'success') {
                setUsers(data.data.users)
            }
        })
	}, []);

    const handleAddNewPin = async (e) => {
		e.preventDefault();

		const newMarker = {
			name: newMarkerName,
			latLng: [selectedMarker._latlng.lat, selectedMarker._latlng.lng]
		};
		
		console.log(newMarker)
	};

	const handleSharePinSubmit = async (e) => {
		e.preventDefault();

		const userIds = usersToShareWith.map(user => user.id);
		const pinId = selectedMarkerInfo.id;
		console.log('Make an api call to share pin', selectedMarkerInfo, 'with', userIds);
	};

	const handleUpdateMarker = async () => {
		console.log('Make an api call to update marker position');
	};

	const updateMarker = () => {
		const info = '<div> Do you like this new pin? Click to Update </div> <br />';

		const popup = createPopup(selectedMarker, 'Update Pin', info, handleUpdateMarker);
		selectedMarker.bindPopup(popup).openPopup();
	};

	const sharePinModalContent = () => {
		return (
			<Form onSubmit={handleSharePinSubmit}>
				<Multiselect
					options={users} // options to display in the dropdown
					selectedValues={usersToShareWith}
					onSelect={(selectedUsers) => setUsersToShareWith(selectedUsers)}
					onRemove={(selectedUsers) => setUsersToShareWith(selectedUsers)}
					displayValue="username" 
					selectionLimit={10}
					closeOnSelect={false}
					showArrow={true}
				/>

				<Button variant="primary" className="mt-3" type="submit">
					Share
				</Button>
			</Form>
		);
	};

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
									setSelectedMarker(e.target);
								},
								dragend: (e) => {
									setSelectedMarkerInfo(marker);
									updateMarker();
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
											setShareModalShow(!showShareModal);
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
					setMarkerName={setNewMarkerName}
					markerName={newMarkerName}
					setMarkerToAdd={setSelectedMarker}
					setModalShow={setModalShow}
					showModal={showModal}
					handleAddNewPin={handleAddNewPin}
				/> 

				<Modal
					showModal={showShareModal}
					setModalShow={setShareModalShow}
					title="Share this Pin?"
					modalContent={sharePinModalContent()}
					onModalClose={() => {
						setNewMarkerName('');
						setUsersToShareWith([]);
						setShareModalShow(!showShareModal);
					}}
				/>
			</MapContainer>
		</div>
	);
};

export default Map;
