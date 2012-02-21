var XMLMapping = require('../lib/xml-mapping.js'),
	fs = require('fs');

fs.readFile('sample01.xml', 'utf-8',  function(err,data) {
		if (err) {
			console.error("Could not open file: %s", err);
			process.exit(1);
		}
		console.log(XMLMapping.load(data));
});
