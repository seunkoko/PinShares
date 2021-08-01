
import L from 'leaflet';
import { useMapEvents } from 'react-leaflet';

import { createPopupContent, redIcon } from '../../../../utils/mapHelper'


const MapComponent = ({ setMarkerToAdd, setModalShow, showModal }) => {
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

	return (<> </>);
};

export default MapComponent;
