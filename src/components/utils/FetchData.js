export const postRequest = async ( { url, json, params, token } ) => {
    
    const headers = token
    ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
  body = json ? { body: JSON.stringify(json) } : {};

    const response = await fetch(url, { headers, ...body})
}