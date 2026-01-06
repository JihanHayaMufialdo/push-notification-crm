
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LabelComponent } from '../../label/label.component';
import { InputFieldComponent } from '../../input/input-field.component';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';
import { FormsModule } from '@angular/forms';
import { TextAreaInputComponent } from "../text-area-input/text-area-input.component";

@Component({
  selector: 'app-edit-topic-form',
  imports: [
    LabelComponent,
    TextAreaInputComponent,
    InputFieldComponent,
    ButtonComponent,
    FormsModule,
    TextAreaInputComponent
],
  templateUrl: './edit-topic-form.component.html',
  styles: ``
})
export class EditTopicFormComponent {

  @Input() name = '';
  @Input() description = '';

  @Output() submitForm = new EventEmitter<{
    name: string;
    description: string;
  }>();

  onSubmit() {
    this.submitForm.emit({
      name: this.name,
      description: this.description
    });
  }
}
