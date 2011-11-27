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

	var parse = function(o) {
		if (getype(o) != 'object') return;
		for(var key in o) {
			if (o.hasOwnProperty(key) && o[key]){
				var type1 = getype(o[key]);
				if (type1 == 'object') {
					xw.startElement(key);
					parse(o[key]);
					xw.endElement();
				}
				else if (type1 == 'array' && o[key].length <= 0) {
					xw.startElement(key).endElement();
				}
				else if (type1 == 'array' && o[key].length > 0) {
					var type2 = getype(o[key][0]);
					if (type2 == 'object') {
						o[key].forEach(function(item, index) {
								if (key == '$element' || key == '$e' || key == '#element' || key == '_element' || key == '_e') {
									parse(item);
								}
								else {
									xw.startElement(key);
									parse(item);
									xw.endElement();
								}
						});
					}
					else {
						o[key].forEach(function(item, index) {
								if (key == '$element' || key == '$e' || key == '#element' || key == '_element' || key == '_e') {
									xw.startCData().text(getval(item)).endCData();
								}
								else {
									xw.startElement(key);
									xw.startCData().text(getval(item)).endCData();
									xw.endElement();
								}
						});
					}
				}
				else {
					if (key == '$text' || key == '$t' || key == '#text' || key == '_text' || key == '_t') {
						xw.text(getval(o[key]));
					}
					else if (key == '$comment' || key == '$c' || key == '#comment' || key == '_comment' || key == '_c') {
						xw.startComment().text(getval(o[key])).endComment();
					}
					else if (key == '$cdata' || key == '$cd' || key == '#cdata' || key == '_cdata' || key == '_cd') {
						xw.startCData().text(getval(o[key])).endCData();
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
	parse(o);

	return xw.toString();

};

