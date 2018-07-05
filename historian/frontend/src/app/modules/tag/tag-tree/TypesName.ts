import { ITag, Tag } from '../modele/tag';

export enum TypesName {
    TAGS = 'tags',
    DOMAIN = 'domain',
    SERVER = 'server',
    GROUP = 'group',
    TAG_OPC = 'opc-tag',
    TAG_HISTORIAN = 'historian-tag',
    TAG_IN_DATASET = 'tag-in-dataset',
  }

  export namespace TypesName {
    export function getType(tag: ITag): TypesName {
      if (Tag.isHistorianTag(tag)) return TypesName.TAG_HISTORIAN;
      return TypesName.TAG_OPC;
    }
  }
