import { Component, OnInit, ViewEncapsulation, forwardRef, OnChanges, Input, Output, EventEmitter, ElementRef, AfterViewInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare var $;
@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    }]
})
export class InputTextComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges {

  public controlValue: string | null = null;

  @Input() class: any = '';
  @Input() placeholder: any = '';
  @Input() disabled = false;
  @Input() maxlength: number;
  @Input() hidden = false;
  @Input() readonly = false;
  @Output('onChange') eventOnChange = new EventEmitter<any>();
  @Output('onBlur') eventOnBlur = new EventEmitter<void>();
  @Output('onUnBlur') eventOnUnBlur = new EventEmitter<void>();
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
}
