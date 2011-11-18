var XMLMapping = require('../');
var input;
var output;

exports['t00'] = function (test) {
	input = {};
	output = XMLMapping.dump(input);
	test.equal(output, '<row/>') 
	input = 'string';
	output = XMLMapping.dump(input);
	test.equal(output, 'string') 
	input = 1234;
	output = XMLMapping.dump(input);
	test.equal(output, 1234) 
	test.done();
};
exports['t01'] = function (test) {
	input = { 
		key : {}
	};
	output = XMLMapping.dump(input);
	test.equal(output, '<key/>');
	input = {
		key : {
			key1: 'value'
		}
	};
	output = XMLMapping.dump(input);
	test.equal(output, '<key key1="value"/>');
	input = {
		key : {
			key1: 'value1',
			key2: 'value2'
		}
	};
	output = XMLMapping.dump(input);
	test.equal(output, '<key key1="value1" key2="value2"/>');
	test.done();
};
exports['t02'] = function (test) {
	input = { 
		key1 : {},
		key2 : {}
	};
	output = XMLMapping.dump(input);
	test.equal(output, '<row><key1/><key2/></row>'); 
	input = {
		key1 : {
			key: 'value'
		},
		key2 : {
			key: 'value'
		}
	};
	output = XMLMapping.dump(input);
	test.equal(output, '<row><key1 key="value"/><key2 key="value"/></row>'); 
	input = {
		key1 : {
			keyA: 'value1',
			keyB: 'value2'
		},
		key2 : {
			keyA: 'value1',
			keyB: 'value2'
		}
	};
	output = XMLMapping.dump(input);
	test.equal(output, '<row><key1 keyA="value1" keyB="value2"/><key2 keyA="value1" keyB="value2"/></row>');
	test.done();
};
exports['t03'] = function (test) {
	input = {
		key : []
	};
	output = XMLMapping.dump(input);
	test.equal(output, '<key/>'); 
	input = {
		key : [{},{}]
	};
	output = XMLMapping.dump(input);
	test.equal(output, '<key/>'); 
	input = {
		key : [{ $t : 'value'}, {$t : 'value'}]
	};
	output = XMLMapping.dump(input);
	test.equal(output, '<row><key>value</key><key>value</key></row>'); 
	test.done();
};
/*
exports['t04'] = function (test) {
	input = {
		'#text' : 'value'
	};
	output = XMLMapping.dump(input);
	test.equal(output, 'value');
	input = {
		$t : 'value'
	};
	output = XMLMapping.dump(input);
	test.equal(output, 'value');
	input = {
		key : {
			$t : 'value'
		}
	};
	output = XMLMapping.dump(input);
	test.equal(output, '<key>value</key>');
	test.done();
};
*/
