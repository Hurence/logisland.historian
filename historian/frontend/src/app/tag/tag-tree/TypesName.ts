import { ITag, Tag } from '../modele/tag';

export enum TypesName {
    TAGS = 'tags',
    DOMAIN = 'domain',
    SERVER = 'server',
    GROUP = 'group',
    TAG_OPC = 'tag-opc',
    TAG_HISTORIAN = 'tag-historian',
    TAG_IN_DATASET = 'tag-in-dataset',
  }

  export namespace TypesName {
    export function getType(tag: ITag): TypesName {
      if (Tag.isHistorianTag(tag)) return TypesName.TAG_HISTORIAN;
      return TypesName.TAG_OPC;
    }
  }
