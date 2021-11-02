import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { get } from 'src/app/services/http-request';

export interface ShiftsI {
  id: number | null
  name: string
  code: string
  startTime: string
  endTime: string
  totalHrs: string
  totalBreakHrs: string
  active: boolean
}

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private router: Router,) { }

  displayedColumns: string[] = [
    '#',
    'Code',
    'Shift Name',
    'Start Time',
    'End Time',
    'Total Hours',
    'Total Break Hours',
    'Action'
  ];
  dataSource: ShiftsI[] = [];

  openEditor(data?: ShiftsI | 'create') {
    if (data === 'create') {
      this.router.navigate(['shifts/create'], {});
    } else {
      this.router.navigate([`shifts/${data?.id}`], {});
    }
  }

  getShifts = async () => {
    const response = await get("shifts")
    if (response.success) this.dataSource = response.data
  }

  ngOnInit(): void {
    this.getShifts()
  }

}
