
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LabelComponent } from '../../label/label.component';
import { InputFieldComponent } from '../../input/input-field.component';
import { MultiSelectComponent } from '../../multi-select/multi-select.component';
import { FormsModule } from '@angular/forms';

interface User {
  nip: string;
}

interface MultiOption {
  value: string;
  text: string;
  selected: boolean;
}

@Component({
  selector: 'app-send-users-notification-form',
  imports: [
    LabelComponent,
    InputFieldComponent,
    FormsModule,
    MultiSelectComponent,
],
  templateUrl: './send-users-notification-form.component.html',
  styles: ``
})
export class SendUsersNotificationFormComponent {
  multiOptions: MultiOption[] = [];
  selectedValues: string[] = [];

  title = '';
  body = '';
  link = '';

  private _users: User[] = [];

  @Input() set users(value: User[]) {
    this._users = value || [];
    this.buildOptions();
  }

  @Output() usersChange = new EventEmitter<string[]>();
  @Output() titleChange = new EventEmitter<string>();
  @Output() bodyChange = new EventEmitter<string>();
  @Output() linkChange = new EventEmitter<string>();

  private buildOptions() {
    this.multiOptions = this._users.map(user => ({
      value: user.nip,
      text: user.nip,
      selected: false
    }));
  }

  handleUsersChange(values: string[]) {
    this.selectedValues = values;
    this.usersChange.emit(values);
  }

}
