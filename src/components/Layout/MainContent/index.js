import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useParams } from 'react-router';
import { withRouter } from 'react-router-dom';
import { getToken } from '../../../utils/helper';

import './MainContent.scss';

const defaultMarkers = [{
        modified_at: "2021-08-01T11:49:48.646096",
        is_active: true,
        created_at: "2021-08-01T11:36:03.883489",
        name: "updated seunkoko1 Pin",
        latLng: [
            4.0,
            6.0
        ],
        user: {
            "username": "seunkoko1",
            id: "-Mg0AaFSPQ8DRTVzEp8H"
        },
        id: "-Mg0UyFeajwiIvaju8hA",
        shared: false,
        user_id: "-Mg0AaFSPQ8DRTVzEp8H"
    },
    {
        modified_at: "2021-08-01T11:49:48.646096",
        is_active: true,
        created_at: "2021-08-01T11:36:03.883489",
        name: "updated seunkoko1 Pin",
        latLng: [
            4.0,
            6.0
        ],
        user: {
            "username": "seunkoko2",
            id: "-Mg0AaFSPQ8DRTVzEp8H"
        },
        id: "-Mg0UyFeajwiIvaju8hA",
        shared: false,
        user_id: "-Mg0AaFSPQ8DRTVzEp8H"
    }
]

const MainContent = ({ history, handleToggleSidebar }) => {
	const [markers, setMarkers] = useState(defaultMarkers);

    let { id } = useParams();
    if (!getToken()) history.push('/login')

	return (
		<>
			<div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
				<FaBars />
			</div>
			<div className="main-content">
			</div>
		</>
	);
};

export default withRouter(MainContent);
