import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal, WritableSignal } from '@angular/core';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { NoteStateService } from '../../../services/notes-state.service';
import { NotesService } from '../../../services/notes.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-write-notes',
  imports: [CommonModule,TextEditorComponent],
  templateUrl: './write-notes.component.html',
  styleUrl: './write-notes.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriteNotesComponent {
  content: WritableSignal<string> = signal<string>('');
  private contentChange$ = new Subject<string>();
  private noteStateService = inject(NoteStateService);
  private noteService = inject(NotesService);
  private readonly destroyRef = inject(DestroyRef);

  selectedDate: WritableSignal<Date> = this.noteStateService.selectedDate;

  constructor() {
    this.contentChange$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(content => this.createNote(content));
    let isFirstRun = true; // ✅ Prevents initial empty trigger
    effect(() => {
      const newContent = this.content();
      if (isFirstRun) {
        isFirstRun = false; // Skip first run
        return;
      }
      if (newContent.trim()) { // ✅ Ensure we only emit when there's actual content
        this.contentChange$.next(newContent);
      }
    });
  }

  onEditorContentChange(content: string) {
    console.log("Editor content:", content);
    this.content.set(content); 
  }
  createNote(content: string) {
    const payload = {
      title: content.slice(0, 30).trim(),
      content,
      date: this.selectedDate().toISOString(),
      category_name: ''
    };
    this.noteService.createNote(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
      console.log(res);
    })
  }
  
}
