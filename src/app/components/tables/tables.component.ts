import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  @Input() selectedKeys: string[];
  @Input() countriesSelected: [];
  @Output() deleteSelection: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  sendDeleteSelectionSignal(event) {
    this.deleteSelection.emit(event);
  }
  ngOnInit() {
  }

}
