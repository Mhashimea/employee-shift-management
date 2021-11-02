import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { EmployeeComponent, EmployeeFormDialog } from './pages/employee/employee.component';
import { HolidayFormDialog, HolidaysComponent } from './pages/holidays/holidays.component';
import { ShiftAssignmentComponent, ShiftAssignmentForm } from './pages/shift-assignment/shift-assignment.component';
import { ShiftEditorComponent } from './pages/shifts/shift-editor/shift-editor.component';
import { ShiftsComponent } from './pages/shifts/shifts.component';
import { MomentPipe } from './pipes/MomemtPipe';

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
    ShiftAssignmentComponent,
    ShiftAssignmentForm,
    CalendarComponent
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
    MatSnackBarModule,
    MatSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent, MatDatepickerToggle],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
