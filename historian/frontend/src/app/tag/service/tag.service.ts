import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, zip } from 'rxjs/operators';

import { IModelService } from '../../shared/base-model-service';
import { Utilities } from '../../shared/utilities.service';
import { IHistorianTag } from '../modele/HistorianTag';
import { IOpcTag } from '../modele/OpcTag';
import { ITag } from '../modele/tag';
import { TagHistorianService } from './tag-historian.service';
import { TagOpcService } from './tag-opc.service';

@Injectable()
export class TagService implements IModelService<ITag> {

  private tagsUrl = 'http://localhost:8701/api/v1/';

  constructor(private http: HttpClient,
    private help: Utilities,
    private tagOpcService: TagOpcService,
    private tagHistorianService: TagHistorianService) { }

  getAll(): Observable<ITag[]> {
    throw new Error('Method not implemented.');
  }

  get(id: string): Observable<ITag> {
    throw new Error('Method not implemented.');
  }

  gets(datasourceIds: string[]): Observable<ITag[]> {
    const tagFromOpc: Observable<IOpcTag[]> = this.tagOpcService.gets(datasourceIds);
    const tagFromHist: Observable<IHistorianTag[]> = this.tagHistorianService.getAllFromDatasources(datasourceIds);
    const zippedTags = this.help.zipObs(tagFromOpc, tagFromHist);
    return zippedTags.pipe(
      map(tags => this.mergeTags(tags))
    );
  }

  save(obj: ITag): Observable<ITag> {
    throw new Error('Method not implemented.');
  }

  update(obj: ITag): Observable<ITag> {
    throw new Error('Method not implemented.');
  }

  delete(obj: ITag): Observable<ITag> {
    throw new Error('Method not implemented.');
  }
  /** Merge tags with same id (combine properties).
   * The array length returned may be inferior (if at least a match has been found)
   *
   * @param tags an array of ITag
   */
  private mergeTags(tags: ITag[]): ITag[] {
    const mergedTag: Map<string, ITag> = tags.reduce(
      (r, v) => {
        if (r.has(v.id)) {
          const oldTag = r.get(v.id);
          Object.assign(oldTag, v);
        } else {
          r.set(v.id, v);
        }
        return r;
      },
      new Map<string, ITag>()
    );
    return Array.from(mergedTag.values());
  }
}
