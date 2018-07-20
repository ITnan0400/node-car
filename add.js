var a=9;
function test() {
    var a = 7;
    function again() {
        var a = 8;
        console.log(a);  // First  8
    }
    again();
    console.log(a);  // Second  7
}
test();
console.log(a);   //  9