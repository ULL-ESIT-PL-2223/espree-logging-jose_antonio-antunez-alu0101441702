function foo(a, b) {
    console.log('Entering foo()');
    var x = 'blah';
    var y = function (z) {
        console.log('Entering <anonymous function>()');
        return z + 3;
    }(2);
}
foo(1, 'wut', 3);