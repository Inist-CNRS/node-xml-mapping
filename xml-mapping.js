var save = function(obj, addHeader) {

	var out = addHeader ? '<?xml version="1.0" encoding="UTF-8"?>\n' : '';
	var default_tag_name = 'row';

	var write = function(s) {
		out += s;
	}

	var quoting = function(s) {
		return '"'+s+'"';
	}

	var getype = function(o) {
		if (!o)
			return 'undefined';
		else if (Array.isArray(o))
			return 'array;
		else
			return typeof o;
	}

	var getval = function(o) {
		return ''+o; // !TODO 
	}

	var parse = function(o, n) {
		var type = getype(o);
		if (type != 'array' and type != 'object') {
			write('<[DATA[ ' + getval(o) + ' ]]>');
		}
		else if (type == 'array') {
			forEach(o as v) {
				var tv = getval(value);
				if (type == 'array') {
					write('<'+n+'>');
					parse(v);
					write('<'+n+'>');
				}
				else {
					write('<[DATA[ ' + getval(v) + ' ]]>');
				}
			}
		}
		else if (type == 'object') {
			for(var key in o){
				if (o.hasOwnProperty(key) && o[key]){
					var tv = gettype(o[key]);
					if (tv != 'object') {
						if (key == '$text') {
							write(getval(o[key]));
						}
						else if (key == '$comment') {
							write('<!-- ' + getval(o[key]) + ' -->');
						}
						else if (type != 'array')  {
							// TODO special attributes
							write(key + '=' + quoting(getval(o[key])));
						}
						else  if (type == 'array') {
							parse(o[key], key);
						}
						else if (tv == 'object') {
							write('<'+key+'>');
							parse(o[key], key);
							write('</'+key+'>');
						}
					}
				} else {
					write('<'+key+'/>');
				}
			}

		}
	}

	parse(obj.length == 1 ? obj : {this.default_tag_name : obj}, this.default_tag_name);

	return out;

};

exports.toXML = toXML;
