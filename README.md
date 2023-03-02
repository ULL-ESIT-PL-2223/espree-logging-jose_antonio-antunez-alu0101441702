[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-f4981d0f882b2a3f0472912d15f9806d57e124e0fc890972558857b51b24a6f9.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=10273587)
# Práctica Espree logging

## Resumen de lo aprendido

...

## CLI con [Commander.js](https://www.npmjs.com/package/commander)

```javascript
program
  .version(version)
  .argument("<filename>", 'file with the original code')
  .option("-o, --output <filename>", "file in which to write the output")
  .action((filename, options) => {
    transpile(filename, options.output);
  });
program.parse(process.argv);
```

## Indicar los valores de los argumentos, soportar funciones flecha y añadir el número de línea

Se ha modificado el código de `logging-espree.js` para que el log también indique los valores de los argumentos que se pasaron a la función. 
Ejemplo:

```javascript
function foo(a, b) {
  var x = 'blah';
  var y = (function (z) {
    return z+3;
  })(2);
}
foo(1, 'wut', 3);
```

```javascript
function foo(a, b) {
    console.log(`Entering foo(${ a }, ${ b })`);
    var x = 'blah';
    var y = function (z) {
        console.log(`Entering <anonymous function>(${ z })`);
        return z + 3;
    }(2);
}
foo(1, 'wut', 3);
```

## Tests and Covering

...
## Publicación como paquete npm
 1) Darse de alta en npm
 2) npm adduser
 3) Comprobamos que estamos loggeados
 4) package.json (repo, name con scope (nombre de usuario)...)
 5) npm publish --access public
...
## Scripts en package.json

...
## Github Actions

## Documentación

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [transpile][1]
    *   [Parameters][2]
*   [addLogging][3]
    *   [Parameters][4]
*   [addBeforeCode][5]
    *   [Parameters][6]

## transpile

Transpiler for JavaScript, adds console.log at the beggining of functions

### Parameters

*   `inputFile` **File** File with JS code
*   `outputFile` **File**&#x20;

Returns **any** outputFile with the code including console.log in functions, if no
outputFile was specificated it will print the output

## addLogging

Takes code as a string and returns an AST wiht the console.log's added
at the start of functions

### Parameters

*   `code` **[string][7]**&#x20;

Returns **any** AST of the code with the console.log's added

## addBeforeCode

Adds console.log to the node of the function (passed by reference because its an object)

### Parameters

*   `node` **[object][8]** AST node of a function

[1]: #transpile

[2]: #parameters

[3]: #addlogging

[4]: #parameters-1

[5]: #addbeforecode

[6]: #parameters-2

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[8]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object