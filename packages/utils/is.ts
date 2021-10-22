export const nativeToString = Object.prototype.toString;
function isType<T>(type: string) {
    // 缩小传入 value 值的类型
    return function (value: any): value is T {
        console.log(nativeToString.call(value));
        return nativeToString.call(value) === `[object ${type}]`;
    };
}

// 判断数据类型
export const variableTypeDetection = {
    isNumber: isType("Number"),
    isString: isType("String"),
    isBoolean: isType("Boolean"),
    isNull: isType("Null"),
    isUndefined: isType("Undefined"),
    isSymbol: isType("Symbol"),
    isFunction: isType("Function"),
    isObject: isType("Object"),
    isArray: isType("Array"),
    isProcess: isType("process"),
    isWindow: isType<Window>("Window"),
};
