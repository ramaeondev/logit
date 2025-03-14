import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { LogoComponent } from '../../logo/logo.component';
import { environment } from '../../../environments/environment';
import { User, ChevronLeft, LucideAngularModule } from 'lucide-angular'; // Import the User icon
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LogoComponent, LucideAngularModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  appName: WritableSignal<string> = signal<string>('');
  User = User;
  ChevronLeft = ChevronLeft
  constructor(private readonly authService: AuthService) { 
        this.appName.set(environment.appName);
  }

  logout() {
    this.authService.logout();
  }
}
