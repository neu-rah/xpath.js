/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cNameTest(sNameSpaceURI, sLocalName) {
	this.namespaceURI	= sNameSpaceURI;
	this.localName		= sLocalName;
};

cNameTest.RegExp	= /^(?:(?![0-9-])([\w-]+|\*)\:)?(?![0-9-])([\w-]+|\*)$/;

cNameTest.prototype	= new cNodeTest;

cNameTest.prototype.namespaceURI	= null;
cNameTest.prototype.localName		= null;

// Static members
cNameTest.parse	= function (oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cNameTest.RegExp);
	if (aMatch) {
		if (aMatch[1] == '*' && aMatch[2] == '*')
			throw "NameTest.parse: illegal wildcard value";
		oLexer.next();
		return new cNameTest(aMatch[1] ? aMatch[1] == '*' ? '*' : oResolver(aMatch[1]) : null, aMatch[2]);
	}
};

// Public members
cNameTest.prototype.test	= function (oNode) {
	var nType	= cXPath2.DOMAdapter.getProperty(oNode, "nodeType"),
		sLocalName		= cXPath2.DOMAdapter.getProperty(oNode, "localName"),
		sNameSpaceURI	= cXPath2.DOMAdapter.getProperty(oNode, "namespaceURI");
	return nType == 1 ?
				(this.localName == '*' || sLocalName == this.localName)
					&& (this.namespaceURI == '*' ||(this.namespaceURI ? sNameSpaceURI == this.namespaceURI : true))
				: nType == 2 ?
					(this.localName == '*' || sLocalName == this.localName)
						&& (this.namespaceURI == '*' ||(this.namespaceURI ? sNameSpaceURI == this.namespaceURI : true))
					: false;
};