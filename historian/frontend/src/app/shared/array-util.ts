import { Injectable } from '@angular/core';
import { bloomAdd } from '@angular/core/src/render3/di';

@Injectable()
export class ArrayUtil {


    remove<T>(array: T[], find: (T) => boolean) {
        const index = array.findIndex(find);
        if (index !== -1) {
            array.splice(index, 1);
        }
    }
}
