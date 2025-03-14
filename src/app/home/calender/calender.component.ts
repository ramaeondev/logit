import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Inject, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday } from 'date-fns';
import { NotesService } from '../../../services/notes.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NoteStateService } from '../../../services/notes-state.service';
import { DayData, NotesApiResponse } from '../../models/notes.model';
import { LucideAngularModule, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight} from 'lucide-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { v4 as uuidv4 } from 'uuid';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { Note } from '../../models/notes.model';

@Component({
  selector: 'app-calender',
  imports: [CommonModule, BsDatepickerModule, FormsModule, LucideAngularModule, MatFormFieldModule,
    MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatOptionModule ],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalenderComponent implements OnInit {
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronsLeft = ChevronsLeft;
  readonly ChevronRight = ChevronRight;
  readonly ChevronsRight = ChevronsRight;
  date = new FormControl(new Date());

  currentDate: Date = new Date();
  currentMonth: string = '';
  selectedDate: Date | null = null;
  daysInMonth: WritableSignal<DayData[]> = signal<DayData[]>([]);

  @Output() dateSelected = new EventEmitter<Date>();
  private readonly destroyRef = inject(DestroyRef)
  private noteStateService = inject(NoteStateService);
  private notesService = inject(NotesService);
  selectedMonth: string = format(new Date(), 'yyyy-MM');

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
    const month = this.currentDate.getMonth() + 1;
    const year = this.currentDate.getFullYear();
    this.notesService.getMonthlyNotesCounts(month, year)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: { data: NotesApiResponse }) => {
        this.generateMonthWithEvents(this.currentDate, res.data);
      });
  }

  loadNotes(selectedDate: Date) {
    let targetDate: string = format(selectedDate, 'yyyy-MM-dd');
    console.log(targetDate);
    this.notesService.loadNotesSelectedDate(targetDate)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: {data : Note[]}) => {
        console.log(res);
        this.noteStateService.dateChange$.next(res.data);
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
        id: uuidv4(),
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

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.loadMonthlyCounts();
  }
  
  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.loadMonthlyCounts();
  }
  
  prevYear() {
    this.currentDate = new Date(this.currentDate.getFullYear() - 1, this.currentDate.getMonth(), 1);
    this.loadMonthlyCounts();
  }
  
  nextYear() {
    this.currentDate = new Date(this.currentDate.getFullYear() + 1, this.currentDate.getMonth(), 1);
    this.loadMonthlyCounts();
  }


  setMonthAndYear(event: Date, datepicker: MatDatepicker<Date>) {
    console.log("Month selected:", event);

    const year = event.getFullYear();
    const month = event.getMonth() + 1; // Months are zero-based

    this.currentDate = new Date(year, month - 1, 1);
    this.generateMonthWithEvents(this.currentDate);

    datepicker.close(); // Close the date picker after selection
  }
  
}
