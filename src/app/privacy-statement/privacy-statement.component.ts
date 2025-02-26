import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-privacy-statement',
  imports: [CommonModule],
  templateUrl: './privacy-statement.component.html',
  styleUrl: './privacy-statement.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class PrivacyStatementComponent implements OnInit {

   appName: WritableSignal<string> = signal<string>('');
  
    ngOnInit(): void {
      this.appName.set(environment.appName);
    }
}
