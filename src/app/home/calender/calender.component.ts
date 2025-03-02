import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Inject, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday } from 'date-fns';
import { NotesService } from '../../../services/notes.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NoteStateService } from '../../../services/notes-state.service';
import { DayData, NotesApiResponse } from '../../models/notes.model';
@Component({
  selector: 'app-calender',
  imports: [CommonModule, BsDatepickerModule, FormsModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalenderComponent implements OnInit {
  
  currentDate: Date = new Date();
  currentMonth: string = '';
  selectedDate: Date | null = null;
  daysInMonth: WritableSignal<DayData[]> = signal<DayData[]>([]);

  @Output() dateSelected = new EventEmitter<Date>();
  private readonly destroyRef = inject(DestroyRef)
  private noteStateService = inject(NoteStateService);
  private notesService = inject(NotesService);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadMonthlyCounts();
    this.loadNotes(new Date());
  }

  selectDate(day: Date) {
    this.selectedDate = day;
    this.dateSelected.emit(day);
    this.noteStateService.setSelectedDate(day);
    this.loadNotes(day);
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }

  isSelected(date: Date): boolean {
    return this.selectedDate ? format(this.selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') : false;
  }

  loadMonthlyCounts() {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    this.notesService.getMonthlyNotesCounts(currentMonth, currentYear)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: { data: NotesApiResponse }) => {
        this.generateMonthWithEvents(today, res.data);
      });
  }

  loadNotes(selectedDate: Date) {
    let targetDate: string = format(selectedDate, 'yyyy-MM-dd');
    console.log(targetDate);
    this.notesService.loadNotesSelectedDate(targetDate)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        console.log(res);
      });
  }

  generateMonthWithEvents(date: Date, noteData: NotesApiResponse = {}) {
    this.currentMonth = format(date, 'MMMM yyyy');
  
    const days = eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date)
    });
  
    const updatedDays = days.map(day => {
      const key = format(day, 'yyyy-MM-dd');
      return {
        date: day,
        eventTypes: noteData[key]?.map(category => ({
          name: category.name,
          count: category.count,
          color: category.color,
          category_id: category.category_id,
          numeric_id: category.numeric_id
        })) || []
      };
    });
    this.daysInMonth.set(updatedDays);
    this.cdr.detectChanges();
  }

}
