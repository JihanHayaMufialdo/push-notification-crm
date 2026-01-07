
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent } from '../../multi-select/multi-select.component';

interface MultiOption {
  value: string;
  text: string;
  selected: boolean;
}

interface User {
  nip: string;
  name: string;
}

@Component({
  selector: 'app-subscribe-topic-form',
  imports: [
    FormsModule,
    MultiSelectComponent
],
  templateUrl: './subscribe-topic-form.component.html',
  styles: ``
})

export class SubscribeTopicFormComponent {

  multiOptions: MultiOption[] = [];
  selectedValues: string[] = [];

  private _users: User[] = [];
  private _selectedNips: string[] = [];

  @Input() topicId!: number;
  @Input() set users(value: User[]) {
    this._users = value || [];
    this.buildOptions();
  }

  get users() {
    return this._users;
  }

  @Input() set selectedNips(value: string[]) {
    this._selectedNips = value || [];
    this.selectedValues = [...this._selectedNips];
    this.buildOptions();
  }

  get selectedNips() {
    return this._selectedNips;
  }

  @Output() usersChange = new EventEmitter<string[]>();

  private buildOptions(): void {
    if (!this._users.length) return;

    this.multiOptions = this._users.map(user => ({
      value: user.nip,
      text: user.name ?? user.name ?? user.nip,
      selected: this._selectedNips.includes(user.nip)
    }));
  }

  handleMultiSelectChange(values: string[]) {
    this.selectedValues = values;
    this.usersChange.emit(this.selectedValues);
  }  
}
