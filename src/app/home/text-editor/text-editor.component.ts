import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-text-editor',
  imports: [CommonModule, EditorModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextEditorComponent implements AfterViewInit {

  @Output() contentChanged = new EventEmitter<string>();

  // Signal to store the content
  private _content: WritableSignal<string> = signal<string>('');

  // Getter and setter for content to work with ngModel
  get content(): string {
    return this._content();
  }

  set content(value: string) {
    this._content.set(value);
    this.contentChanged.emit(value); // Emit the updated content
  }

  editorConfig = {
    base_url: '/assets/tinymce',
    selector: 'textarea',
    suffix: '.min',
    height: 500,
    branding: false,
    menubar: true,
    plugins: 'lists link image table code preview wordcount',
    toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image table | code preview',
    content_style: 'body { font-family:Arial,sans-serif; font-size:14px }',
    // setup: (editor: any) => {
    //   editor.on('keyup change', () => {
    //     const content = editor.getContent();
    //     this.contentChanged.emit(content);
    //   });
    // }
    setup: (editor: any) => {
    editor.ui.registry.addButton('customBoldButton', {
      text: 'B+', // Custom text
      tooltip: 'Custom Bold',
      onAction: () => {
        editor.execCommand('Bold'); // Apply bold formatting
      }
    });
  }
  };
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      const promoElement = document.querySelector('.tox-promotion');
      if (promoElement) {
        promoElement.remove();
      }
    }, 500);    
  }
}
