import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { get } from 'src/app/services/http-request';

export interface ShiftsI {
  id: number | null
  name: string
  code: string
  shiftDetails: any[]
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
    'Sift Name',
    'Start Code',
    'Shift Days',
    'Actions'
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
    console.log(this.dataSource)
  }

  ngOnInit(): void {
    this.getShifts()
  }

}
