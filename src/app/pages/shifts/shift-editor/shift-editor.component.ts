import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { post } from 'src/app/services/http-request';

export interface ShiftEditorI {
  name: string
  code: string
  description?: string
  active?: boolean
}

@Component({
  selector: 'app-shift-editor',
  templateUrl: './shift-editor.component.html',
  styleUrls: ['./shift-editor.component.scss']
})
export class ShiftEditorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  formGroup: FormGroup;
  public data: any = {
    name: '',
    code: '',
    description: '',
    active: true,
    totalHrs: '',
    startTime: '',
    endTime: '',
    totalBreakHrs: '',
    breakStartTime: '',
    breakEndTime: ''
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [this.data.id],
      'code': [this.data.code, [Validators.required]],
      'name': [this.data.name, Validators.required],
      'description': [this.data.description],
      'totalHrs': [this.data.totalHrs, Validators.required],
      'totalBreakHrs': [this.data.totalHrs, Validators.required],
      'startTime': [this.data.totalHrs, Validators.required],
      'endTime': [this.data.totalHrs, Validators.required],
      'breakStartTime': [this.data.totalHrs, Validators.required],
      'breakEndTime': [this.data.totalHrs, Validators.required],
    });
  }

  onSubmit = async (values: any) => {
    console.log(values)
    const response = await post("add-shift", { payload: values })
    if (response.success) this.router.navigate(['/shifts', {}])
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  ngOnInit() {
    this.createForm();
  }

}
