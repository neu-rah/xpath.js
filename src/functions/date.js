/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	10.5 Component Extraction Functions on Durations, Dates and Times
		years-from-duration
		months-from-duration
		days-from-duration
		hours-from-duration
		minutes-from-duration
		seconds-from-duration
		year-from-dateTime
		month-from-dateTime
		day-from-dateTime
		hours-from-dateTime
		minutes-from-dateTime
		seconds-from-dateTime
		timezone-from-dateTime
		year-from-date
		month-from-date
		day-from-date
		timezone-from-date
		hours-from-time
		minutes-from-time
		seconds-from-time
		timezone-from-time

	10.7 Timezone Adjustment Functions on Dates and Time Values
		adjust-dateTime-to-timezone
		adjust-date-to-timezone
		adjust-time-to-timezone
*/

// 10.5 Component Extraction Functions on Durations, Dates and Times
// functions on duration
// fn:years-from-duration($arg as xs:duration?) as xs:integer?
cFunctionCall.functions["years-from-duration"]	= function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, cXSDuration, "year");
};

// fn:months-from-duration($arg as xs:duration?) as xs:integer?
cFunctionCall.functions["months-from-duration"]	= function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, cXSDuration, "month");
};

// fn:days-from-duration($arg as xs:duration?) as xs:integer?
cFunctionCall.functions["days-from-duration"]	= function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, cXSDuration, "day");
};

// fn:hours-from-duration($arg as xs:duration?) as xs:integer?
cFunctionCall.functions["hours-from-duration"]	= function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, cXSDuration, "hour");
};

// fn:minutes-from-duration($arg as xs:duration?) as xs:integer?
cFunctionCall.functions["minutes-from-duration"]	= function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, cXSDuration, "minute");
};

// fn:seconds-from-duration($arg as xs:duration?) as xs:decimal?
cFunctionCall.functions["seconds-from-duration"]	= function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, cXSDuration, "second");
};

// functions on dateTime
// fn:year-from-dateTime($arg as xs:dateTime?) as xs:integer?
cFunctionCall.functions["year-from-dateTime"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSDateTime, "year");
};

// fn:month-from-dateTime($arg as xs:dateTime?) as xs:integer?
cFunctionCall.functions["month-from-dateTime"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSDateTime, "month");
};

// fn:day-from-dateTime($arg as xs:dateTime?) as xs:integer?
cFunctionCall.functions["day-from-dateTime"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSDateTime, "day");
};

// fn:hours-from-dateTime($arg as xs:dateTime?) as xs:integer?
cFunctionCall.functions["hours-from-dateTime"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSDateTime, "hour");
};

// fn:minutes-from-dateTime($arg as xs:dateTime?) as xs:integer?
cFunctionCall.functions["minutes-from-dateTime"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSDateTime, "minute");
};

// fn:seconds-from-dateTime($arg as xs:dateTime?) as xs:decimal?
cFunctionCall.functions["seconds-from-dateTime"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSDateTime, "second");
};

// fn:timezone-from-dateTime($arg as xs:dateTime?) as xs:dayTimeDuration?
cFunctionCall.functions["timezone-from-dateTime"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSDateTime, "timezone");
};

// functions on date
// fn:year-from-date($arg as xs:date?) as xs:integer?
cFunctionCall.functions["year-from-date"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSDate, "year");
};

// fn:month-from-date($arg as xs:date?) as xs:integer?
cFunctionCall.functions["month-from-date"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSDate, "month");
};

// fn:day-from-date($arg as xs:date?) as xs:integer?
cFunctionCall.functions["day-from-date"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSDate, "day");
};

// fn:timezone-from-date($arg as xs:date?) as xs:dayTimeDuration?
cFunctionCall.functions["timezone-from-date"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSDate, "timezone");
};

// functions on time
// fn:hours-from-time($arg as xs:time?) as xs:integer?
cFunctionCall.functions["hours-from-time"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSTime, "hour");
};

// fn:minutes-from-time($arg as xs:time?) as xs:integer?
cFunctionCall.functions["minutes-from-time"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSTime, "minute");
};

// fn:seconds-from-time($arg as xs:time?) as xs:decimal?
cFunctionCall.functions["seconds-from-time"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSTime, "second");
};

// fn:timezone-from-time($arg as xs:time?) as xs:dayTimeDuration?
cFunctionCall.functions["timezone-from-time"]	= function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, cXSTime, "timezone");
};


// 10.7 Timezone Adjustment Functions on Dates and Time Values
// fn:adjust-dateTime-to-timezone($arg as xs:dateTime?) as xs:dateTime?
// fn:adjust-dateTime-to-timezone($arg as xs:dateTime?, $timezone as xs:dayTimeDuration?) as xs:dateTime?
cFunctionCall.functions["adjust-dateTime-to-timezone"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "adjust-dateTime-to-timezone" + "' not implemented";
};

// fn:adjust-date-to-timezone($arg as xs:date?) as xs:date?
// fn:adjust-date-to-timezone($arg as xs:date?, $timezone as xs:dayTimeDuration?) as xs:date?
cFunctionCall.functions["adjust-date-to-timezone"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "adjust-date-to-timezone" + "' not implemented";
};

// fn:adjust-time-to-timezone($arg as xs:time?) as xs:time?
// fn:adjust-time-to-timezone($arg as xs:time?, $timezone as xs:dayTimeDuration?) as xs:time?
cFunctionCall.functions["adjust-time-to-timezone"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "adjust-time-to-timezone" + "' not implemented";
};

//
fFunctionCall_duration_getComponent	= function(oSequence1, cType, sName) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	var oSequence	= new cXPath2Sequence;
	if (oSequence1.isEmpty())
		return oSequence;

	var oItem	= oSequence1.items[0];
	if (!(oItem instanceof cType))
		throw new cXPath2Error("XPST0017");

	oSequence.add(oItem[sName] * (oItem.negative ?-1 : 1));

	return oSequence;
};

//
fFunctionCall_dateTime_getComponent	= function(oSequence1, cType, sName) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	var oSequence	= new cXPath2Sequence;
	if (oSequence1.isEmpty())
		return oSequence;

	var oItem	= oSequence1.items[0];
	if (!(oItem instanceof cType))
		throw new cXPath2Error("XPST0017");

	if (sName == "timezone") {
		var nTimezone	= oItem.timezone;
		if (nTimezone === null)
			return oSequence;
		oSequence.add(new cXSDayTimeDuration(0, cMath.abs(~~(nTimezone / 60)), cMath.abs(nTimezone % 60), 0, nTimezone > 0));
	}
	else {
		var nValue	= oItem[sName];
		if (cType != cXSDate) {
			if (sName == "hour")
				if (nValue == 24)
					nValue	= 0;
			if (sName == "second")
				nValue	+= cNumber('.' + oItem.millisecond);	// TODO: Maybe get rid of millisecond component
		}
		if (cType != cXSTime)
			nValue	*= oItem.negative ?-1 : 1;
		oSequence.add(nValue);
	}
	return oSequence;
};