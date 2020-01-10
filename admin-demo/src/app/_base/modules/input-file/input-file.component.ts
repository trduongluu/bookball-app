import { Component, OnInit, ViewEncapsulation, forwardRef, AfterViewInit, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { ExtensionService } from '../../services/extension.service';
import { DataGlobal } from '../../common/data-global';
import { UploadFileService } from 'src/app/_shared/services/upload-file.service';
import { SortablejsOptions } from 'ngx-sortablejs';
import { NgTemplateOutlet } from '@angular/common';
import { Utilities } from 'src/app/_shared/extensions/utilities';

declare var $;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true,
    }
  ]
})
export class InputFileComponent implements OnInit, AfterViewInit, ControlValueAccessor, Validator {
  constructor(
    private el: ElementRef,
    private ex: ExtensionService,
    private sv: UploadFileService
  ) { }

  public options: SortablejsOptions = {
    animation: 150,
    filter: '.add-item',
    onMove(e) {
      return e.related.className.indexOf('add-item') === -1;
    }
  };
  public controlValue: any[] = [];
  public multiFile = false;
  public controlId = Utilities.guid();
  @Input() class: any = '';
  @Input() itemClass: any = '';
  @Input() placeholder: any = '';
  @Input() disabled = false;
  @Input() hidden = false;
  @Input() size = 1;
  @Input() folder = '';
  @Input() type = '';
  @Input() imgDefault = '';
  @Input() templateType = 1;
  @Input() templateRef: NgTemplateOutlet;
  // tslint:disable-next-line:no-output-rename
  @Output('onChange') eventChange = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-rename
  @Output('eventBlockUI') eventBlock = new EventEmitter<boolean>();
  // tslint:disable-next-line: no-output-rename
  @Output('eventRemove') eventRemove = new EventEmitter<boolean>();
  private error: any = null;
  onChangeValid: () => void;
  propagateChange = (_: any) => { };
  onTouched = () => { };

  ngOnInit() {
    if (this.templateRef) {
      this.templateType = null;
    }
  }

  ngAfterViewInit() {
    $(this.el.nativeElement).removeClass(this.class);
  }

  InitFile() {
    const outside = this;
    let i = 0;
    this.controlValue.forEach(x => {
      try {
        if (x.url !== '') {
          $(outside.el.nativeElement.querySelector('#image-preview-' + this.controlId + i)).removeAttr('style');
          // tslint:disable-next-line:max-line-length
          $(outside.el.nativeElement.querySelector('#image-preview-' + this.controlId + i)).css({ 'background-image': 'url(' + DataGlobal.getImgFile(x.url) + ')' });
          $(outside.el.nativeElement.querySelector('#image-label-' + this.controlId + i)).css({ opacity: '0' });
        }
        i++;
      } catch (error) {
        i++;
      }
    });
  }

  readURL(event) {
    const outside = this;
    const input = event.currentTarget;
    const index = event.currentTarget.getAttribute('index');
    const fileData = this.controlValue[index];
    if (input.files && input.files[0]) {
      let checkType = false;
      const lstType = this.type.split(',');
      if (lstType.length > 0) {
        lstType.forEach(x => {
          if (input.files[0].name.toLowerCase().indexOf(x) !== -1) {
            checkType = true;
          }
        });
      } else {
        checkType = true;
      }

      if (checkType) {
        // upload file
        outside.uploadFile(index);
      } else {
        // show error
        this.error = { fomat: 'File không đúng định dạng: ' + this.type };
        this.change();
      }
    } else {
      $(outside.el.nativeElement.querySelector('#image-preview-' + this.controlId + index)).removeAttr('style');
      $(outside.el.nativeElement.querySelector('#image-label-' + this.controlId + index)).css({ opacity: '0.8' });
      fileData.url = '';
      fileData.id = 0;
    }
    this.onTouched();
  }

  async remove(index: number) {
    this.controlValue.splice(index, 1);
    if (this.controlValue.length === 0) {
      this.eventRemove.emit(true);
    }
    else { this.eventRemove.emit(false); }

  }

  async uploadFile(index: number) {
    const fileDev = $(this.el.nativeElement.querySelector('#image-upload-' + this.controlId + index));
    if ($(fileDev)[0].files.length > 0) {
      const formUpload = new FormData();
      formUpload.append('Folder', this.folder);
      const file = $(fileDev)[0].files[0];
      formUpload.append('File', file, file.name);
      // start call api
      this.eventBlock.emit(true);
      const rs = await this.sv.add(formUpload);
      this.ex.logDebug('upload', rs);
      // clear data input
      $(fileDev).val(null);
      if (rs.ok) {
        const fileResult = {
          id: rs.result[0].id,
          code: rs.result[0].code,
          name: rs.result[0].name,
          extension: rs.result[0].extension,
          url: rs.result[0].url,
          size: rs.result[0].size,
          createdBy: rs.result[0].createdBy,
          createdDate: rs.result[0].createdDate
        };
        if ((+index) < this.controlValue.length) {
          this.controlValue[(+index)] = fileResult;
        } else {
          this.controlValue.push(fileResult);
        }
        this.error = null;
        this.change();
      } else {
        // rs.error.forEach(x => {
        //   let result = JSON.parse('{"' + x.key + '":"' + x.value + '"}');
        //   this.error = result;
        //   this.change();
        // });
      }
      // end upload
      this.eventBlock.emit(false);
    }
  }

  change() {
    if (this.multiFile) {
      this.propagateChange(this.controlValue); // update value to form
      this.eventChange.emit(this.controlValue);
    } else {
      if (this.controlValue.length > 0) {
        this.propagateChange(this.controlValue[0]); // update value to form
        this.eventChange.emit(this.controlValue[0]);
      } else {
        this.propagateChange(null); // update value to form
        this.eventChange.emit(null);
      }
    }

    setTimeout(() => {
      this.InitFile();
    }, 0);
  }

  writeValue(obj: any) {
    if (Array.isArray(obj)) {
      this.multiFile = true;
      this.controlValue = obj;
    } else {
      if (obj) {
        this.controlValue = [obj];
      } else {
        this.controlValue = [];
      }
    }

    setTimeout(() => {
      this.InitFile();
    }, 0);
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  validate(c: FormControl): { [key: string]: any; } {
    return this.error;
  }

  registerOnValidatorChange?(fn: () => void) {
    this.onChangeValid = fn;
  }

}
