import { getToken } from "./helper";


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
