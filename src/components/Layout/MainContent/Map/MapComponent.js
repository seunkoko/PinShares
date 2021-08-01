
import L from 'leaflet';
import { useMapEvents } from 'react-leaflet';

import { redIcon } from '../../../../utils/mapHelper'


const MapComponent = ({ setMarkerToAdd }) => {
	const map = useMapEvents({
		click: (location) => {
			const { latlng } = location;
			const markerPosition = { latlng: [latlng.lat, latlng.lng], shared: false };
			const newMarker = L.marker(markerPosition.latlng, { icon: redIcon }).addTo(map);

			setMarkerToAdd(newMarker);
		},
		locationfound: (location) => {
			map.flyTo(location.latlng, map.getZoom());
		},
	});

	map.locate();

	return (<> </>);
};

export default MapComponent;
