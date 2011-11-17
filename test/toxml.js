var XMLMapping = require('../');

exports['test'] = function (test) {
	var data = {
		key : {
			key1: 'value'
		}
	};
	var string = XMLMapping.dump(data);
	test.equal(string, '<key key1="value"/>') 
    test.done();
};
