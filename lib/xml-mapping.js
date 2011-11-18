exports.dump = function(obj, addHeader) {

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
			return 'array';
		else
			return typeof o;
	}

	var getval = function(o) {
		return ''+o; // !TODO 
	}

	var parse = function(o, n) {
		var type = getype(o);
		var numobj = 0;
		if (type != 'array' && type != 'object') {
			write('<[DATA[ ' + getval(o) + ' ]]>');
		}
		else if (type == 'array') {
			o.forEach(function(item, index) {
				var tv = getval(value);
				if (type == 'array') {
					write('<'+n+'>');
					parse(v);
					write('<'+n+'>');
				}
				else {
					write('<[DATA[ ' + getval(v) + ' ]]>');
				}
			});
		}
		else if (type == 'object') {
			for(var key in o){
				if (o.hasOwnProperty(key) && o[key]){
					var tv = getype(o[key]);
					if (tv != 'object') {
						if (key == '$text') {
							write(getval(o[key]));
						}
						else if (key == '$comment') {
							write('<!-- ' + getval(o[key]) + ' -->');
						}
						else if (type != 'array')  {
							// TODO special attributes
							write(' '+key + '=' + quoting(getval(o[key])));
						}
						else  if (type == 'array') {
							parse(o[key], key);
						}
						else {
							// ...
						}
					}
					else {
						++numobj;
						write('<'+key);
						if (parse(o[key], key) == 0) {
							write('/>');
						}
						else {
							write('</'+key+'>');
						}
					}
				} else {
					write('<'+key+'/>');
				}
			}

		}
		return numobj;
	}
    var o= {};
    if (Object.keys(obj).length == 1) {
        o = obj;
    }
    else {
        o[default_tag_name] = obj;
	}
    parse(o, default_tag_name);
	
	return out;

};

