import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  formGroup: FormGroup;
  data: any = {
    name: '',
    code: '',
    description: '',
    active: true,
    shiftDetails: [
      { dayName: 'Sunday', startTime: '' },
      { dayName: 'Monday', startTime: '' },
      { dayName: 'Tuesday', startTime: '' },
      { dayName: 'Wednsday', startTime: '' },
      { dayName: 'Thursday', startTime: '' },
      { dayName: 'Friday', startTime: '' },
      { dayName: 'Saturday', startTime: '' },
    ]
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [this.data.id],
      'code': [this.data.code, [Validators.required]],
      'name': [this.data.name, Validators.required],
      'description': [this.data.description],
      'shiftDetails': [this.data.shiftDetails],
    });
  }

  onSubmit = async (values: any) => {
    console.log(values)
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  ngOnInit() {
    this.createForm();
  }

}
