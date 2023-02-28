import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";

export async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8')
  const ast = espree.parse(input);
  let output = escodegen.generate(ast);
  output = addLogging(output); // añadir los console.log
  if (outputFile === undefined) {
      console.log(output);
      return;
  }
  await fs.writeFile(outputFile, output);
}

export function addLogging(code) {
  const ast = espree.parse(code, {ecmaversion: espree.latestEcmaVersion});
  estraverse.traverse(ast, {
      enter: function(node, parent) {
          if (node.type === 'FunctionDeclaration' ||
              node.type === 'FunctionExpression') {
              addBeforeCode(node);
          }
      }
  });
  return escodegen.generate(ast);
}

function addBeforeCode(node) {
  const name = node.id ? node.id.name : '<anonymous function>';
  //const beforeCode = "console.log('Entering " + name + "()');";
  let beforeCode = "console.log('Entering " + name + "(";
  for (let parametro of node.params) {
    console.log(parametro.name);
    //si es el último no poner la coma
    beforeCode += parametro.name + ", "; 
  }
  beforeCode += ")');"
  const beforeNodes = espree.parse(beforeCode).body;
  node.body.body = beforeNodes.concat(node.body.body);
}
