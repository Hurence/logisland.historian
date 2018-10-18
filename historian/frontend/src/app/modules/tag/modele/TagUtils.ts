import { HistorianTag } from './HistorianTag';
import { ITag } from './tag';

export class TagUtils {

    public static isHistorianTag(tag: any): tag is HistorianTag {
        return tag instanceof HistorianTag;
    }
}
