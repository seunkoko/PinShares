import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './Layout.scss';

import AuthForm  from './AuthForm';
import Sidebar from './Sidebar';


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
                        <Route path="/" children={<AuthForm authType="login" />} />
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default Dashboard;
