import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './pages/employee/employee.component';
import { HolidaysComponent } from './pages/holidays/holidays.component';
import { ShiftAssignmentComponent } from './pages/shift-assignment/shift-assignment.component';
import { ShiftEditorComponent } from './pages/shifts/shift-editor/shift-editor.component';
import { ShiftsComponent } from './pages/shifts/shifts.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'holidays', component: HolidaysComponent },
  { path: 'shifts', component: ShiftsComponent },
  { path: 'shifts/create', component: ShiftEditorComponent },
  { path: 'shifts/:id', component: ShiftEditorComponent },
  { path: 'shift-assignment', component: ShiftAssignmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
