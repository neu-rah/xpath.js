/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cQuantifiedExpr(sQuantifier) {
	this.quantifier		= sQuantifier;
	this.bindings		= [];
	this.satisfiesExpr	= null;
};

cQuantifiedExpr.prototype.bindings		= null;
cQuantifiedExpr.prototype.quantifier	= null;
cQuantifiedExpr.prototype.satisfiesExpr	= null;

// Static members
cQuantifiedExpr.parse	= function (oLexer) {
	var sQuantifier	= oLexer.peek();
	if ((sQuantifier == "some" || sQuantifier == "every") && oLexer.peek(1).substr(0, 1) == '$') {
		oLexer.next();

		var oQuantifiedExpr	= new cQuantifiedExpr(sQuantifier);
		do {
			oQuantifiedExpr.bindings.push(cSimpleQuantifiedBinding.parse(oLexer));
		}
		while (oLexer.peek() == ',' && oLexer.next());

		if (oLexer.peek() != "satisfies")
			throw "QuantifiedExpr.parse: Expected 'satisfies' token";

		oLexer.next();
		oQuantifiedExpr.satisfiesExpr	= cExprSingle.parse(oLexer);
		return oQuantifiedExpr;
	}
};

// Public members
cQuantifiedExpr.prototype.evaluate	= function (oContext) {
	// TODO: re-factor
	var bEvery	= this.quantifier == "every",
		bResult	= bEvery ? true : false;
	(function(oSelf, nBinding) {
		var oBinding	= oSelf.bindings[nBinding++],
			sVariable	= oBinding.localName,
			oInSequence	= oBinding.inExpr.evaluate(oContext);
		for (var nIndex = 0, nLength = oInSequence.items.length; (nIndex < nLength) && (bEvery ? bResult :!bResult); nIndex++) {
			oContext.pushVariable(sVariable, oInSequence.items[nIndex]);
			if (nBinding < oSelf.bindings.length)
				arguments.callee(oSelf, nBinding);
			else
				bResult	= oSelf.satisfiesExpr.evaluate(oContext).toBoolean();
			oContext.popVariable(sVariable);
		}
	})(this, 0);

	return new cXPathSequence(bResult);
};



//
function cSimpleQuantifiedBinding(sPrefix, sLocalName, oInExpr) {
	this.prefix		= sPrefix || null;
	this.localName	= sLocalName;
	this.inExpr		= oInExpr;
};

cSimpleQuantifiedBinding.QNAME	= /^\$(?:([\w-]+):)?([\w-]+)$/i;

cSimpleQuantifiedBinding.parse	= function(oLexer) {
	if (oLexer.peek().match(cSimpleQuantifiedBinding.QNAME) && oLexer.peek(1) == "in") {
		var sPrefix		= cRegExp.$1,
			sLocalName	= cRegExp.$2;

		oLexer.next();
		oLexer.next();

		return new cSimpleQuantifiedBinding(sPrefix, sLocalName, cExprSingle.parse(oLexer));
	}
	else
		throw "Not SimpleQuantifiedBinding expression";
};