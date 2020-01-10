import { Component, OnInit, ViewEncapsulation, forwardRef, AfterViewInit, OnChanges, Input, Output, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare let $;
@Component({
  selector: 'input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateTimeComponent),
      multi: true,
    }
  ]
})
export class InputDateTimeComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges {
  constructor(
    private el: ElementRef
  ) { }

  @Input() class: any = '';
  @Input() placeholder: any = '';
  @Input() disabled = false;
  @Input() hidden = false;
  @Input() readonly = false;
  @Input() format = 'dd/MM/yyyy HH:mm:ss';
  @Input() allowClear = true;
  @Input() min: number;
  @Input() max: number;
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
    $(this.el.nativeElement).find('.ant-calendar-picker').css({ width: '100%' });
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
    return new Date(Date.UTC(this.controlValue.getUTCFullYear(), this.controlValue.getUTCMonth(), this.controlValue.getUTCDate(),
    this.controlValue.getUTCHours(), this.controlValue.getUTCMinutes(), this.controlValue.getUTCSeconds(), this.controlValue.getUTCMilliseconds()));
  }
}

