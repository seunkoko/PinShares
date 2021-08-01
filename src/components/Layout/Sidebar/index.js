import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SidebarContent, SidebarHeader } from 'react-pro-sidebar';
import { GiPositionMarker } from 'react-icons/gi';
import { FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';

import './Sidebar.scss';

const Sidebar = ({ history, collapsed, toggled, handleToggleSidebar }) => {

	return (
		<ProSidebar collapsed={collapsed} toggled={toggled} breakPoint="lg" onToggle={handleToggleSidebar}>
			<SidebarHeader>
				<div className="sidebar-title">PinShares</div>
			</SidebarHeader>

			<SidebarContent>
				<Menu iconShape="square">
						<>
							<MenuItem icon={<GiPositionMarker />}>
								All Pins
								<Link to="/" />
							</MenuItem>
							<MenuItem icon={<GiPositionMarker />}>
								My Pins
								<Link to="/my-pins" />
							</MenuItem>
							<MenuItem icon={<GiPositionMarker />}>
								Shared Pins
								<Link to="/shared" />
							</MenuItem>{' '}
							<MenuItem
								icon={<FiLogOut />}
								onClick={() => {
									console.log('logout')
								}}
							>
								Logout
							</MenuItem>
							<MenuItem icon={<FiLogIn />}>
								Login
								<Link to="/login" />
							</MenuItem>
							<MenuItem icon={<FiUser />}>
								SignUp
								<Link to="/signup" />
							</MenuItem>
						</>
				</Menu>
			</SidebarContent>
		</ProSidebar>
	);
};

export default withRouter(Sidebar);