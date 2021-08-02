import { getToken } from "./helper";


/**
 * Fetch API.
 * 
 * For making requests to the backend APIs.
 * 
 * @param {string}      uri        Uniform resource identifier.
 * @param {string}      method     Request method.
 * @param {object}      body       Request body.
 * 
 * @return {object} Response from the request.
 * 
*/
export const fetchApi = async (uri, method, body=null) => {
    const url = `${process.env.REACT_APP_BASEAPIURL}${uri}`
    const requestData = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'authorization': getToken()
            }
    }

    if (body) requestData['body'] = JSON.stringify(body);

    const response = await fetch(url, requestData);
    return await response.json();
};
