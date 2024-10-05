type Lucifer = LeetCode;
type LeetCode<T = {}> = {
  name: T;
};


interface Sizeable {
    size: number;
  }
function trace<T extends Sizeable>(arg: T): T {
    console.log(arg.size);
    return arg;
  }
  function id<T, U>(arg1: T, arg2: U): T {
    return arg1;
  }

  let str = "Hello";
  let str2={value:"hello",test:3}

  str2.test = 5;
  
  console.log(str2.test);
  
  