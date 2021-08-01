import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiPositionMarker } from 'react-icons/gi';

export const generateIcon = (color) => {
	const iconMarkup = renderToStaticMarkup(
			<GiPositionMarker className={`position-marker position-marker-${color}`} />
	)
	
	return L.divIcon({
		html: iconMarkup,
		shadowUrl: 'assets/shadowMarker.png',
		shadowSize: [50, 64],
		shadowAnchor: [100, 100],
		iconAnchor: [22, 55],
		popupAnchor: [0, -55],
	});
}

export const blueIcon = generateIcon('blue');
export const redIcon = generateIcon('red');
export const orangeIcon = generateIcon('orange');

export const createPopupContent = (info, button) => {
	const container = L.DomUtil.create('div');
	const popup = L.popup();

	container.innerHTML = info;
	container.appendChild(button);
	popup.setContent(container);

	return popup;
};
