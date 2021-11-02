import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { get, post } from 'src/app/services/http-request';

export interface EmployeeI {
  id?: number
  fullName: string;
  email: string;
  phone: string;
  dateOfJoin: string;
  createdAt?: string
  updatedAt?: string
  active?: boolean
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  @Input("onFinishSubmit")

  displayedColumns: string[] = [
    '#',
    'Employee Name',
    'Email',
    'Phone',
    'Date Of Join',
    'Assigned Shift',
    'Actions',
  ];
  dataSource: EmployeeI[] = [];

  openDialog(data?: EmployeeI) {
    const dialogRef = this.dialog.open(EmployeeFormDialog, {
      data: data ? data : {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancel')
        this.getEmployees()
    });
  }

  onEditEmployee(data: EmployeeI) {
    this.openDialog(data)
  }

  getEmployees = async () => {
    const response = await get("users")
    if (response.success) this.dataSource = response.data
  }

  ngOnInit(): void {
    this.getEmployees()
  }
}

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeFormDialog {
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EmployeeFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeI
  ) { }
  @Output() onFinishSubmit = new EventEmitter<any>();

  formGroup: FormGroup;
  btnLoading: false
  loading: boolean = false

  onSubmit = async (values: EmployeeI) => {
    this.loading = true
    const response = await post("add-user", { payload: values })
    if (response.success) {
      this._snackBar.open(response.message ? response.message : 'User Created Successfully', "OK");
      this.dialogRef.close("success");
    } else {
      this._snackBar.open(response.message ? response.message : 'Internal Server Error', "OK");
    }
    this.loading = false

  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'id': [this.data.id],
      'email': [this.data.email, [Validators.required, Validators.pattern(emailregex)]],
      'fullName': [this.data.fullName, Validators.required],
      'phone': [this.data.phone, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      'dateOfJoin': [this.data.dateOfJoin, Validators.required],
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
