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
		var type = getype(o);
		if (type != 'array' && type != 'object') {
			xw.startCData().text(getval(o)).endCData();
		}
		else if (type == 'array') {
			o.forEach(function(item, index) {
				var tv = getval(value);
				if (type == 'array') {
					xw.startElement(n);
					parse(value,null,false);
					xw.endElement();
				}
				else {
					xw.startCData().text(getval(v)).endCData();
				}
			});
		}
		else if (type == 'object') {
			for(var key in o) {
				if (o.hasOwnProperty(key) && o[key]){
					var tv = getype(o[key]);
					if (tv != 'object') {
						if (key == '$text') {
							xw.text(getval(o[key]));
						}
						else if (key == '$comment') {
							xw.startComment().text(getval(o[key])).endComment();
						}
						else if (type != 'array')  {
							// TODO special attributes
							xw.writeAttribute(key, getval(o[key]));
						}
						else  if (type == 'array') {
							parse(o[key], key, false);
						}
						else {
							// ...
						}
					}
					else {
						xw.startElement(key);
						parse(o[key], key, true);
						xw.endElement();
					}
				} else {
					xw.startElement(key).endElement();
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

