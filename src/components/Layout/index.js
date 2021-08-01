import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './Layout.scss';

import AuthForm  from './AuthForm';


const Dashboard = () => {

	return (
		<Router>
			<div className="main">

				<div className="main-content-wrapper">
					<Switch>
						<Route path="/login" children={<AuthForm authType="login"/>} />
						<Route path="/signup" children={<AuthForm authType="signup"/>} />
                        <Route path="/" children={<AuthForm authType="login" />} />
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default Dashboard;
