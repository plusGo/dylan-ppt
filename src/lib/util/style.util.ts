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

    /**
     * @description 将StyleString转换为StyleMap
     * @example "color:red;font-size:12px;" => {"color":"red","font-size":"12px"}
     */
    static transformStrToMap(str: string): { [key: string]: string } {
        const result = {} as any;

        str.split(';').forEach($keyValue => {
            result[$keyValue.split(':')[0]] = $keyValue.split(':')[1];
        });

        return result;
    }
}
