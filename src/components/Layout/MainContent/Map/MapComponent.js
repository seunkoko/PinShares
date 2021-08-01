
import L from 'leaflet';
import { Button, Form } from 'react-bootstrap';
import { useMapEvents } from 'react-leaflet';

import { createPopupContent, redIcon } from '../../../../utils/mapHelper'
import Modal from '../../../common/Modal';


const MapComponent = ({ setMarkerToAdd, setMarkerName, markerName, setModalShow, showModal, handleAddNewPin }) => {
	const map = useMapEvents({
		click: (location) => {
			const { latlng } = location;
			const markerPosition = { latlng: [latlng.lat, latlng.lng], shared: false };
			const newMarker = L.marker(markerPosition.latlng, { icon: redIcon }).addTo(map);
			
			setMarkerToAdd(newMarker);
			
			const popupMessage = '<div> Like this pin? </div> <br />';
			const button = L.DomUtil.create('button', 'btn btn-primary');
			button.innerHTML = 'Add Pin';
			button.addEventListener('click', () => setModalShow(!showModal))

			const popup = createPopupContent(popupMessage, button);
			newMarker.bindPopup(popup).openPopup();

			newMarker.getPopup().on('remove', () => {
				map.removeLayer(newMarker);
			});
		},
		locationfound: (location) => {
			map.flyTo(location.latlng, map.getZoom());
		},
	});

	map.locate();

	const addPinModalContent = () => {
		return (
			<Form onSubmit={handleAddNewPin}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Pin Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter pin name"
						name="newMarkerName"
						value={markerName}
						onChange={(e) => setMarkerName(e.target.value)}
						required
					/>
					<Form.Text className="text-muted">Name your pin.</Form.Text>
				</Form.Group>

				<Button variant="primary" type="submit">
					Save
				</Button>
			</Form>
		);
	};

	return (
		<Modal
			showModal={showModal}
			setModalShow={setModalShow}
			title="Want this Pin?"
			modalContent={addPinModalContent()}
			onModalClose={() => {
				setMarkerName('');
				setModalShow(!showModal);
			}}
		/>
	);
};

export default MapComponent;
