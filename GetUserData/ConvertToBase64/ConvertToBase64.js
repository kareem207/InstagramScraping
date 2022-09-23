const axios = require('axios').default;

function getBase64(url) {

    if(url){
        return axios
            .get(url, {
            responseType: 'arraybuffer'
            })
            .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}
}

module.exports = getBase64;
