import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-all-notes',
  imports: [CommonModule],
  templateUrl: './all-notes.component.html',
  styleUrl: './all-notes.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllNotesComponent {

}
