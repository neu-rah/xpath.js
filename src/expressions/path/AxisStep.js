/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cAxisStep(sAxis, oTest) {
	this.axis	= sAxis;
	this.test	= oTest;
	this.predicates	= [];
};

//cAxisStep.prototype	= new cStepExpr;

cAxisStep.prototype.axis		= null;
cAxisStep.prototype.test		= null;
cAxisStep.prototype.predicates	= null;

//
var hAxisStep_axises	= {};
// Forward axis
hAxisStep_axises["attribute"]			= {};
hAxisStep_axises["child"]				= {};
hAxisStep_axises["descendant"]			= {};
hAxisStep_axises["descendant-or-self"]	= {};
hAxisStep_axises["following"]			= {};
hAxisStep_axises["following-sibling"]	= {};
hAxisStep_axises["self"]				= {};
// hAxisStep_axises["namespace"]			= {};	// deprecated in 2.0
// Reverse axis
hAxisStep_axises["ancestor"]			= {};
hAxisStep_axises["ancestor-or-self"]	= {};
hAxisStep_axises["parent"]				= {};
hAxisStep_axises["preceding"]			= {};
hAxisStep_axises["preceding-sibling"]	= {};

// Static members
cAxisStep.parse	= function (oLexer, oStaticContext) {
	var sAxis	= oLexer.peek(),
		oExpr,
		oStep;
	if (oLexer.peek(1) == '::') {
		if (!(sAxis in hAxisStep_axises))
			throw new cException("XPST0003"
//->Debug
					, "Unknown axis name: " + sAxis
//<-Debug
			);

		oLexer.next(2);
		if (oLexer.eof() ||!(oExpr = cNodeTest.parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected node test expression in axis step"
//<-Debug
			);
		//
		oStep	= new cAxisStep(sAxis, oExpr);
	}
	else
	if (sAxis == '..') {
		oLexer.next();
		oStep	= new cAxisStep("parent", new cKindTest("node"));
	}
	else
	if (sAxis == '@') {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cNodeTest.parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected node test expression in axis step"
//<-Debug
			);
		//
		oStep	= new cAxisStep("attribute", oExpr);
	}
	else {
		if (oLexer.eof() ||!(oExpr = cNodeTest.parse(oLexer, oStaticContext)))
			return;
		oStep	= new cAxisStep(oExpr instanceof cKindTest && oExpr.name == "attribute" ? "attribute" : "child", oExpr);
	}
	//
	cStepExpr.parsePredicates(oLexer, oStaticContext, oStep);

	return oStep;
};

// Public members
cAxisStep.prototype.evaluate	= function (oContext) {
	var oItem	= oContext.item;

	if (!oContext.DOMAdapter.isNode(oItem))
		throw new cException("XPTY0020");

	var nType	= oContext.DOMAdapter.getProperty(oItem, "nodeType");
	var oSequence	= new cSequence;
	switch (this.axis) {
		// Forward axis
		case "attribute":
			if (nType == 1)
				for (var aAttributes = oContext.DOMAdapter.getProperty(oItem, "attributes"), nIndex = 0, nLength = aAttributes.length; nIndex < nLength; nIndex++)
					oSequence.add(aAttributes[nIndex]);
			break;

		case "child":
			for (var oNode = oContext.DOMAdapter.getProperty(oItem, "firstChild"); oNode; oNode = oContext.DOMAdapter.getProperty(oNode, "nextSibling"))
				oSequence.add(oNode);
			break;

		case "descendant-or-self":
			oSequence.add(oItem);
			// No break left intentionally
		case "descendant":
			fAxisStep_getChildrenForward(oContext, oContext.DOMAdapter.getProperty(oItem, "firstChild"), oSequence);
			break;

		case "following":
			// TODO: Attribute node context
			for (var oParent = oItem, oSibling; oParent; oParent = oContext.DOMAdapter.getProperty(oParent, "parentNode"))
				if (oSibling = oContext.DOMAdapter.getProperty(oParent, "nextSibling"))
					fAxisStep_getChildrenForward(oContext, oSibling, oSequence);
			break;

		case "following-sibling":
			for (var oNode = oItem; oNode = oContext.DOMAdapter.getProperty(oNode, "nextSibling");)
				oSequence.add(oNode);
			break;

		case "self":
			oSequence.add(oItem);
			break;

		// Reverse axis
		case "ancestor-or-self":
			oSequence.add(oItem);
			// No break left intentionally
		case "ancestor":
			for (var oNode = nType == 2 ? oContext.DOMAdapter.getProperty(oItem, "ownerElement") : oItem; oNode = oContext.DOMAdapter.getProperty(oNode, "parentNode");)
				oSequence.add(oNode);
			break;

		case "parent":
			var oParent	= nType == 2 ? oContext.DOMAdapter.getProperty(oItem, "ownerElement") : oContext.DOMAdapter.getProperty(oItem, "parentNode");
			if (oParent)
				oSequence.add(oParent);
			break;

		case "preceding":
			// TODO: Attribute node context
			for (var oParent = oItem, oSibling; oParent; oParent = oContext.DOMAdapter.getProperty(oParent, "parentNode"))
				if (oSibling = oContext.DOMAdapter.getProperty(oParent, "previousSibling"))
					fAxisStep_getChildrenBackward(oContext, oSibling, oSequence);
			break;

		case "preceding-sibling":
			for (var oNode = oItem; oNode = oContext.DOMAdapter.getProperty(oNode, "previousSibling");)
				oSequence.add(oNode);
			break;
	}

	// Apply test
	if (!oSequence.isEmpty()) {
		var oSequence1	= oSequence;
		oSequence	= new cSequence;
		for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++) {
			if (this.test.test(oSequence1.items[nIndex], oContext))
				oSequence.add(oSequence1.items[nIndex]);
		}
	}

	// Apply predicates
	if (this.predicates.length && !oSequence.isEmpty())
		oSequence	= cStepExpr.prototype.applyPredicates.call(this, oContext, oSequence);

	// Reverse results if reverse axis
	switch (this.axis) {
		case "ancestor":
		case "ancestor-or-self":
		case "parent":
		case "preceding":
		case "preceding-sibling":
			oSequence.items.reverse();
	}

	return oSequence;
};

//
function fAxisStep_getChildrenForward(oContext, oNode, oSequence) {
	for (var oChild; oNode; oNode = oContext.DOMAdapter.getProperty(oNode, "nextSibling")) {
		oSequence.add(oNode);
		if (oChild = oContext.DOMAdapter.getProperty(oNode, "firstChild"))
			fAxisStep_getChildrenForward(oContext, oChild, oSequence);
	}
};

function fAxisStep_getChildrenBackward(oContext, oNode, oSequence) {
	for (var oChild; oNode; oNode = oContext.DOMAdapter.getProperty(oNode, "previousSibling")) {
		if (oChild = oContext.DOMAdapter.getProperty(oNode, "lastChild"))
			fAxisStep_getChildrenBackward(oContext, oChild, oSequence);
		oSequence.add(oNode);
	}
};