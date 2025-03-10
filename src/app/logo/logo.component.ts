import { CommonModule } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  standalone: true
})
export class LogoComponent {


  appName: WritableSignal<string> = signal<string>('');
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  constructor(){
    this.appName.set(environment.appName);
  }

}
