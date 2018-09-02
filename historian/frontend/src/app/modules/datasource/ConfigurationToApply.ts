import { Observable } from 'rxjs';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { HistorianTag } from '../tag/modele/HistorianTag';
import { TagHistorianService } from '../tag/service/tag-historian.service';


export enum Operation {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export interface IModification<T> {
  operation: Operation;
  item: T;
}

export interface IModificationReport {
  nbrDeleted: number;
  nbrCreateOrUpdated: number;
}
// export interface IDatasourceConfigurationToApply {
//   originDatasource: Datasource,
//   datasourceModification: IModification<Datasource>,
//   tagModifications: IModification<HistorianTag>[],
// }

export class TagConfigurationToApply {

  private tagModifications: Map<string, IModification<HistorianTag>>;

  constructor() {
    this.tagModifications = new Map();
  }

  /**
   * Save modification Then
   * If successfull clear modifications
   * If partially successfull do not remove  modifications
   */
  apply(service: TagHistorianService): Observable<IModificationReport> {
    const tagsToDelete: string[] = [];
    const tagsToCreateOrUpdate: HistorianTag[] = [];
    this.tagModifications.forEach((modif: IModification<HistorianTag>, key: string) => {
      switch (modif.operation) {
        case Operation.DELETE:
          tagsToDelete.push(modif.item.id);
          break;
        default: // Either CREATE OR UPDATE
          tagsToCreateOrUpdate.push(modif.item);
          break;
      }
    });
    let deleteObs = Observable.of([]);
    if (tagsToDelete.length !== 0) {
      deleteObs = service.deleteMany(tagsToDelete);
    }
    let createOrUpdateObs = Observable.of([]);
    if (tagsToCreateOrUpdate.length !== 0) {
      createOrUpdateObs = service.saveMany(tagsToCreateOrUpdate);
    }
    return zip(deleteObs, createOrUpdateObs).pipe(
      map(results =>  {
        const deleted = results[0];
        const updated = results[1];
        console.log(`Deleted ${deleted.length} tags. Updated ${updated.length} tags.`);
        this.clear();
        return {
          nbrDeleted: deleted.length,
          nbrCreateOrUpdated: updated.length
        };
      })
    );
  }

  /**
   * return true if there is no modifications
   */
  isClean(): boolean {
    return this.tagModifications.size === 0;
  }

  clear(): void {
    this.tagModifications.clear();
  }

  /**
   * Add modification or remove it if the result of the modification has no effect.
   *
   * @param tagModif
   */
  addTagModification(tagModif: IModification<HistorianTag>): void {
    if (this.tagModifications.has(tagModif.item.node_id)) {
      const oldModif = this.tagModifications.get(tagModif.item.node_id);
      const newOp: Operation = this.mergeOperations(oldModif.operation, tagModif.operation);
      switch (newOp) {
        case null:
          this.tagModifications.delete(tagModif.item.node_id);
          break;
        case Operation.UPDATE:
          tagModif.operation = newOp;
          Object.assign(oldModif.item, tagModif.item);
          tagModif.item = oldModif.item;
          this.tagModifications.set(tagModif.item.node_id, tagModif);
          break;
        default:
          tagModif.operation = newOp;
          this.tagModifications.set(tagModif.item.node_id, tagModif);
          break;
      }
    } else {
      this.tagModifications.set(tagModif.item.node_id, tagModif);
    }
  }

  /**
   * return new type of operation to use when submitting to backend
   * If oldOp === Operation.CREATE and newOp === Operation.DELETE return null and it means that no operation should be operated
   *
   * @param oldOp
   * @param newOp
   */
  private mergeOperations(oldOp: Operation, newOp: Operation): Operation {
    switch (oldOp) {
      case Operation.CREATE:
        switch (newOp) {
          case Operation.CREATE:
          case Operation.UPDATE:
            return Operation.CREATE;
          case Operation.DELETE:
            return null;
        }
        break;
      case Operation.UPDATE:
        switch (newOp) {
          case Operation.CREATE:
          case Operation.UPDATE:
            return Operation.UPDATE;
          case Operation.DELETE:
            return Operation.DELETE;
        }
        break;
      case Operation.DELETE:
        switch (newOp) {
          case Operation.CREATE:
          case Operation.UPDATE:
            return Operation.UPDATE;
          case Operation.DELETE:
            return Operation.DELETE;
        }
        break;
    }
  }
}
