import { Injectable } from '@angular/core';

@Injectable()
export class ArrayUtil {


  exist<T>(array: T[], find: (T) => boolean): boolean {
    const index = array.findIndex(find);
    return (index !== -1);
  }

  remove<T>(array: T[], find: (T) => boolean) {
      const index = array.findIndex(find);
      if (index !== -1) {
          array.splice(index, 1);
      }
  }

       /** group the array by a key
   *
   * Example:
   * {{{
   *    groupBy(Array[1,2,3,4,5,6], (i) => i % 2)
   * }}}
   * will return the following object
   * {{{
   *    {
   *      '0': [2, 4, 6],
   *      '1': [1, 3, 5],
   *    }
   * }}}
   *
   * @param array the array to group
   * @param key a method that return the key to group by
   */
  groupBy<T, K>(array: T[], key: (T) => string): any {
    return array.reduce(
      (r, v) => {
        (r[key(v)] = r[key(v)] || []).push(v);
        return r;
      },
      {}
    );
  }
}
