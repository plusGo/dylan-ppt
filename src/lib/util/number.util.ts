export class NumberUtil {
    /**
     * @description 将数字转换为像素值
     * @example 1 => 1px
     */
    static coerceNumberProperty(value: any, fallbackValue ?: number): number {
        return coerceNumberProperty(value, fallbackValue)
    }
}

function coerceNumberProperty(value: any, fallbackValue = 0): number {
    return _isNumberValue(value) ? parseFloat(value) : fallbackValue;
}

/**
 * Whether the provided value is considered a number.
 * @docs-private
 */
function _isNumberValue(value: any): boolean {
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return !isNaN(parseFloat(value as any)) && !isNaN(parseFloat(value));
}
