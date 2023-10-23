// export default class Compute{
//     plus(a,b){
//         return a+b;
//     }
//     minus(a,b){
//         return a-b
//     }
//     mul(a,b){
//         return a*b
//     }
//     div(a,b){
//         return a/b
//     }
// }

export default (target) => {
    target.prototype.plus=function(a, b){
        return a + b;
    }
    target.prototype.minus=function(a, b){
        return a - b
    }
    target.prototype.mul=function(a, b){
        return a * b
    }
    target.prototype.div=function(a, b){
        return a / b
    }
}