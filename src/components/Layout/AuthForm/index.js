import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import './AuthForm.scss';

const AuthForm = ({ history, authType }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const oppositeAuthType = authType === 'login' ? 'signup' : 'login'
	const infoToDisplay = {
		'signup': 'Already have an account? ',
		'login': 'Click here to '
	}

	return (
		<div className="auth-form-wrapper">
			<Form className="auth-form" onSubmit={() => {}}>
				<h3 className="auth-form-title">{authType}</h3>

				<Form.Group className="mb-3" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength={6}
						required
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Save
				</Button>

				<div className="mt-3 fs-6 text-muted">
					{infoToDisplay[authType]}

					<Link to={`/${oppositeAuthType}`}>
						{oppositeAuthType}
					</Link>
				</div>

			</Form>
		</div>
	);
};

export default withRouter(AuthForm);
