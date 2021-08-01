import React from 'react';
import { Form } from 'react-bootstrap';
import { withRouter } from 'react-router';

import './AuthForm.scss';

const AuthForm = ({ history, authType }) => {

	return (
		<div className="auth-form-wrapper">
			<Form className="auth-form" onSubmit={() => {}}>
				<h3 className="auth-form-title">{authType}</h3>
				
			</Form>
		</div>
	);
};

export default withRouter(AuthForm);
