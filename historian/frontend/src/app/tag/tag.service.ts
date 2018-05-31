import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IModelService } from '../shared/base-model-service';
import { Utilities } from '../shared/utilities.service';
import { ITag } from './tag';
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
    throw new Error("Method not implemented.");
  }

  get(id: string): Observable<ITag> {
    throw new Error("Method not implemented.");
  }

  gets(datasourceIds: string[]): Observable<ITag[]> {
    //TODO add information about tags that are saved in historian
    return this.tagOpcService.gets(datasourceIds);
  }

  save(obj: ITag): Observable<ITag> {
    throw new Error("Method not implemented.");
  }

  update(obj: ITag): Observable<ITag> {
    throw new Error("Method not implemented.");
  }

  delete(obj: ITag): Observable<ITag> {
    throw new Error("Method not implemented.");
  }
}
