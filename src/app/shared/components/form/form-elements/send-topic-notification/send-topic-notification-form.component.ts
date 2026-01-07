
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LabelComponent } from '../../label/label.component';
import { InputFieldComponent } from '../../input/input-field.component';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '../../select/select.component';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-send-topic-notification-form',
  imports: [
    ComponentCardComponent,
    LabelComponent,
    InputFieldComponent,
    SelectComponent,
    FormsModule,
],
  templateUrl: './send-topic-notification-form.component.html',
  styles: ``
})
export class SendTopicNotificationFormComponent {
  options: SelectOption[] = [];
  selectedValue = '';

  title = '';
  body = '';
  link = '';

  @Input() set topics(value: { id: number; name: string }[]) {
    this.options = (value || []).map(topic => ({
      value: String(topic.id),   
      label: topic.name
    }));
  }

  @Output() topicChange = new EventEmitter<number>();
  @Output() titleChange = new EventEmitter<string>();
  @Output() bodyChange = new EventEmitter<string>();
  @Output() linkChange = new EventEmitter<string>();

  handleSelectChange(value: string) {
    this.selectedValue = value;
    this.topicChange.emit(Number(value));
  }
  
}
