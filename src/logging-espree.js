import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";

export async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8')
  let output = addLogging(input);
  if (outputFile === undefined) {
      console.log(output);
      return;
  }
  await fs.writeFile(outputFile, output)
}

export function addLogging(code) {
  const ast = espree.parse(code, { ecmaVersion: 12, loc: true }); // attach line/column location information to each node https://github.com/eslint/espree
  estraverse.traverse(ast, {
      enter: function(node, parent) {
          if (node.type === 'FunctionDeclaration' ||
              node.type === 'ArrowFunctionExpression' ||
              node.type === 'FunctionExpression') {
              addBeforeCode(node);
          }
      }
  });
  return escodegen.generate(ast);
}

function addBeforeCode(node) {
  const name = node.id ? node.id.name : '<anonymous function>';
  let parmNames = "";
  if (node.params.length) {
      parmNames = "${" + node.params.map(param => param.name).join("}, ${") + "}";
  }
  const lineN = node.loc.start.line;
  const beforeCode = "console.log(" + "`" + "Entering " + name + "(" + parmNames + ")" + " at line " + lineN + "`" + ");";
  const beforeNodes = espree.parse(beforeCode, {ecmaVersion: espree.latestEcmaVersion}).body;
  node.body.body = beforeNodes.concat(node.body.body);
}

/*
function addBeforeCode(node) {
  const name = node.id ? node.id.name : '<anonymous function>';
  let beforeCode = "console.log('Entering " + name + "(";
  for (let parametro of node.params) {
    if (node.params.indexOf(parametro) !== node.params.length - 1) {
      beforeCode += parametro.name + ", "; 
    } else {
      beforeCode += parametro.name;
    }
  }
  const lineN = node.loc.start.line;
  beforeCode += `) at line ${lineN}');`
  const beforeNodes = espree.parse(beforeCode).body;
  node.body.body = beforeNodes.concat(node.body.body); 
}
*/