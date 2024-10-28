

function f() {
  let value = Math.random();

  return function() { return value };
}
let g=f()
// 数组中的 3 个函数，每个都与来自对应的 f() 的词法环境相关联
let arr = [g(), g(), g()];
console.log(arr)