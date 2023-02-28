function foo(a, b) {
    console.log('Entering foo()');
    var x = 'blah';
    var y = function () {
        console.log('Entering <anonymous function>()');
        return 3;
    }();
}
foo(1, 'wut', 3);