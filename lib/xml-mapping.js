var XMLWriter = require('xml-writer');
exports.dump = function(obj) {

	if (typeof obj != "object") return obj;
	//    if (typeof xw != XMLWriter) 
	var	xw = new XMLWriter();

	var default_tag_name = 'row';

	var getype = function(o) {
		if (!o)
			return 'undefined';
		else if (Array.isArray(o))
			return 'array';
		else
			return typeof o;
	}

	var getval = function(o) {
		return ''+o; // !TODO 
	}

	var parse = function(o, n, f) {
		if (getype(o) != 'object') return;
		for(var key in o) {
			if (o.hasOwnProperty(key) && o[key]){
				var type1 = getype(o[key]);
				if (type1 == 'object') {
					xw.startElement(key);
					parse(o[key], key, true);
					xw.endElement();
				}
				else if (type1 == 'array' && o[key].length <= 0) {
					xw.startElement(key).endElement();
				}
				else if (type1 == 'array' && o[key].length > 0) {
					var type2 = getype(o[key][0]);
					if (type2 == 'object') {
						o[key].forEach(function(item, index) {
								xw.startElement(key);
								parse(item, key, false);
								xw.endElement();
						});
					}
					else if (type1 == 'array' && o[key].length <= 0) {
						xw.startElement(key).endElement();
					}
					else if (type1 == 'array' && o[key].length > 0) {
					}
					else {
//                        xw.startCData().text(getval(o[key])).endCData();
					}
				}
				else {
					if (key == '$text' || key == '$t' || key == '#text') {
						xw.text(getval(o[key]));
					}
					else if (key == '$comment') {
						xw.startComment().text(getval(o[key])).endComment();
					}
					else  {
						xw.startAttribute(key).text(getval(o[key])).endAttribute();
					}
				}
			}
		}
	}
	var o= {};
	if (Object.keys(obj).length == 1) {
		o = obj;
	}
	else {
		o[default_tag_name] = obj;
	}
	parse(o, default_tag_name, false);

	return xw.toString();

};

