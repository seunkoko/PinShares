import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Form } from 'react-bootstrap';

import './Map.scss';

import MapComponent from './MapComponent';
import { blueIcon, purpleIcon, createPopup } from '../../../../utils/mapHelper';
import Multiselect from 'multiselect-react-dropdown';
import Modal from '../../../common/Modal';
import { fetchApi } from '../../../../utils/fetchApi';

const defaultMapCenter = [51.4, -0.09];


/**
 * Map.
 * 
 * Displays map with all necessary functions.
 * 
 * @param {object}    marker     Marker information from from API.
 * 
 * @return Map.
 * 
*/
const Map = ({ markers }) => {
	const [selectedMarker, setSelectedMarker] = useState(null);
	const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
	const [showModal, setModalShow] = useState(false);
	const [showShareModal, setShareModalShow] = useState(false);
	const [newMarkerName, setNewMarkerName] = useState('');
	const [usersToShareWith, setUsersToShareWith] = useState([]);
	const [users, setUsers] = useState([]);

	/**
	 * Gets all Users and set state.
	 * users - To populate share pin select dropdown.
	 */ 
	useEffect(() => {
		const asyncFetchApi = async () => await fetchApi('all_users', 'GET')

        asyncFetchApi()
        .then((data) => {
            if (data.status === 'success') {
                setUsers(data.data.users)
            }
        })
	}, []);

	/**
	 * Handle Add New Pin.
	 * 
	 * Gets selected marker and new marker name from state.
	 * Makes an api call to add new pin.
	 */ 
    const handleAddNewPin = async (e) => {
		e.preventDefault();

		const newMarker = {
			name: newMarkerName,
			latLng: [selectedMarker._latlng.lat, selectedMarker._latlng.lng]
		};
		
		const responseData = await fetchApi('pin', 'POST', newMarker)

		if (responseData.status === 'success') {
			newMarker['id'] = responseData.data.pin.id;
			newMarker['shared'] = responseData.data.pin.shared;

			markers.push(newMarker);
			setModalShow(!showModal);
			setNewMarkerName('');

			const info = `<div> ${newMarker.name} </div> <br />`;
			const popup = createPopup(newMarker, 'Share Pin', info, () => {
				setSelectedMarkerInfo(newMarker);
				setShareModalShow(!showShareModal)
			})
			selectedMarker.bindPopup(popup).openPopup();
		} else if (responseData.status === 'fail') {
			// display error message
		}
	};

	/**
	 * Handle Share Pin.
	 * 
	 * Gets selected users to share with.
	 * Makes an api call to share pin.
	 */ 
	const handleSharePinSubmit = async (e) => {
		e.preventDefault();

		const userIds = usersToShareWith.map(user => user.id);
		const pinId = selectedMarkerInfo.id;
		
		const responseData = await fetchApi(`share_pin/${pinId}`, 'POST', {
			user_ids: userIds
		})

		if (responseData.status === 'success') {
			setShareModalShow(!showShareModal);
		} else if (responseData.status === 'fail') {
			// display error message
		}
	};

	/**
	 * Handle Update Pin.
	 * 
	 * Gets selected marker to update.
	 * Makes an api call to update pin.
	 */ 
	const handleUpdatePin = async () => {
		const latLng = [selectedMarker._latlng.lat, selectedMarker._latlng.lng];

		const responseData = await fetchApi(`pin/${selectedMarkerInfo.id}`, 'PUT', {
			name: selectedMarkerInfo.name,
			latLng
		})
		
		if (responseData.status === 'success') {
			selectedMarkerInfo['id'] = responseData.data.pin.id;
			selectedMarkerInfo['name'] = responseData.data.pin.name;
		
			const info = `<div> ${selectedMarkerInfo.name} </div> <br />`;
			const popup = createPopup(selectedMarker, 'Share Pin', info, () => setShareModalShow(!showShareModal));
			selectedMarker.bindPopup(popup).openPopup();
		}
	};

	/**
	 * Update pin.
	 * 
	 * Binds popup to selected marker with necessary EventListeners.
	 */ 
	const updatePin = () => {
		const info = '<div> Do you like this new pin? Click to Update </div> <br />';

		const popup = createPopup(selectedMarker, 'Update Pin', info, handleUpdatePin);
		selectedMarker.bindPopup(popup).openPopup();
	};

	/**
	 * Create modal content for Share Pin.
	 */ 
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
							icon={marker.shared ? purpleIcon : blueIcon}
							key={marker.id}
							draggable={!marker.shared}
							eventHandlers={{
								dragstart: (e) => {
									setSelectedMarkerInfo(marker);
									setSelectedMarker(e.target);
								},
								dragend: (e) => {
									setSelectedMarkerInfo(marker);
									updatePin();
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
