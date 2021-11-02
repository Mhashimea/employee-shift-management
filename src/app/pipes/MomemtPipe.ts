import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFormat' })
export class MomentPipe implements PipeTransform {
  transform(value: string | moment.Moment, dateFormat: string): any {
    if (value)
      return moment(value).format(dateFormat);
    else return null
  }
}