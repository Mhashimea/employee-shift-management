import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { get, post } from 'src/app/services/http-request';

export interface HolidayI {
  id: number | null
  name: string
  code: string
  startDate: string
  endDate: string
  active: boolean
}

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = [
    '#',
    'Holiday Name',
    'Code',
    'Start Date',
    'End Date',
    'Status',
    'Actions'
  ];
  dataSource: HolidayI[] = [];

  openDialog(data?: HolidayI) {
    const dialogRef = this.dialog.open(HolidayFormDialog, {
      data: data ? data : {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancel')
        this.getHolidays()
    });
  }

  onEditEmployee(data: HolidayI) {
    this.openDialog(data)
  }

  getHolidays = async () => {
    const response = await get("holidays")
    if (response.success) this.dataSource = response.data
  }

  ngOnInit(): void {
    this.getHolidays()
  }
}


@Component({
  selector: 'holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holidays.component.scss'],
})
export class HolidayFormDialog {
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<HolidayFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: HolidayI
  ) { }

  formGroup: FormGroup;
  btnLoading: false
  loading: boolean = false

  onSubmit = async (values: HolidayI) => {
    this.loading = true
    const response = await post("add-holiday", { payload: values })
    if (response.success) {
      this._snackBar.open(response.message ? response.message : 'Holiday Created Successfully', "OK");
      this.dialogRef.close("success");
    } else {
      this._snackBar.open(response.message ? response.message : 'Internal Server Error', "OK");
    }
    this.loading = false

  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [this.data.id],
      'code': [this.data.code, [Validators.required]],
      'name': [this.data.name, Validators.required],
      'startDate': [this.data.startDate],
      'endDate': [this.data.endDate, Validators.required],
      'active': [this.data.active || true]
    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  ngOnInit() {
    this.createForm();
  }
}
