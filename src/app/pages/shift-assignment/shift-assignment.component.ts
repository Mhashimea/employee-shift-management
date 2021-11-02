import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { get, post } from 'src/app/services/http-request';
import * as _ from 'lodash';

@Component({
  selector: 'app-shift-assignment',
  templateUrl: './shift-assignment.component.html',
  styleUrls: ['./shift-assignment.component.scss'],
})
export class ShiftAssignmentComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = [
    '#',
    'Employee Name',
    'Shift Name',
    'Start Date',
    'End Date',
    'Actions',
  ];
  dataSource: any[] = []


  openDialog(data?: any) {
    const dialogRef = this.dialog.open(ShiftAssignmentForm, {
      data: data ? data : {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'cancel') this.getShiftAssignments();
    });
  }

  onEditEmployee(data: any) {
    this.openDialog(data);
  }

  getShiftAssignments = async () => {
    const response = await get('shift-assignments');
    if (response.success) this.dataSource = response.data;
  };

  convertToLodash(value: any, data: string) {
    return _.get(value, data)
  }

  ngOnInit(): void {
    this.getShiftAssignments();
  }
}

@Component({
  selector: 'shift-assignment-form',
  templateUrl: './shift-assignment-form.component.html',
  styleUrls: ['./shift-assignment.component.scss'],
})
export class ShiftAssignmentForm {
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ShiftAssignmentForm>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  formGroup: FormGroup;
  btnLoading: false;
  loading: boolean = false;
  employees: any[] = []
  shifts: any[] = []
  holidays: any[] = []

  myFilter = (d: Date | null): boolean => {
    const day = 0
    return day !== 0 && day !== 6;
  }

  onSubmit = async (values: any) => {
    this.loading = true;
    const response = await post('assign-shift', { payload: values });
    if (response.success) {
      this._snackBar.open(
        response.message ? response.message : 'Shift assigned  Successfully',
        'OK'
      );
      this.dialogRef.close('success');
    } else {
      this._snackBar.open(
        response.message ? response.message : 'Internal Server Error',
        'OK'
      );
    }
    this.loading = false;
  };

  getShifts = async () => {
    const response = await get("shifts")
    if (response.success) this.shifts = response.data
  }

  getEmployees = async () => {
    const response = await get("users")
    if (response.success) this.employees = response.data
  }

  getHolidays = async () => {
    const response = await get("holidays")
    if (response.success) this.holidays = response.data
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.data.id],
      shiftMasterId: [this.data.shiftMasterId, [Validators.required]],
      employeeId: [this.data.employeeId, Validators.required],
      startDate: [this.data.startDate, Validators.required],
      endDate: [this.data.endDate, Validators.required],
    });
  }

  get name() {
    return this.formGroup.get('employeeId') as FormControl;
  }

  ngOnInit() {
    this.getShifts()
    this.getHolidays()
    this.getEmployees()
    this.createForm();
  }
}
