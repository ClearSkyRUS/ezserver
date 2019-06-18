import https from 'https';

const options = {
  host: 'api.forismatic.com',
  path: '/api/1.0/?method=getQuote&key=457653&format=json&lang=ru'
};

const getQuote = callback => {
	sendRequest(res => {
		if (res.errno)
			return callback(res);

		var output = '';
        res.setEncoding('utf8');

        res.on('data', chunk => {
            output += chunk;
        });

        res.on('end', () => {
            var obj = JSON.parse(output);
            callback(obj);
        });
	})
}

const sendRequest = callback => { 
	const req = https.request(options, callback);
	req.on('error', err => {
		callback(err);
	})
	req.end(); 
}

export default getQuote;