import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgSelectComponent} from '@ng-select/ng-select';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  @Input() keys: string[];
  @Input() arrayAllPagesByCountry: [];
  @Output() countriesSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedKeys: EventEmitter<any> = new EventEmitter<any>();
  @Output() ngSelection: EventEmitter<NgSelectComponent> = new EventEmitter<NgSelectComponent>();
  @Output() deletionSignalFromSelection: EventEmitter<string> = new EventEmitter<string>();
  countriesSelectedBeforeEmit = {};
  selectedKeysBeforeEmit = [];
  formGroup: FormGroup;

  constructor() { }

  getSelectionElement(element: NgSelectComponent) {
    this.ngSelection.emit(element);
  }
  getArrayDiff(ar, ar1) {
    let i = 0;
    while (i < ar.length) {
      if (ar1[i] && ar[i] !== ar1[i]) {
        return ar[i];
      } else if (!ar1[i]) {
        return ar[i];
      }
      i++;
    }
    return null;
  }
  ngOnInit() {
    this.formGroup = new FormGroup({
      selection: new FormControl('', Validators.required),
    });
    let items = this.formGroup.value.selection;
    this.formGroup.valueChanges.subscribe(values => {
      const arrayDiff = this.getArrayDiff(items, values.selection);
      if (arrayDiff !== null) {
        this.deletionSignalFromSelection.emit(arrayDiff);
      }
      if (values.selection.length < items.length) {
        console.log(items[values.selection.length]);
      }
      items = values.selection;
      console.log(items);

      values.selection.forEach(s => {
        this.countriesSelectedBeforeEmit[s] = this.arrayAllPagesByCountry[s];
        this.selectedKeysBeforeEmit = Object.keys(this.countriesSelectedBeforeEmit);
      });
      this.countriesSelected.emit(this.countriesSelectedBeforeEmit);
      this.selectedKeys.emit(this.selectedKeysBeforeEmit);
    });
  }

}
