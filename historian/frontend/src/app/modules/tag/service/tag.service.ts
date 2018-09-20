import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { IModelService } from '../../../shared/base-model-service';
import { Utilities } from '../../../shared/utilities.service';
import { HistorianTag } from '../modele/HistorianTag';
import { OpcTag } from '../modele/OpcTag';
import { Tag } from '../modele/tag';
import { TagUtils } from '../modele/TagUtils';
import { TagHistorianService } from './tag-historian.service';
import { TagOpcService } from './tag-opc.service';

@Injectable()
export class TagService implements IModelService<Tag> {

  private tagsUrl = `${environment.HISTORIAN_API_BASE_URL}`;

  constructor(private http: HttpClient,
    private help: Utilities,
    private tagOpcService: TagOpcService,
    private tagHistorianService: TagHistorianService) { }

  getAll(): Observable<Tag[]> {
    throw new Error('Method not implemented.');
  }

  get(id: string): Observable<Tag> {
    throw new Error('Method not implemented.');
  }

  gets(datasourceIds: string[]): Observable<Tag[]> {
    const tagFromOpc: Observable<OpcTag[]> = this.tagOpcService.gets(datasourceIds);
    const tagFromHist: Observable<HistorianTag[]> = this.tagHistorianService.getAllFromDatasources(datasourceIds);
    const zippedTags = this.help.zipObs(tagFromOpc, tagFromHist);
    return zippedTags.pipe(
      map(tags => this.mergeTags(tags))
    );
  }

  save(obj: Tag): Observable<Tag> {
    throw new Error('Method not implemented.');
  }

  update(obj: Tag): Observable<Tag> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Observable<Tag> {
    throw new Error('Method not implemented.');
  }
  /** Merge tags with same id (combine properties).
   * The array length returned may be inferior (if at least a match has been found)
   *
   * @param tags an array of Tag
   */
  private mergeTags(tags: Tag[]): Tag[] {
    const mergedTag: Map<string, Tag> = tags.reduce(
      (r, v) => {
        if (r.has(v.id)) {
          const oldTag = r.get(v.id);
          if (TagUtils.isHistorianTag(oldTag)) {
            Object.assign(oldTag, v);
          } else {
            r.set(v.id, new HistorianTag(v));
          }
        } else {
          r.set(v.id, v);
        }
        return r;
      },
      new Map<string, Tag>()
    );
    return Array.from(mergedTag.values());
  }
}
