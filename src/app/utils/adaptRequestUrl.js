/**
 * Changes the url of the api endpoint to the https equivalent url
 * @param {*} url 
 */
export const getHttpsUrl = url => {
    return url.replace(/http.*:80/, 'https://servizos.meteogalicia.gal:443');
}