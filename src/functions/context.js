/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	16 Context Functions
		position
		last
		current-dateTime
		current-date
		current-time
		implicit-timezone
		default-collation
		static-base-uri

*/
// fn:position() as xs:integer
cFunctionCall.functions["position"]	= function() {
	return new cXPath2Sequence(this.position);
};

// fn:last() as xs:integer
cFunctionCall.functions["last"]	= function() {
	return new cXPath2Sequence(this.last);
};

// fn:current-dateTime() as xs:dateTime (2004-05-12T18:17:15.125Z)
cFunctionCall.functions["current-dateTime"]	= function() {
	var oDate	= new cDate;
	return new cXPath2Sequence(new cXSDateTime(oDate.getFullYear(), oDate.getMonth() + 1, oDate.getDate(), oDate.getHours(), oDate.getMinutes(), oDate.getSeconds(), oDate.getMilliseconds(), oDate.getTimezoneOffset()));
};

// fn:current-date() as xs:date (2004-05-12+01:00)
cFunctionCall.functions["current-date"]	= function() {
	var oDate	= new cDate;
	return new cXPath2Sequence(new cXSDate(oDate.getFullYear(), oDate.getMonth() + 1, oDate.getDate(), oDate.getTimezoneOffset()));
};

// fn:current-time() as xs:time (23:17:00.000-05:00)
cFunctionCall.functions["current-time"]	= function() {
	var oDate	= new cDate;
	return new cXPath2Sequence(new cXSTime(oDate.getHours(), oDate.getMinutes(), oDate.getSeconds(), oDate.getMilliseconds(), oDate.getTimezoneOffset()));
};

// fn:implicit-timezone as xs:dayTimeDuration
cFunctionCall.functions["implicit-timezone"]	= function() {
	var nTimezone	= (new cDate).getTimezoneOffset();
	return new cXPath2Sequence(new cXSDayTimeDuration(0, cMath.abs(~~(nTimezone / 60)), cMath.abs(nTimezone % 60), 0, nTimezone > 0));
};

// fn:default-collation() as xs:string
cFunctionCall.functions["default-collation"]	= function() {
	throw "Function '" + "default-collation" + "' not implemented";
};

// fn:static-base-uri() as xs:anyURI?
cFunctionCall.functions["static-base-uri"]	= function() {
	throw "Function '" + "static-base-uri" + "' not implemented";
};