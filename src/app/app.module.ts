import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';



import { EmployeeComponent, EmployeeFormDialog } from './pages/employee/employee.component'
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MomentPipe } from './pipes/MomemtPipe';
import { HolidayFormDialog, HolidaysComponent } from './pages/holidays/holidays.component';
import { ShiftsComponent } from './pages/shifts/shifts.component';
import { ShiftEditorComponent } from './pages/shifts/shift-editor/shift-editor.component';
import { ShiftAssignmentComponent } from './pages/shift-assignment/shift-assignment.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeFormDialog,
    HolidayFormDialog,
    MomentPipe,
    HolidaysComponent,
    ShiftsComponent,
    ShiftEditorComponent,
    ShiftAssignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent, MatDatepickerToggle]
})
export class AppModule { }
