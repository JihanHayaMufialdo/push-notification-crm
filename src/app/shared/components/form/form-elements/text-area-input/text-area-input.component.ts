import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-area-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <textarea
        [id]="id"
        [name]="name"
        [rows]="rows"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        [ngClass]="textareaClasses"
        (input)="onInput($event)"
        (blur)="onTouched()"
      ></textarea>

      @if (hint) {
        <p class="mt-1.5 text-xs"
          [ngClass]="{
            'text-error-500': error,
            'text-success-500': success,
            'text-gray-500': !error && !success
          }">
          {{ hint }}
        </p>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaInputComponent),
      multi: true
    }
  ]
})
export class TextAreaInputComponent implements ControlValueAccessor {

  @Input() id?: string = '';
  @Input() name?: string = '';
  @Input() placeholder?: string = '';
  @Input() rows: number = 4;
  @Input() value: string = '';
  @Input() disabled = false;
  @Input() success = false;
  @Input() error = false;
  @Input() hint?: string;
  @Input() className = '';

  @Output() valueChange = new EventEmitter<string>();

  onChange: any = () => {};
  onTouched: any = () => {};

  get textareaClasses(): string {
    let classes =
      `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs 
       placeholder:text-gray-400 focus:outline-hidden focus:ring-3 
       dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
       ${this.className}`;

    if (this.disabled) {
      classes += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed
                   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (this.error) {
      classes += ` border-error-500 focus:border-error-300 focus:ring-error-500/20
                   dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
    } else if (this.success) {
      classes += ` border-success-500 focus:border-success-300 focus:ring-success-500/20
                   dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
    } else {
      classes += ` bg-transparent text-gray-800 border-gray-300
                   focus:border-brand-300 focus:ring-brand-500/20
                   dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800`;
    }

    return classes;
  }

  onInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;

    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  writeValue(value: any): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
