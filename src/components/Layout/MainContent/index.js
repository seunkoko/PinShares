import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useParams } from 'react-router';
import { withRouter } from 'react-router-dom';
import { fetchApi } from '../../../utils/fetchApi';
import { getToken } from '../../../utils/helper';

import './MainContent.scss';

import Map from './Map';


/**
 * MainContent.
 * 
 * Displays main content when a user is logged in.
 * 
 * @param {BrowserHistory}    history              Browser History from React Router.
 * @param {function}          handleToggleSidebar  Function to open sidebar on mobile.
 * 
 * @return MainContent.
 * 
*/
const MainContent = ({ history, handleToggleSidebar }) => {
	const [markers, setMarkers] = useState([]);
    
    if (!getToken()) history.push('/login')
    let { id } = useParams();

    useEffect(() => {
        const asyncFetchApi = async () => await fetchApi('user_info', 'GET')

        asyncFetchApi()
            .then((data) => {
                if (data.status === 'success') {
                    if (id === 'shared') setMarkers(data.data.user.shares)
                    else if (id === 'my-pins') setMarkers(data.data.user.my_pins)
                    else setMarkers(data.data.user.all_pins)
                }
            })
    }, [id])

	return (
		<>
			<div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
				<FaBars />
			</div>
			<div className="main-content">
                <Map id={id} markers={markers} />
			</div>
		</>
	);
};

export default withRouter(MainContent);
