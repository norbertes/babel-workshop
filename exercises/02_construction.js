import * as t from "babel-types"

// Should return a string literal AST node with the value "Hello"
export function getHelloStringLiteral(){
    // See the babel-types documentation here: https://babeljs.io/docs/core-packages/babel-types/#apistring-literal
    return t.stringLiteral('Hello')
}

// Should return AST node equivalent to this code: `alert("Hello")`
export function getAlertCall(){
    // For help, try inspecint `alert("Hello")` in AST Explorer
    const method = t.identifier('alert')
    const str = t.stringLiteral('Hello')
    return t.callExpression(method, [str])
}

// Should return AST node equivalent to this code: `Math.pow({{base}}, {{exponent}})`
export function getMathPowCall(base, exponent){
    const method = t.identifier('Math.pow')
    const args = [
        t.numericLiteral(8),
        t.numericLiteral(2),
    ]
    return t.callExpression(method, args)
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
    const buildMathPowCall = template(`Math.pow(BASE, EXPONENT)`)
    return buildMathPowCall({ BASE: t.numericLiteral(8), EXPONENT: t.numericLiteral(2)})
}

// Babel Generator can take an AST and turn it into source code
// Docs: https://github.com/babel/babel/tree/master/packages/babel-generator
import generate from "babel-generator";
import { parse } from 'babylon';
// `generate` returns an object with a code property and a map property for source maps

// Should return a string like this: `Math.pow({{base}}, {{exponent}})`
export function getMathPowCallAsString(base, exponent) {
    const buildMathPowCall = template(`Math.pow(BASE, EXPONENT)`)
    const fnCall = buildMathPowCall({ BASE: t.numericLiteral(8), EXPONENT: t.numericLiteral(2)})
    return generate(fnCall).code
}
