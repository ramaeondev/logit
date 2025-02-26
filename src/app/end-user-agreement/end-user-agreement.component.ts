import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-end-user-agreement',
  imports: [CommonModule],
  templateUrl: './end-user-agreement.component.html',
  styleUrl: './end-user-agreement.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EndUserAgreementComponent implements OnInit {

  appName: WritableSignal<string> = signal<string>('');

  ngOnInit(): void {
    this.appName.set(environment.appName);
  }

}