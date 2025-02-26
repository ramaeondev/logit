import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday } from 'date-fns';


@Component({
  selector: 'app-calender',
  imports: [CommonModule,BsDatepickerModule, FormsModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalenderComponent {

  currentMonth: string = '';
  daysInMonth: { date: Date; eventTypes: { type: string; count: number }[] }[] = [];
  
  @Output() dateSelected = new EventEmitter<Date>();

  // Sample event data (Replace with actual data from API)
  eventData: { [key: string]: { type: string; count: number }[] } = {
    '2025-02-01': [{ type: 'work', count: 2 }, { type: 'personal', count: 1 }],
    '2025-02-10': [{ type: 'meeting', count: 3 }],
    '2025-02-15': [{ type: 'personal', count: 5 }],
    '2025-02-26': [{ type: 'work', count: 4 }, { type: 'meeting', count: 2 }]
  };

  ngOnInit() {
    this.generateMonthView(new Date());
  }

  generateMonthView(date: Date) {
    this.currentMonth = format(date, 'MMMM yyyy');
    
    const days = eachDayOfInterval({ 
      start: startOfMonth(date), 
      end: endOfMonth(date) 
    });

    this.daysInMonth = days.map(day => ({
      date: day,
      eventTypes: this.eventData[format(day, 'yyyy-MM-dd')] || []
    }));
  }

  selectDate(day: Date) {
    this.dateSelected.emit(day);
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }

}
