var XMLWriter = require('xml-writer');
var default_tag_name = 'row';

exports.dump = function(obj) {

	if (typeof obj != "object") return obj;
	//    if (typeof xw != XMLWriter) 
	var	xw = new XMLWriter();


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

	var getname = function(n) {
		return n.replace('$', ':');
	}

	var parse = function(o) {
		if (getype(o) != 'object') return;
		for(var key in o) {
			if (o.hasOwnProperty(key) && o[key] != null){
				var type1 = getype(o[key]);
				if (type1 == 'object') {
					xw.startElement(getname(key));
					parse(o[key]);
					xw.endElement();
				}
				else if (type1 == 'array' && o[key].length <= 0) {
					xw.startElement(getname(key)).endElement();
				}
				else if (type1 == 'array' && o[key].length > 0) {
					var type2 = getype(o[key][0]);
					if (type2 == 'object') {
						o[key].forEach(function(item, index) {
								if (key == '$element' || key == '$e' || key == '#element' || key == '_element' || key == '_e') {
									parse(item);
								}
								else {
									xw.startElement(getname(key));
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
									xw.startElement(getname(key));
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
						xw.startAttribute(getname(key)).text(getval(o[key])).endAttribute();
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
exports.load = function(str) {
	if (typeof str != "string") return str;

	var parser = require("sax").parser(true, {trim:true, xmlns:false});
	var result = {}, 
		stack = [], 
		cdata = '';

	function cvalue(n, v) {
		n = n.replace(':', '$');
		var o = stack[stack.length-1];
		if (o == undefined) {
			o = {};
			o[n] = v;
			return o[n];
		}
		else if (o[n] == undefined) {
			o[n] = v;
			return o[n];
		}
		else if (!Array.isArray(o[n])) {
			var x = o[n];
			o[n] = new Array(x, v);
			return o[n][1];
		}
		else {
			var i = o[n].push(v);
			return o[n][i-1];
		}
	}
	function cattr(o) {
		var r = {};
		for(var key in o) {
			if (o.hasOwnProperty(key) && o[key]) {
				r[key.replace(':', '$')] = o[key];
			}
		}
		return r;
	}


	parser.onerror = function (e) {
		// an error happened.
	};
	parser.onprocessinginstruction = function (pi) {
	};
	parser.ontext = function (v) {
		cvalue('$t', v);
	};
	parser.oncomment = function (v) {
		cvalue('$c', v);
	};
	parser.oncdata = function (v) {
		cdata += v;
	};
	parser.onopencdata = function () {
		cdata = '';
	};
	parser.onclosecdata = function () {
		cvalue('$cd', cdata);
		cdata = '';
	};
	parser.onopentag = function (node) {
//        console.log(stack);
		if (stack.length == 1 && node.name == default_tag_name) {
			result = cattr(node.attributes);
			stack.push(result);
		}
		else {
			stack.push(cvalue(node.name, cattr(node.attributes)));
		}
	};
	parser.onclosetag = function () {
		stack.pop();
	};
	parser.onready = function () {
	};
	parser.onend = function () {
	};

	stack.push(result);
	try {
		parser.write(str).close();
	}
	catch(e) {
		return str;
	}
	stack.pop();
	return result;
}

exports.toxml = exports.dump;
exports.tojson = exports.load;
