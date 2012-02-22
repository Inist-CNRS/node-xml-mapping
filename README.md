# xml2json and json2xml for NodeJS

It's native javascript implementation of bidirectionnal mapping between XML and JS data structure (aka JSON)",
You can convert any type of XML documents in an Javascript data structure.
You can also do the reverse, converting a Javascript data structure in XML String. XML is still valid.

# Installation

With [npm](http://npmjs.org) do:

    $ npm install xml-mapping


# Usage

	var xm = require('xml-mapping');
    
	var json = xm.load('<key>value</key>');
    var xml  = xm.dump(json);
    
	console.log(xml,json);

Output:

    <key>value</key> { key: { '$t': 'value' } }


# Tests

Use [nodeunit](https://github.com/caolan/nodeunit) to run the tests.

    $ npm install nodeunit
    $ nodeunit test

# API Documentation

## load(String xml)
Transform a string with XML in Javascript data structure (JSON). Return Object.

## Dump(Object json)
Transform a Javascript data structure (JSON) in XML string. Return String.

# Also

* https://github.com/estheban/node-json2xml
* https://github.com/buglabs/node-xml2json

# License

[MIT/X11](./LICENSE)
