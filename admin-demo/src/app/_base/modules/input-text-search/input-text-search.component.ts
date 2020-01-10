import { Component, OnInit, Input, SimpleChanges, AfterViewInit, OnChanges, Output, EventEmitter, ElementRef, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextComponent } from '../input-text/input-text.component';

declare let $;
@Component({
  selector: 'input-text-search',
  templateUrl: './input-text-search.component.html',
  styleUrls: ['./input-text-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextSearchComponent),
      multi: true,
    }]
})
export class InputTextSearchComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges {

  public controlValue: string | null = null;

  @Input() class: any = '';
  @Input() placeholder: any = '';
  @Input() disabled = false;
  @Input() hidden = false;
  @Input() readonly = false;
  // tslint:disable-next-line: no-output-rename
  @Output('onChange') eventOnChange = new EventEmitter<any>();
  // tslint:disable-next-line: no-output-rename
  @Output('onBlur') eventOnBlur = new EventEmitter<void>();
  // tslint:disable-next-line: no-output-rename
  @Output('onUnBlur') eventOnUnBlur = new EventEmitter<void>();
  // tslint:disable-next-line: no-output-rename
  @Output('onClear') eventOnClear = new EventEmitter<void>();
  eventBaseChange = (_: any) => { };
  eventBaseTouched = () => { };

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit() {
    $(this.el.nativeElement).removeClass(this.class);
  }

  writeValue(obj: any) {
    this.controlValue = obj;
  }

  registerOnChange(fn: any) {
    this.eventBaseChange = fn;
  }

  registerOnTouched(fn: any) {
    this.eventBaseTouched = fn;
  }

  onBlur() {
    this.eventBaseTouched();
    this.eventOnBlur.emit();
  }

  onUnBlur() {
    this.eventOnUnBlur.emit();
  }

  onChange() {
    this.eventBaseChange(this.controlValue);
    this.eventOnChange.emit(this.controlValue);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClear() {
    this.controlValue = null;
    this.eventBaseChange(this.controlValue);
    this.eventOnChange.emit(this.controlValue);
    this.eventOnClear.emit();
  }
}
