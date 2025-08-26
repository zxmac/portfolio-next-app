import { IGSheet } from "../models/cv.model";

export class SheetLib {
    public static filterSheet(list: IGSheet[], groupId: string): IGSheet[] {
        return list.filter(x => x.groupId === groupId);
    }
    public static findData(list: IGSheet[], key: string): string {
        const data: IGSheet | undefined = list.find((x) => x.key === key);
        return data ? data.value : "N/A";
    }
    public static filterData(list: IGSheet[], key: string): string[] {
        return list.filter((x: IGSheet) => x.key === key).map((x: IGSheet) => x.value);
    }
    public static groupData(list: IGSheet[], k: string = "key") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return list.reduce((group: any, obj) => {
            const key = Object.entries(obj).map(([key, obj]) => ({key, obj})).find(x => x.key == k)?.obj;
            group[key] = group[key] ?? [];
            group[key].push(obj);
            return group;
        }, {});
    }
    public static formatSheets(list: [][]) {
        const keys = list[0]
        return list.slice(1).map(arr => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const obj: IGSheet = {} as any;
            for (let i = 0; i < keys.length; i++) {
                obj[keys[i]] = arr[i]
            }            
            return obj;
        })
    }
}