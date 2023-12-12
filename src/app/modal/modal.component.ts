import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  private _modalState: boolean = false;

  @Input() set open(state: boolean) {
    this._modalState = state;
    this.openChange.emit(state);
  }
  get open() {
    return this._modalState;
  }
  @Output() openChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // open() {
  //   this.modalState = true;
  // }

  // close() {
  //   this.modalState = false;
  // }

}
