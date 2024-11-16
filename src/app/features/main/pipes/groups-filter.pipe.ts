import { Pipe, PipeTransform } from '@angular/core';
import { GroupResponse } from '../../../../generated';

@Pipe({
  name: 'groupsFilter',
  standalone: true
})
export class GroupsFilterPipe implements PipeTransform {

  transform(items: GroupResponse[], searchType: string): GroupResponse[] {
    if (!items || !searchType) {
      return items; // Return original array if no items or search text
    }

    return items.filter(item => item.type === searchType);
  }

}
