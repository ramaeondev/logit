import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday } from 'date-fns';
import { NotesService } from '../../../services/notes.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-calender',
  imports: [CommonModule,BsDatepickerModule, FormsModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalenderComponent implements OnInit {

  currentMonth: string = '';
  selectedDate: Date | null = null;
  daysInMonth: { date: Date; eventTypes: { type: string; count: number }[] }[] = [];
  
  @Output() dateSelected = new EventEmitter<Date>();

  // Sample event data (Replace with actual data from API)
  eventData: { [key: string]: { type: string; count: number }[] } = {
    '2025-02-01': [{ type: 'work', count: 2 }, { type: 'personal', count: 1 }],
    '2025-02-10': [{ type: 'meeting', count: 3 }],
    '2025-02-15': [{ type: 'personal', count: 5 }],
    '2025-02-26': [{ type: 'work', count: 4 }, { type: 'meeting', count: 2 }]
  };
  private readonly destroyRef = inject(DestroyRef)
  
  constructor( private readonly notesService: NotesService) { }

  ngOnInit() {
    this.generateMonthView(new Date());
    this.getAllNotes();
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
    console.log(day);
    this.selectedDate = day;
    this.dateSelected.emit(day);
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }

  isSelected(date: Date): boolean {
    return this.selectedDate ? format(this.selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') : false;
  }
  
  getAllNotes() {
    let today = new Date();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();
    this.notesService.getAllNotes(currentMonth,currentYear).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
      console.log(res);
    })
  }
}
