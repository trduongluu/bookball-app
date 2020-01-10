// tslint:disable-next-line:max-line-length
import { Component, OnInit, ViewEncapsulation, forwardRef, AfterViewInit, OnChanges, ElementRef, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { InputSelectComponent } from '../input-select/input-select.component';

declare let $;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-select-multiple',
  templateUrl: './input-select-multiple.component.html',
  styleUrls: ['./input-select-multiple.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectMultipleComponent),
      multi: true
    }
  ]
})
export class InputSelectMultipleComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges {
  constructor(
    private el: ElementRef
  ) { }

  @Input() class: any = '';
  @Input() placeholder: any = '';
  @Input() disabled = false;
  @Input() hidden = false;
  @Input() readonly = false;
  @Input() allowClear = true;
  @Input() allowSearch = true;
  @Input() items: any[] = [];
  @Input() max: number;
  // tslint:disable-next-line:no-output-rename
  @Output('onChange') eventOnChange = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-rename
  @Output('onBlur') eventOnBlur = new EventEmitter<void>();
  // tslint:disable-next-line:no-output-rename
  @Output('onUnBlur') eventOnUnBlur = new EventEmitter<void>();

  // tslint:disable-next-line:member-ordering
  public controlValue: Date | null = null;
  private isFocus: boolean;
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
    this.isFocus = true;
    this.eventBaseTouched();
    this.eventOnBlur.emit();
  }

  onUnBlur() {
    this.isFocus = false;
    this.eventOnUnBlur.emit();
  }

  onChange() {
    // tslint:disable-next-line: curly
    if (!this.isFocus) return;
    this.eventBaseChange(this.controlValue);
    this.eventOnChange.emit(this.controlValue);
  }

  onClear() {
    this.controlValue = null;
    this.eventBaseChange(this.controlValue);
    this.eventOnChange.emit(this.controlValue);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}


