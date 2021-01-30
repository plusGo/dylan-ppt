export class TextUtil {
    /**
     * 根据字体大小获取对应的层高
     */
    static getLineHeightByFontSize(fontSize: number): number {
        return fontSize * 1.6;
    }

    /**
     * 根据字体大小获取对应的层高
     */
    static getLineYByFontSize(fontSize: number): number {
        return fontSize / 0.7621;
    }
}
