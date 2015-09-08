class Point {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
    toString () {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

let point = new Point('zhaomeng', 'chenke');
console.log(point.toString());
console.log(point.constructor == Point.prototype.constructor)
console.log(Point.prototype.constructor === Point);

class ColorPoint extends Point {

  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    console.log(this.color + ' ' + super.toString()); // 调用父类的toString()
  }

}

let color = new ColorPoint('chutian', 'zhaomeng', 'chenke');
color.toString(); 

import { mixins } from './mixins'

const Foo = {
  foo() { console.log('foo') }
}

@mixins(Foo)
class MyClass {}

let obj = new MyClass()

obj.foo() // 'foo'