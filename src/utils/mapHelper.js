import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiPositionMarker } from 'react-icons/gi';

/**
 * Generate Icon.
 * 
 * Creating Icons using Leaflet divIcon.
 * 
 * @param {string}     color    Icon color.
 * 
 * @return Leaflet Icon.
 * 
*/
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

/* Generates different Icon colors to export */
export const blueIcon = generateIcon('blue');
export const redIcon = generateIcon('red');
export const purpleIcon = generateIcon('purple');


/**
 * Create Popup Content.
 * 
 * Create popup contents for Leaflet markers.
 * 
 * @param {string}     info      Popup display info.
 * @param {object}     button    Button object with EventListeners attached.
 * 
 * @return Leaflet Icon.
 * 
*/
export const createPopupContent = (info, button) => {
	const container = L.DomUtil.create('div');
	const popup = L.popup();

	container.innerHTML = info;
	container.appendChild(button);
	popup.setContent(container);

	return popup;
};


/**
 * Create Popup.
 * 
 * Create popup contents for Leaflet markers for more common buttons.
 * 
 * @param {object}     marker          Leaflet marker object.
 * @param {string}     buttonText      Text info to display in the button.
 * @param {string}     info            Popup display info.
 * @param {function}   handler         Function for Button event to perform.
 * 
 * @return Leaflet Icon.
 * 
*/
export const createPopup = (marker, buttonText, info, handler) => {
	const button = L.DomUtil.create('button', 'btn btn-primary');
	button.innerHTML = buttonText;
	button.addEventListener('click', (e) => handler(e, marker));

	return createPopupContent(info, button);
};

