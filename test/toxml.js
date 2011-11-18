var XMLMapping = require('../');

exports['t01'] = function (test) {
	var data = {
		key : {
			key1: 'value'
		}
	};
	var string = XMLMapping.dump(data);
	test.equal(string, '<key key1="value"/>') 
    test.done();
};
exports['t02'] = function (test) {
	var data = {
		key : {
			key1: 'value1',
			key2: 'value2',
		}
	};
	var string = XMLMapping.dump(data);
	test.equal(string, '<key key1="value1" key2="value2"/>') 
    test.done();
};
