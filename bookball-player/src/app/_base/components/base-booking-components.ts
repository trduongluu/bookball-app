import { FieldModel, TimeSlotModel, DayModel } from '../models/booking-models';
import { Input, Output, EventEmitter } from '@angular/core';
import { PagingModel } from '../models/response-model';
import { BaseUserService } from '../services/base-user.service';

export abstract class BaseBookingComponents {

  @Input() pitchId: number | string;
  @Output() bookOnClose = new EventEmitter<any>();

  public paging: PagingModel = {
    page: 1,
    size: 100
  };

  fieldColor = 'green';
  fieldColorPicked = '#007944';
  dayColor = 'geekblue';
  dayColorPicked = '#293a80';
  timeColor = 'purple';
  timeColorPicked = '#aa26da';
  notAvailableColor = '#9d0b0b';

  public userDetails: any;
  public listFields: FieldModel[];
  public listFieldType: any[] = [
    { id: 1, name: 'Sân 7' },
    { id: 2, name: 'Sân 11' },
    { id: 3, name: 'Sân 5' },
    { id: 4, name: 'Sân Futsal' },
  ];
  public listDays: DayModel[] = [];
  public listTimes: TimeSlotModel[];
  public pickedField: FieldModel;
  public pickedDay: DayModel;
  public pickedTime: TimeSlotModel;
  public isLoading: boolean;

  constructor(
    protected baseUserService: BaseUserService
  ) { }

  getUserInfo() {
    this.baseUserService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        console.log('profile', res);
      },
      err => {
        console.log(err);
      },
    );
  }

  handleCancel() {
    this.bookOnClose.emit(false);
  }

  handleOk(data: any = true) {
    this.bookOnClose.emit(data);
  }
}
