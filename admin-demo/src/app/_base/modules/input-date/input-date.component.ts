import { Component, OnInit, AfterViewInit, OnChanges, Input, Output, EventEmitter, ElementRef, SimpleChanges, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var $;
@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    }
  ]
})
export class InputDateComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges {
  constructor(
    private el: ElementRef
  ) { }

  @Input() class: any = '';
  @Input() placeholder: any = '';
  @Input() disabled = false;
  @Input() hidden = false;
  @Input() readonly = false;
  @Input() format = 'dd/MM/yyyy';
  @Input() allowClear = true;
  @Input() min: number;
  @Input() max: number;
  @Input() disabledDate: any;
  // tslint:disable-next-line:no-output-rename
  @Output('onChange') eventOnChange = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-rename
  @Output('onBlur') eventOnBlur = new EventEmitter<void>();
  // tslint:disable-next-line:no-output-rename
  @Output('onUnBlur') eventOnUnBlur = new EventEmitter<void>();

  // tslint:disable-next-line:member-ordering
  public controlValue: Date | null = null;
  eventBaseChange = (_: any) => { };
  eventBaseTouched = () => { };

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
    this.eventBaseChange(this.getValueControl());
    this.eventOnChange.emit(this.getValueControl());
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getValueControl() {
    return (this.controlValue ? new Date(Date.UTC(this.controlValue.getUTCFullYear(), this.controlValue.getUTCMonth(), this.controlValue.getUTCDate())):null);
  }
}
