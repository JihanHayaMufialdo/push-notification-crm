
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LabelComponent } from '../../label/label.component';
import { InputFieldComponent } from '../../input/input-field.component';
import { ButtonComponent } from '../../../ui/button/button.component';
import { FormsModule } from '@angular/forms';
import { TextAreaInputComponent } from "../text-area-input/text-area-input.component";

@Component({
  selector: 'app-create-topic-form',
  imports: [
    LabelComponent,
    TextAreaInputComponent,
    InputFieldComponent,
    ButtonComponent,
    FormsModule,

],
  templateUrl: './create-topic-form.component.html',
  styles: ``
})
export class CreateTopicFormComponent {

  @Input() name: string = '';
  @Input() description: string = '';

  @Output() nameChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() submitForm = new EventEmitter<void>();

  onNameChange(value: string | number) {
    this.nameChange.emit(String(value));
  }

  onDescriptionChange(value: string | number) {
    this.descriptionChange.emit(String(value));
  }

  onSubmit() {
    this.submitForm.emit();
  }
}
