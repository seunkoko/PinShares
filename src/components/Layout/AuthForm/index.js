import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import './AuthForm.scss';

import { fetchApi } from '../../../utils/fetchApi';
import { setToken } from '../../../utils/helper';


/**
 * AuthForm.
 * 
 * Displays Login / SignUp Forms.
 * 
 * @param {BrowserHistory}  history          Browser History from React Router.
 * @param {string}          authType         Auth type which is either Login or Signup.
 * 
 * @return AuthForm.
 * 
*/
const AuthForm = ({ history, authType }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const oppositeAuthType = authType === 'login' ? 'signup' : 'login'
	const infoToDisplay = {
		'signup': 'Already have an account? ',
		'login': 'Click here to '
	}

	/* On Submit 
	 * Makes API call to login or signup users 
	*/
	const onSubmit = async (e) => {
		e.preventDefault();

		const responseData = await fetchApi(authType, 'POST', { username, password })
		if (responseData.status === 'success') {
			setErrorMessage('')
			setToken(responseData.data.token);
			history.push('/');
		}

		if (responseData.status === 'fail') {
			setErrorMessage(responseData.data.message)
		}
	}

	return (
		<div className="auth-form-wrapper">
			<Form className="auth-form" onSubmit={onSubmit}>
				{errorMessage &&
					<div className="mb-2 fs-6 text-danger">{errorMessage}</div>
				}
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

				<Button variant="primary text-capitalize" type="submit">
					{authType}
				</Button>

				<div className="mt-3 fs-6 text-white-50">
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
