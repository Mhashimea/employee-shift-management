import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { post } from 'src/app/services/http-request';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-shift-editor',
  templateUrl: './shift-editor.component.html',
  styleUrls: ['./shift-editor.component.scss'],
})
export class ShiftEditorComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  formGroup: FormGroup;
  data: any = {
    name: '',
    code: '',
    description: '',
    active: true,
    totalHrs: '',
    startTime: '',
    endTime: '',
    totalBreakHrs: '',
    breakStartTime: '',
    breakEndTime: '',
  };

  createForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.data.id],
      code: [this.data.code, [Validators.required]],
      name: [this.data.name, Validators.required],
      description: [this.data.description],
      totalHrs: [this.data.totalHrs, Validators.required],
      totalBreakHrs: [this.data.totalHrs, Validators.required],
      startTime: [this.data.totalHrs, Validators.required],
      endTime: [this.data.totalHrs, Validators.required],
      breakStartTime: [this.data.totalHrs, Validators.required],
      breakEndTime: [this.data.totalHrs, Validators.required],
    });
  }

  onSubmit = async (values: any) => {
    console.log(values);
    const response = await post('add-shift', { payload: values });
    if (response.success) this.cancelAction()
  };

  getShiftById = async (id: any) => {
    const response = await post('get-shift-byId', { id: 1 });
    if (response.success) {
      this.data = response.data;
      this.createForm();
    }
  };

  cancelAction() {
    this.router.navigate(['/shifts', {}]);
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  ngOnInit() {
    this.createForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getShiftById(id)
    }
    console.log(id)
  }
}
