import { Button, Modal } from 'react-bootstrap';

/**
 * Modal.
 * 
 * Displays and closes modal.
 * 
 * @param {boolean}    showModal            Show modal.
 * @param {function}   setModalShow         Function to set modal appearance.
 * @param {string}     title                Modal Title.
 * @param {jsx}        modalContent         Modal content.
 * @param {function}   onModalClose         Function for Modal to perform on close.
 * 
 * @return Modal.
 * 
*/
const MSModal = ({ showModal, setModalShow, title, modalContent, onModalClose }) => {
	return (
		<Modal show={showModal} onHide={setModalShow}>
			<Modal.Header>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{modalContent}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onModalClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default MSModal;
