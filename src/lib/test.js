function trace(arg) {
    console.log(arg.size);
    return arg;
}
function id(arg1, arg2) {
    return arg1;
}
var str = "Hello";
var str2 = { value: "hello", test: 3 };
str2.test = 5;
console.log(str2.test);
