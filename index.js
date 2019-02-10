const express = require('express');

const app = express();

const orders = [
	{
		"id": 0,
		"clientId": 0,
		"date": "02.01.2019",
		"time": "18:30",
		"cart": [
			{
				"programId" : 0,
				"type": 0,
				"name": "Вера",
				"sale": 10,
				"quanity": 5,
				"days": [{"date": "02.01.19"}, {"date": "03.01.19"}, {"date": "04.01.19"}, {"date": "05.01.19"}, {"date": "06.01.19"}]
			},
			{
				"programId" : 1,
				"type": 2,
				"name": "Тимур",
				"sale": 10,
				"quanity": 5,
				"days": [{"date": "02.01.19"}, {"date": "03.01.19"}, {"date": "04.01.19"}, {"date": "05.01.19"}, {"date": "06.01.19"}]
			}
		]
	},
	{
		"id": 1,
		"clientId": 1,
		"date": "02.01.2019",
		"time": "22:30",
		"cart": [
			{
				"programId" : 0,
				"type": 0,
				"name": "Влад",
				"sale": 10,
				"quanity": 5,
				"days": [{"date": "02.01.19"}, {"date": "03.01.19"}, {"date": "04.01.19"}, {"date": "05.01.19"}, {"date": "06.01.19"}]
			}
		]
	}
];

app.get('/orders', function(req, res) {
	return res.send(orders);
});

app.listen(3333, function() {
	console.log('SERVER_ZAPUSHEN');
});
