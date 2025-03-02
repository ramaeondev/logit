import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NoteStateService } from '../../../services/notes-state.service';
import { Note } from '../../models/notes.model';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-all-notes',
  imports: [CommonModule, CdkDropList, CdkDrag, MatListModule, MatCardModule],
  templateUrl: './all-notes.component.html',
  styleUrl: './all-notes.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllNotesComponent implements OnInit{

    private noteStateService = inject(NoteStateService);
    allNotes: WritableSignal<Note[]> = signal<Note[]>([]);
  
    ngOnInit(): void {
        this.noteStateService.dateChange$.subscribe((notes: any) => {
            this.allNotes.set(notes);
        });
    }

    drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.allNotes(), event.previousIndex, event.currentIndex);
    }
}
