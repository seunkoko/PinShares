import { Button, Modal } from 'react-bootstrap';

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
