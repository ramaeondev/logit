import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { WriteNotesComponent } from './write-notes/write-notes.component';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { CalenderComponent } from './calender/calender.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, WriteNotesComponent,AllNotesComponent,CalenderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
