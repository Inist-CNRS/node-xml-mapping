var XMLMapping = require('../');
var input;

exports['t00'] = function (test) {
	input = '<row/>';
	test.deepEqual(XMLMapping.load(input), {});
//    input = 'string';
//    test.equal(XMLMapping.load(input), 'string');
//    input = 1234;
//    test.equal(XMLMapping.load(input), 1234);
	test.done();
};
exports['t01'] = function (test) {
	input = '<key/>';
	test.deepEqual(XMLMapping.load(input), { key : {} });
	input = '<key key1="value"/>';
	test.deepEqual(XMLMapping.load(input), { key : { key1: 'value' } });
	input = '<key key1="value1" key2="value2"/>';
	test.deepEqual(XMLMapping.load(input), { key : { key1: 'value1', key2: 'value2' } });
	test.done();
};
exports['t02'] = function (test) {
	input = '<row><key1/><key2/></row>';
	test.deepEqual(XMLMapping.load(input), { key1 : {}, key2 : {} }); 
	input = '<row><key1 key="value"/><key2 key="value"/></row>';
	test.deepEqual(XMLMapping.load(input), { key1 : { key: 'value' }, key2 : { key: 'value' } }); 
	input = '<row><key1 keyA="value1" keyB="value2"/><key2 keyA="value1" keyB="value2"/></row>';
	test.deepEqual(XMLMapping.load(input), { key1 : { keyA: 'value1', keyB: 'value2' }, key2 : { keyA: 'value1', keyB: 'value2' } });
	test.done();
};
exports['t03a'] = function (test) {
	input = '<key/>';
	test.deepEqual(XMLMapping.load(input), { key : [] }); 
	test.done();
}
exports['t03b'] = function (test) {
	input = '<key/><key/>';
	test.deepEqual(XMLMapping.load(input), { key : [{},{}] }); 
	input = '<key/><key/><key/>';
	test.deepEqual(XMLMapping.load(input), { key : [{},{},{}] }); 
	test.done();
}
exports['t03c'] = function (test) {
	input = '<key>value1</key><key>value2</key>';
	test.deepEqual(XMLMapping.load(input), { key : [{ $t : 'value1'}, { $t : 'value2'}] }); 
	input = '<key>value1</key><key>value2</key><key>value3</key>';
	test.deepEqual(XMLMapping.load(input), { key : [{ $t : 'value1'}, { $t : 'value2'}, { $t : 'value3'}] }); 
	test.done();
};
exports['t03d'] = function (test) {
	input = '<key><!--value1--></key><key><!--value2--></key>';
	test.deepEqual(XMLMapping.load(input), { key : [{ $c : 'value1'}, { $c : 'value2'}] }); 
	input = '<key><!--value1--></key><key><!--value2--></key><key><!--value3--></key>';
	test.deepEqual(XMLMapping.load(input), { key : [{ $c : 'value1'}, { $c : 'value2'}, { $c : 'value3'}] }); 
	test.done();
};
exports['t03e'] = function (test) {
	input = '<key><![CDATA[value1]]></key><key><![CDATA[value2]]></key>';
	test.deepEqual(XMLMapping.load(input), { key : [{ $cd : 'value1'}, { $cd : 'value2'}] }); 
	input = '<key><![CDATA[value1]]></key><key><![CDATA[value2]]></key><key><![CDATA[value3]]></key>';
	test.deepEqual(XMLMapping.load(input), { key : [{ $cd : 'value1'}, { $cd : 'value2'}, { $cd : 'value3'}] }); 
//    input = '<![CDATA[value]]><![CDATA[value]]>';
//    test.equal(XMLMapping.dump(input), { '#element' : [{ $cd : 'value'}, { $cd : 'value'}] }); 
	test.done();
};

