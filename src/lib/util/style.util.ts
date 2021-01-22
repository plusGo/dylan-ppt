export class StyleUtil {
    /**
     * @description 将StyleMap转换为StyleString
     * @example {"color":"red","font-size":"12px"} => "color:red;font-size:12px;"
     */
    static transformMapToStr(map: { [key: string]: string }): string {
        return Object.keys(map).reduce(($value, $key) => {
            return $value + `${$key}:${map[$key]};`
        }, '')
    }
}