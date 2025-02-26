import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-calender',
  imports: [CommonModule,BsDatepickerModule, FormsModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalenderComponent {

  selectedDate:any;
  @Output() dateSelected = new EventEmitter<Date>();
  onDateSelect(date: Date) {
    this.dateSelected.emit(date);
  }

}
