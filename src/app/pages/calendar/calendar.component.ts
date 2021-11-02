import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { get, post } from 'src/app/services/http-request';
import { CalendarEvent } from './utils';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  view: string = "month";
  activeDayIsOpen: boolean = true
  CalendarView = "month";
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  employees: any = []
  events: CalendarEvent[] = [];
  employeeId: any = null

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  getData = async (employeeId: number) => {
    const response = await post("get-shift-by-user", { employeeId: employeeId })
    if (response.success) {
      this.events = []
      response.data.map((item: any) => {
        this.events.push({
          type: item.type,
          start: new Date(item.start),
          end: new Date(item.end),
          title: item.type === "HOLIDAY" ? 'Holiday' : _.get(item, "shiftDetails.name"),
          allDay: true,
          draggable: false,
          color: item.type === "HOLIDAY" ? colors.red : colors.blue,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          employeeDetails: _.get(item, "employee.fullName")
        })
      })
    }
  }

  getEmployees = async () => {
    const response = await get("users")
    if (response.success) {
      if (response.data.length > 0) {
        await this.getData(_.get(response, "data[0].id", null))
        this.employeeId = _.get(response, "data[0].id")
      }
      this.employees = response.data
    }
  }

  onChangeEmployee = (e: any) => {
    this.getData(e)
  }

  ngOnInit() {
    this.getEmployees()
  }

}
