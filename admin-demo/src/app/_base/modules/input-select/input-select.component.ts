import { Component, OnInit, ViewEncapsulation, forwardRef, AfterViewInit, OnChanges, Input, Output, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare var $;
@Component({
  selector: "input-select",
  templateUrl: "./input-select.component.html",
  styleUrls: ["./input-select.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges {

  @Input() class: any = '';
  @Input() placeholder: any = '';
  @Input() disabled: boolean = false;
  @Input() hidden: boolean = false;
  @Input() readonly: boolean = false;
  @Input() allowClear: boolean = true;
  @Input() allowSearch: boolean = true;
  @Input() items: any[] = [];
  @Output('onChange') eventOnChange = new EventEmitter<any>();
  @Output('onBlur') eventOnBlur = new EventEmitter<void>();
  @Output('onUnBlur') eventOnUnBlur = new EventEmitter<void>();
  eventBaseChange = (_: any) => { };
  eventBaseTouched = () => { };

  public controlValue: Date | null = null;
  private isFocus: boolean;
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

