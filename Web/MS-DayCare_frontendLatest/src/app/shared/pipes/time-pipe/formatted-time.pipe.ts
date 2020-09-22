import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'formattedTime',
})
export class FormattedTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      return value === undefined ? null : moment.utc(value).local().format('h:mm A');
  }

}
