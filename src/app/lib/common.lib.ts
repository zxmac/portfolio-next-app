export class CommonLib {
    public static getSearchParams(window: Window) {
        const list = window.location.search.replace('?', '').split('&')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return list.reduce((group: any, obj: string) => {
            const paramArr = obj.split('=')
            const key = paramArr[0]
            group[key] = paramArr[1];
            return group;
        }, {});
    }
    public static isMobile(window: Window) {
        return window.innerWidth < 640
    }
}