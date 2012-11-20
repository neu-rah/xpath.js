/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	10.4 Comparison Operators on Duration, Date and Time Values
		op:yearMonthDuration-less-than
		op:yearMonthDuration-greater-than
		op:dayTimeDuration-less-than
		op:dayTimeDuration-greater-than
		op:duration-equal
		op:dateTime-equal
		op:dateTime-less-than
		op:dateTime-greater-than
		op:date-equal
		op:date-less-than
		op:date-greater-than
		op:time-equal
		op:time-less-than
		op:time-greater-than
		op:gYearMonth-equal
		op:gYear-equal
		op:gMonthDay-equal
		op:gMonth-equal
		op:gDay-equal

	10.6 Arithmetic Operators on Durations
		op:add-yearMonthDurations
		op:subtract-yearMonthDurations
		op:multiply-yearMonthDuration
		op:divide-yearMonthDuration
		op:divide-yearMonthDuration-by-yearMonthDuration
		op:add-dayTimeDurations
		op:subtract-dayTimeDurations
		op:multiply-dayTimeDuration
		op:divide-dayTimeDuration
		op:divide-dayTimeDuration-by-dayTimeDuration


	10.8 Arithmetic Operators on Durations, Dates and Times
		op:subtract-dateTimes
		op:subtract-dates
		op:subtract-times
		op:add-yearMonthDuration-to-dateTime
		op:add-dayTimeDuration-to-dateTime
		op:subtract-yearMonthDuration-from-dateTime
		op:subtract-dayTimeDuration-from-dateTime
		op:add-yearMonthDuration-to-date
		op:add-dayTimeDuration-to-date
		op:subtract-yearMonthDuration-from-date
		op:subtract-dayTimeDuration-from-date
		op:add-dayTimeDuration-to-time
		op:subtract-dayTimeDuration-from-time

*/

// 10.4 Comparison Operators on Duration, Date and Time Values
// op:yearMonthDuration-less-than($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:boolean
hStaticContext_operators["yearMonthDuration-less-than"]	= function(oLeft, oRight) {
	return new cXSBoolean(fFunctionCall_operators_yearMonthDuration_toMonths(oLeft) < fFunctionCall_operators_yearMonthDuration_toMonths(oRight));
};

// op:yearMonthDuration-greater-than($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:boolean
hStaticContext_operators["yearMonthDuration-greater-than"]	= function(oLeft, oRight) {
	return new cXSBoolean(fFunctionCall_operators_yearMonthDuration_toMonths(oLeft) > fFunctionCall_operators_yearMonthDuration_toMonths(oRight));
};

// op:dayTimeDuration-less-than($arg1 as dayTimeDuration, $arg2 as dayTimeDuration) as xs:boolean
hStaticContext_operators["dayTimeDuration-less-than"]	= function(oLeft, oRight) {
	return new cXSBoolean(fFunctionCall_operators_dayTimeDuration_toSeconds(oLeft) < fFunctionCall_operators_dayTimeDuration_toSeconds(oRight));
};

// op:dayTimeDuration-greater-than($arg1 as dayTimeDuration, $arg2 as dayTimeDuration) as xs:boolean
hStaticContext_operators["dayTimeDuration-greater-than"]	= function(oLeft, oRight) {
	return new cXSBoolean(fFunctionCall_operators_dayTimeDuration_toSeconds(oLeft) > fFunctionCall_operators_dayTimeDuration_toSeconds(oRight));
};

// op:duration-equal($arg1 as xs:duration, $arg2 as xs:duration) as xs:boolean
hStaticContext_operators["duration-equal"]	= function(oLeft, oRight) {
	return new cXSBoolean(oLeft.negative == oRight.negative
			&& fFunctionCall_operators_yearMonthDuration_toMonths(oLeft) == fFunctionCall_operators_yearMonthDuration_toMonths(oRight)
			&& fFunctionCall_operators_dayTimeDuration_toSeconds(oLeft) == fFunctionCall_operators_dayTimeDuration_toSeconds(oRight));
};

// op:dateTime-equal($arg1 as xs:dateTime, $arg2 as xs:dateTime) as xs:boolean
hStaticContext_operators["dateTime-equal"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'eq');
};

// op:dateTime-less-than($arg1 as xs:dateTime, $arg2 as xs:dateTime) as xs:boolean
hStaticContext_operators["dateTime-less-than"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'lt');
};

//op:dateTime-greater-than($arg1 as xs:dateTime, $arg2 as xs:dateTime) as xs:boolean
hStaticContext_operators["dateTime-greater-than"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'gt');
};

// op:date-equal($arg1 as xs:date, $arg2 as xs:date) as xs:boolean
hStaticContext_operators["date-equal"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'eq');
};

// op:date-less-than($arg1 as xs:date, $arg2 as xs:date) as xs:boolean
hStaticContext_operators["date-less-than"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'lt');
};

// op:date-greater-than($arg1 as xs:date, $arg2 as xs:date) as xs:boolean
hStaticContext_operators["date-greater-than"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'gt');
};

// op:time-equal($arg1 as xs:time, $arg2 as xs:time) as xs:boolean
hStaticContext_operators["time-equal"]	= function(oLeft, oRight) {
	return new cXSBoolean(fFunctionCall_operators_time_toSeconds(oLeft) == fFunctionCall_operators_time_toSeconds(oRight));
};

// op:time-less-than($arg1 as xs:time, $arg2 as xs:time) as xs:boolean
hStaticContext_operators["time-less-than"]	= function(oLeft, oRight) {
	return new cXSBoolean(fFunctionCall_operators_time_toSeconds(oLeft) < fFunctionCall_operators_time_toSeconds(oRight));
};

// op:time-greater-than($arg1 as xs:time, $arg2 as xs:time) as xs:boolean
hStaticContext_operators["time-greater-than"]	= function(oLeft, oRight) {
	return new cXSBoolean(fFunctionCall_operators_time_toSeconds(oLeft) > fFunctionCall_operators_time_toSeconds(oRight));
};

// op:gYearMonth-equal
// op:gYear-equal
// op:gMonthDay-equal
// op:gMonth-equal
// op:gDay-equal


// 10.6 Arithmetic Operators on Durations
// op:add-yearMonthDurations($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:yearMonthDuration
hStaticContext_operators["add-yearMonthDurations"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_yearMonthDuration_fromMonths(fFunctionCall_operators_yearMonthDuration_toMonths(oLeft) + fFunctionCall_operators_yearMonthDuration_toMonths(oRight));
};

// op:subtract-yearMonthDurations($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:yearMonthDuration
hStaticContext_operators["subtract-yearMonthDurations"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_yearMonthDuration_fromMonths(fFunctionCall_operators_yearMonthDuration_toMonths(oLeft) - fFunctionCall_operators_yearMonthDuration_toMonths(oRight));
};

// op:multiply-yearMonthDuration($arg1 as xs:yearMonthDuration, $arg2 as xs:double) as xs:yearMonthDuration
hStaticContext_operators["multiply-yearMonthDuration"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_yearMonthDuration_fromMonths(fFunctionCall_operators_yearMonthDuration_toMonths(oLeft) * oRight);
};

// op:divide-yearMonthDuration($arg1 as xs:yearMonthDuration, $arg2 as xs:double) as xs:yearMonthDuration
hStaticContext_operators["divide-yearMonthDuration"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_yearMonthDuration_fromMonths(fFunctionCall_operators_yearMonthDuration_toMonths(oLeft) / oRight);
};

// op:divide-yearMonthDuration-by-yearMonthDuration($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:decimal
hStaticContext_operators["divide-yearMonthDuration-by-yearMonthDuration"]	= function(oLeft, oRight) {
	return new cXSDecimal(fFunctionCall_operators_yearMonthDuration_toMonths(oLeft) / fFunctionCall_operators_yearMonthDuration_toMonths(oRight));
};

// op:add-dayTimeDurations($arg1 as xs:dayTimeDuration, $arg2 as xs:dayTimeDuration) as xs:dayTimeDuration
hStaticContext_operators["add-dayTimeDurations"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_dayTimeDuration_fromSeconds(fFunctionCall_operators_dayTimeDuration_toSeconds(oLeft) + fFunctionCall_operators_dayTimeDuration_toSeconds(oRight));
};

// op:subtract-dayTimeDurations($arg1 as xs:dayTimeDuration, $arg2 as xs:dayTimeDuration) as xs:dayTimeDuration
hStaticContext_operators["subtract-dayTimeDurations"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_dayTimeDuration_fromSeconds(fFunctionCall_operators_dayTimeDuration_toSeconds(oLeft) - fFunctionCall_operators_dayTimeDuration_toSeconds(oRight));
};

// op:multiply-dayTimeDurations($arg1 as xs:dayTimeDuration, $arg2 as xs:double) as xs:dayTimeDuration
hStaticContext_operators["multiply-dayTimeDuration"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_dayTimeDuration_fromSeconds(fFunctionCall_operators_dayTimeDuration_toSeconds(oLeft) * oRight);
};

// op:divide-dayTimeDurations($arg1 as xs:dayTimeDuration, $arg2 as xs:double) as xs:dayTimeDuration
hStaticContext_operators["divide-dayTimeDuration"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_dayTimeDuration_fromSeconds(fFunctionCall_operators_dayTimeDuration_toSeconds(oLeft) / oRight);
};

// op:divide-dayTimeDuration-by-dayTimeDuration($arg1 as xs:dayTimeDuration, $arg2 as xs:dayTimeDuration) as xs:decimal
hStaticContext_operators["divide-dayTimeDuration-by-dayTimeDuration"]	= function(oLeft, oRight) {
	return new cXSDecimal(fFunctionCall_operators_dayTimeDuration_toSeconds(oLeft) / fFunctionCall_operators_dayTimeDuration_toSeconds(oRight));
};

// 10.8 Arithmetic Operators on Durations, Dates and Times
// op:subtract-dateTimes($arg1 as xs:dateTime, $arg2 as xs:dateTime) as xs:dayTimeDuration
hStaticContext_operators["subtract-dateTimes"]	= function(oLeft, oRight) {
	throw "Operator function '" + "subtract-dateTimes" + "' not implemented";
};

// op:subtract-dates($arg1 as xs:date, $arg2 as xs:date) as xs:dayTimeDuration
hStaticContext_operators["subtract-dates"]	= function(oLeft, oRight) {
	throw "Operator function '" + "subtract-dates" + "' not implemented";
};

// op:subtract-times($arg1 as xs:time, $arg2 as xs:time) as xs:dayTimeDuration
hStaticContext_operators["subtract-times"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_dayTimeDuration_fromSeconds(fFunctionCall_operators_time_toSeconds(oLeft) - fFunctionCall_operators_time_toSeconds(oRight));
};

// op:add-yearMonthDuration-to-dateTime($arg1 as xs:dateTime, $arg2 as xs:yearMonthDuration) as xs:dateTime
hStaticContext_operators["add-yearMonthDuration-to-dateTime"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addYearMonthDuration2DateTime(oLeft, oRight, '+');
};

// op:add-dayTimeDuration-to-dateTime($arg1 as xs:dateTime, $arg2 as xs:dayTimeDuration) as xs:dateTime
hStaticContext_operators["add-dayTimeDuration-to-dateTime"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addDayTimeDuration2DateTime(oLeft, oRight, '+');
};

// op:subtract-yearMonthDuration-from-dateTime($arg1 as xs:dateTime, $arg2 as xs:yearMonthDuration) as xs:dateTime
hStaticContext_operators["subtract-yearMonthDuration-from-dateTime"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addYearMonthDuration2DateTime(oLeft, oRight, '-');
};

// op:subtract-dayTimeDuration-from-dateTime($arg1 as xs:dateTime, $arg2 as xs:dayTimeDuration) as xs:dateTime
hStaticContext_operators["subtract-dayTimeDuration-from-dateTime"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addDayTimeDuration2DateTime(oLeft, oRight, '-');
};

// op:add-yearMonthDuration-to-date($arg1 as xs:date, $arg2 as xs:yearMonthDuration) as xs:date
hStaticContext_operators["add-yearMonthDuration-to-date"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addYearMonthDuration2DateTime(oLeft, oRight, '+');
};

// op:add-dayTimeDuration-to-date($arg1 as xs:date, $arg2 as xs:dayTimeDuration) as xs:date
hStaticContext_operators["add-dayTimeDuration-to-date"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addDayTimeDuration2DateTime(oLeft, oRight, '+');
};

// op:subtract-yearMonthDuration-from-date($arg1 as xs:date, $arg2  as xs:yearMonthDuration) as xs:date
hStaticContext_operators["subtract-yearMonthDuration-from-date"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addYearMonthDuration2DateTime(oLeft, oRight, '-');
};

// op:subtract-dayTimeDuration-from-date($arg1 as xs:date, $arg2  as xs:dayTimeDuration) as xs:date
hStaticContext_operators["subtract-dayTimeDuration-from-date"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addDayTimeDuration2DateTime(oLeft, oRight, '-');
};

// op:add-dayTimeDuration-to-time($arg1 as xs:time, $arg2  as xs:dayTimeDuration) as xs:time
hStaticContext_operators["add-dayTimeDuration-to-time"]	= function(oLeft, oRight) {
	var oValue	= new cXSTime(oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone);
	oValue.hours	+= oRight.hours;
	oValue.minutes	+= oRight.minutes;
	oValue.seconds	+= oRight.seconds;
	//
	return fXSTime_normalize(oValue);
};

// op:subtract-dayTimeDuration-from-time($arg1 as xs:time, $arg2  as xs:dayTimeDuration) as xs:time
hStaticContext_operators["subtract-dayTimeDuration-from-time"]	= function(oLeft, oRight) {
	var oValue	= new cXSTime(oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone);
	oValue.hours	-= oRight.hours;
	oValue.minutes	-= oRight.minutes;
	oValue.seconds	-= oRight.seconds;
	//
	return fXSTime_normalize(oValue);
};

function fFunctionCall_operators_compareDateTime(oLeft, oRight, sComparator) {
	// Adjust object time zone to Z and compare as strings
	var oTimezone	= new cXSDayTimeDuration(0, 0, 0, 0),
		sLeft	= fFunctionCall_dateTime_adjustTimezone(oLeft, oTimezone).toString(),
		sRight	= fFunctionCall_dateTime_adjustTimezone(oRight, oTimezone).toString();
	return new cXSBoolean(sComparator == 'lt' ? sLeft < sRight : sComparator == 'gt' ? sLeft > sRight : sLeft == sRight);
};

function fFunctionCall_operators_addYearMonthDuration2DateTime(oLeft, oRight, sOperator) {
	var oValue;
	if (oLeft instanceof cXSDate)
		oValue	= new cXSDate(oLeft.year, oLeft.month, oLeft.day, oLeft.timezone, oLeft.negative);
	else
	if (oLeft instanceof cXSDateTime)
		oValue	= new cXSDateTime(oLeft.year, oLeft.month, oLeft.day, oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone, oLeft.negative);
	//
	oValue.year		= oValue.year + oRight.year * (sOperator == '-' ?-1 : 1);
	oValue.month	= oValue.month + oRight.month * (sOperator == '-' ?-1 : 1);
	//
	fXSDate_normalize(oValue, true);
	// Correct day if out of month range
	var nDay	= fXSDate_getDaysForYearMonth(oValue.year, oValue.month);
	if (oValue.day > nDay)
		oValue.day	= nDay;
	//
	return oValue;
};

function fFunctionCall_operators_addDayTimeDuration2DateTime(oLeft, oRight, sOperator) {
	var oValue;
	if (oLeft instanceof cXSDate) {
		oValue	= new cXSDate(oLeft.year, oLeft.month, oLeft.day, oLeft.timezone, oLeft.negative);
		oValue.day	= oValue.day + oRight.day * (sOperator == '-' ?-1 : 1);
		fXSDate_normalize(oValue);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		oValue	= new cXSDateTime(oLeft.year, oLeft.month, oLeft.day, oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone, oLeft.negative);
		oValue.seconds	= oValue.seconds + oRight.seconds * (sOperator == '-' ?-1 : 1);
		oValue.minutes	= oValue.minutes + oRight.minutes * (sOperator == '-' ?-1 : 1);
		oValue.hours	= oValue.hours + oRight.hours * (sOperator == '-' ?-1 : 1);
		oValue.day		= oValue.day + oRight.day * (sOperator == '-' ?-1 : 1);
		fXSDateTime_normalize(oValue);
	}
	return oValue;
};

// xs:dayTimeDuration to/from seconds
function fFunctionCall_operators_dayTimeDuration_toSeconds(oDuration) {
	return (((oDuration.day * 24 + oDuration.hours) * 60 + oDuration.minutes) * 60 + oDuration.seconds) * (oDuration.negative ? -1 : 1);
};

function fFunctionCall_operators_dayTimeDuration_fromSeconds(nValue) {
	var bNegative	=(nValue = cMath.round(nValue)) < 0,
		nDays	= ~~((nValue = cMath.abs(nValue)) / 86400),
		nHours	= ~~((nValue -= nDays * 3600 * 24) / 3600),
		nMinutes= ~~((nValue -= nHours * 3600) / 60),
		nSeconds	= nValue -= nMinutes * 60;
	return new cXSDayTimeDuration(nDays, nHours, nMinutes, nSeconds, bNegative);
};

// xs:yearMonthDuration to/from months
function fFunctionCall_operators_yearMonthDuration_toMonths(oDuration) {
	return (oDuration.year * 12 + oDuration.month) * (oDuration.negative ? -1 : 1);
};

function fFunctionCall_operators_yearMonthDuration_fromMonths(nValue) {
	var nNegative	=(nValue = cMath.round(nValue)) < 0,
		nYears	= ~~((nValue = cMath.abs(nValue)) / 12),
		nMonths		= nValue -= nYears * 12;
	return new cXSYearMonthDuration(nYears, nMonths, nNegative);
};

// xs:time to seconds
function fFunctionCall_operators_time_toSeconds(oTime) {
	return oTime.seconds + (oTime.minutes - (oTime.timezone !== null ? oTime.timezone % 60 : 0) + (oTime.hours - (oTime.timezone !== null ? ~~(oTime.timezone / 60) : 0)) * 60) * 60;
};
