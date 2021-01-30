export class IdUtil {
    private static count: number = 0;

    static generateId(prefix: string): string {
        IdUtil.count++;
        return `${prefix ? prefix + '_' : ''}${new Date().getTime()}_${IdUtil.count}`;
    }
}
