function f() {
    var value = Math.random();
    return function () { return value; };
}
var g = f();
// 数组中的 3 个函数，每个都与来自对应的 f() 的词法环境相关联
var arr = [g(), g(), g()];
console.log(arr);
