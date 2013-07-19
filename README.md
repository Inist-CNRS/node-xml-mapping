# xml2json and json2xml for NodeJS

[![Build Status](https://secure.travis-ci.org/touv/node-xml-mapping.png?branch=master)](http://travis-ci.org/touv/node-xml-mapping)

It's native javascript implementation of a bidirectional converter between XML and JS data structure (aka JSON).
You can convert any type of XML documents in an Javascript data structure.
You can also do the reverse, converting a Javascript data structure in XML String. XML is still valid.

## Contributors

  * [Nicolas Thouvenin](https://github.com/touv) 
  * [Joe Ibershoff](https://github.com/zacronos)
  * [Yura Zenevich](https://github.com/yzen)
  * [Thorsten Lorenz](https://github.com/thlorenz)
  * [ntgn81](https://github.com/ntgn81)

# Installation

With [npm](http://npmjs.org) do:

    $ npm install xml-mapping


# Usage
```javascript
var xm = require('xml-mapping');

var json = xm.load('<key>value</key>');
var xml  = xm.dump(json);

console.log(xml,json);
console.log(json);
```

Output:

    <key>value</key> { key: { '$t': 'value' } }

# Convention

The rules for converting XML to JSON are those used by Google in its GData protocol. More information here : http://code.google.com/apis/gdata/docs/json.html

# Tests

Use [nodeunit](https://github.com/caolan/nodeunit) to run the tests.

    $ npm install nodeunit
    $ nodeunit test

# API Documentation

## load(String xml, Object options)
Transform a string with XML in Javascript data structure (JSON). 
**Return Object.**

###Options

**Warning : options break the symmetry. This means that the JSON generated may not reproduce the same XML**

* `throwErrors` - *boolean* - Flag to throw errors of the SAX Parser ; *default : false*
* `nested` - *boolean* - Flag to ignore nested tags inside text : *default : false*

```javascript
var xml = '<title>Title is <strong>important</strong></title>';
var json = XMLMapping.load(xml, { nested: true });
console.log(json);

// Should output:
// { title : { $t : 'Title is<strong>important</strong>', strong: { '$t': 'important' }} }
```

* `arrays` - *array* - an array of basic XPath strings that specify XML nodes that should be array, even when there is only one such node.

```javascript
var xml = '<key1>value1</key1><key2><key3>value3</key3></key2>';
var json = XMLMapping.load(xml, {
 arrays: [
  '/key1',
  '/key2/key3'
 ]
});
console.log(json);

// Should output:
// (Note that value of key1 and key3 are arrays, as specified in options)
// {"key1":[{"$t":"value1"}],"key2":{"key3":[{"$t":"value3"}]}}
```


## dump(Object json)
Transform a Javascript data structure (JSON) in XML string. **Return String.**

## tojson(String xml)
Alias of load.

## toxml(Object json)
Alias of dump.

# Also

* https://github.com/estheban/node-json2xml
* https://github.com/buglabs/node-xml2json

# License

[MIT/X11](https://raw.github.com/touv/node-xml-mapping/master/LICENSE)
