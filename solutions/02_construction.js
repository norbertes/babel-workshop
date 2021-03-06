import * as t from "babel-types"

// Should return a string literal AST node with the value "Hello"
export function getHelloStringLiteral(){
    // See the babel-types documentation here: https://babeljs.io/docs/core-packages/babel-types/#apistring-literal
    // START_SOLUTION
    return t.stringLiteral("Hello")    
    // END_SOLUTION
}

// Should return AST node equivalent to this code: `alert("Hello")`
export function getAlertCall(){
    // For help, try inspecint `alert("Hello")` in AST Explorer
    // START_SOLUTION
    return t.callExpression(
        t.identifier("alert"),
        [
            t.stringLiteral("Hello")
        ]
    )
    // END_SOLUTION
}

// Should return AST node equivalent to this code: `Math.pow({{base}}, {{exponent}})`
export function getMathPowCall(base, exponent){
    // START_SOLUTION
    return t.callExpression(
        t.memberExpression(t.identifier("Math"), t.identifier("pow")),
        [
            base,
            exponent
        ]
    )
    // END_SOLUTION
}

// Manually constructing the AST is tedious, so you can use Babel template instead
// Docs: https://github.com/babel/babel/tree/master/packages/babel-template
import template from "babel-template";
/*
    Example:

    var buildAlertCall = template(`alert(STRING)`)
    buildAlertCall({ STRING: t.StringLiteral("Hello") }) // ==> alert("Hello");
*/

// Should return AST node equivalent to this code: `Math.pow({{base}}, {{exponent}})`
export function getMathPowCallUsingBabelTemplate(base, exponent){
    // START_SOLUTION
    var buildMathPowCall = template(`Math.pow(BASE, EXPONENT)`)
    return buildMathPowCall({
        BASE: base,
        EXPONENT: exponent
    })
    // END_SOLUTION
}

// Babel Generator can take an AST and turn it into source code
// Docs: https://github.com/babel/babel/tree/master/packages/babel-generator
import generate from "babel-generator";
// `generate` returns an object with a code property and a map property for source maps

// Should return a string like this: `Math.pow({{base}}, {{exponent}})`
export function getMathPowCallAsString(base, exponent) {
    // START_SOLUTION
    var ast = getMathPowCallUsingBabelTemplate(base, exponent)
    return generate(ast).code
    // END_SOLUTION
}