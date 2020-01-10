import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagingModule } from '../paging/paging.module';
import { RenderErrorModule } from '../render-error/render-error.module';
import { InputTextModule } from '../input-text/input-text.module';
import { InputTextSearchModule } from '../input-text-search/input-text-search.module';
import { InputNumberModule } from '../input-number/input-number.module';
import { InputDateModule } from '../input-date/input-date.module';
import { InputMonthModule } from '../input-month/input-month.module';
import { InputYearModule } from '../input-year/input-year.module';
import { InputDateTimeModule } from '../input-date-time/input-date-time.module';
import { InputTimeModule } from '../input-time/input-time.module';
import { InputFloatModule } from '../input-float/input-float.module';
import { InputSelectModule } from '../input-select/input-select.module';
import { InputTextareaModule } from '../input-textarea/input-textarea.module';
import { PipeModule } from 'src/app/_shared/pipe/pipe.module';
import { InputSwitchModule } from '../input-switch/input-switch.module';
import { InputCheckBoxModule } from '../input-check-box/input-check-box.module';
import { InputFileModule } from '../input-file/input-file.module';
import { InputRadioModule } from '../input-radio/input-radio.module';
import { InputSelectMultipleModule } from '../input-select-multiple/input-select-multiple.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RenderErrorModule,
    TranslateModule,
    ReactiveFormsModule,
    PagingModule,
    InputTextModule,
    InputTextSearchModule,
    InputNumberModule,
    InputDateModule,
    InputDateTimeModule,
    InputMonthModule,
    InputYearModule,
    InputTimeModule,
    InputFloatModule,
    InputSelectModule,
    InputTextareaModule,
    InputSwitchModule,
    InputCheckBoxModule,
    InputFileModule,
    InputRadioModule,
    InputSelectMultipleModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    RenderErrorModule,
    TranslateModule,
    ReactiveFormsModule,
    PagingModule,
    InputTextModule,
    InputTextSearchModule,
    InputNumberModule,
    InputDateModule,
    InputDateTimeModule,
    InputMonthModule,
    InputYearModule,
    InputTimeModule,
    InputFloatModule,
    InputSelectModule,
    InputTextareaModule,
    PipeModule,
    InputSwitchModule,
    InputCheckBoxModule,
    InputRadioModule,
    InputFileModule,
    InputSelectMultipleModule
  ]
})
export class FormModule {
}
