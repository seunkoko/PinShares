import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './Layout.scss';

import AuthForm  from './AuthForm';
import Sidebar from './Sidebar';
import MainContent from './MainContent';


/**
 * Dashboard.
 * 
 * Displays dashboard with Sidebar Component, AuthForm Component and MainContent.
 * Dashboard display is determined by the routes.
 * 
 * @return Dashboard.
 * 
*/
const Dashboard = () => {
    const [toggled, setToggled] = useState(false)

    const handleToggleSidebar = (value) => {
        setToggled(value)
    }

	return (
		<Router>
			<div className="main">
                <Sidebar className="main-sidebar" handleToggleSidebar={handleToggleSidebar} toggled={toggled} />

				<div className="main-content-wrapper">
					<Switch>
						<Route path="/login" children={<AuthForm authType="login"/>} />
						<Route path="/signup" children={<AuthForm authType="signup"/>} />
                        <Route path="/:id" children={<MainContent handleToggleSidebar={handleToggleSidebar} />} />
						<Route path="/" children={<MainContent handleToggleSidebar={handleToggleSidebar} />} />
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default Dashboard;
