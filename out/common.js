/// <reference path="references.ts" />
export { clone };
//Thank you StackOverflow
//Note: do not use on objects than contain functions, or Date objects
//Also avoid using in CPU-intensive code unless necessary, performance cost over manually creating objects
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
//# sourceMappingURL=common.js.map