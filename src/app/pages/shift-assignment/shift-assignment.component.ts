import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { get, post } from 'src/app/services/http-request';
import lodashGet from 'lodash/get'

export interface ShiftAssignmentI {
  id?: number
  employeeId?: any
  shiftMasterId?: any
  date?: string
}

@Component({
  selector: 'app-shift-assignment',
  templateUrl: './shift-assignment.component.html',
  styleUrls: ['./shift-assignment.component.scss']
})
export class ShiftAssignmentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = [
    '#',
    'Employee Name',
    'Shift Name',
    'Assigned Date',
    'Actions'
  ];
  dataSource: ShiftAssignmentI[] = [];

  openDialog(data?: ShiftAssignmentI) {
    const dialogRef = this.dialog.open(ShiftAssignmentForm, {
      data: data ? data : {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancel')
        this.getShiftAssignments()
    });
  }

  onEditEmployee(data: ShiftAssignmentI) {
    this.openDialog(data)
  }

  getShiftAssignments = async () => {
    const response = await get("getShiftAssignments")
    if (response.success) this.dataSource = response.data
  }

  ngOnInit(): void {
    this.getShiftAssignments()
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
    @Inject(MAT_DIALOG_DATA) public data: ShiftAssignmentI
  ) { }

  formGroup: FormGroup;
  btnLoading: false
  loading: boolean = false

  onSubmit = async (values: ShiftAssignmentI) => {
    this.loading = true
    const response = await post("assign-shift", { payload: values })
    if (response.success) {
      this._snackBar.open(response.message ? response.message : 'Shift assigned  Successfully', "OK");
      this.dialogRef.close("success");
    } else {
      this._snackBar.open(response.message ? response.message : 'Internal Server Error', "OK");
    }
    this.loading = false

  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [this.data.id],
      'shiftMasterId': [this.data.shiftMasterId, [Validators.required]],
      'employeeId': [this.data.employeeId, Validators.required],
      'date': [this.data.date, Validators.required],
    });
  }

  get name() {
    return this.formGroup.get('employeeId') as FormControl
  }

  ngOnInit() {
    this.createForm();
  }
}