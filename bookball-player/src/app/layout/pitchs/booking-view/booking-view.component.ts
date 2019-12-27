import { Component, OnInit } from '@angular/core';
import { BaseBookingComponents } from '@trduong/_base/components/base-booking-components';
import { TimeSlotStatusEnum, BookingStatusEnum } from '@trduong/_base/models/booking-models';
import { FieldService } from '@trduong/shared/services/field.service';
import { BookingService } from '@trduong/shared/services/booking.service';
import { BaseUserService } from '@trduong/_base/services/base-user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Utilities } from '@trduong/shared/extensions/utilities';
import { DateFormatPipe } from '@trduong/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.scss']
})
export class BookingViewComponent extends BaseBookingComponents implements OnInit {

  selectedType = 1;

  constructor(
    baseUserService: BaseUserService,
    private fieldService: FieldService,
    private bookingService: BookingService,
    private message: NzMessageService,
    private dateFormat: DateFormatPipe
  ) {
    super(baseUserService);
  }

  async ngOnInit() {
    const tasks = [this.getFields(), this.getUserInfo()];
    await Promise.all(tasks);
    this.createSevenDays();
    this.listTimes = [
      { id: 1, timeslot: '06:00 - 07:30', status: TimeSlotStatusEnum.Available, picked: false },
      { id: 2, timeslot: '07:30 - 09:00', status: TimeSlotStatusEnum.NotAvailable, picked: false },
      { id: 3, timeslot: '09:00 - 10:30', status: TimeSlotStatusEnum.Available, picked: false },
      { id: 4, timeslot: '13:00 - 14:30', status: TimeSlotStatusEnum.NotAvailable, picked: false },
      { id: 5, timeslot: '14:30 - 16:00', status: TimeSlotStatusEnum.Available, picked: false },
      { id: 6, timeslot: '16:00 - 17:30', status: TimeSlotStatusEnum.Available, picked: false },
      { id: 7, timeslot: '17:30 - 19:00', status: TimeSlotStatusEnum.Available, picked: false },
      { id: 8, timeslot: '19:00 - 20:30', status: TimeSlotStatusEnum.NotAvailable, picked: false },
      { id: 9, timeslot: '06:00 - 07:30', status: TimeSlotStatusEnum.Available, picked: false },
      { id: 10, timeslot: '20:30 - 22:00', status: TimeSlotStatusEnum.Available, picked: false },
    ];
  }

  async getFields() {
    const res = await this.fieldService.getFieldsOfPitch(this.paging, this.pitchId);
    console.log('field of pitch', res);

    if (res.success && res.result.data[0]) {
      this.listFields = res.result.data;
      this.listFields.forEach(x => {
        x.picked = false;
      });
      this.listFields[0].picked = true;
      this.pickedField = this.listFields[0];
    }
  }

  createSevenDays() {
    const daynow = Utilities.addDays(new Date(), 0);
    const day2 = Utilities.addDays(new Date(), 1);
    const day3 = Utilities.addDays(new Date(), 2);
    const day4 = Utilities.addDays(new Date(), 3);
    const day5 = Utilities.addDays(new Date(), 4);
    const day6 = Utilities.addDays(new Date(), 5);
    const day7 = Utilities.addDays(new Date(), 6);
    const days = [daynow, day2, day3, day4, day5, day6, day7];
    for (const item of days) {
      if (item.getDay()) {
        this.listDays.push({
          id: item.getDay(), day: `Thứ ${item.getDay() + 1} ${this.dateFormat.transform(item, '(dd/MM)')}`, dayFull: item, picked: false
        });
      } else {
        this.listDays.push({
          id: item.getDay(), day: `Chủ nhật ${this.dateFormat.transform(item, '(dd/MM)')}`, dayFull: item, picked: false
        });
      }
    }
    this.listDays[0].picked = true;
    this.pickedDay = this.listDays[0];
  }

  pickField(item: any) {
    if (this.pickedField) {
      this.listFields.forEach(x => {
        if (x.id === this.pickedField.id) {
          x.picked = false;
        }
      });
    }
    this.pickedField = item;
    item.picked = !item.picked;
  }

  pickTime(item: any) {
    if (this.pickedTime) {
      this.listTimes.forEach(x => {
        if (x.id === this.pickedTime.id) {
          x.picked = false;
        }
      });
    }
    this.pickedTime = item;
    item.picked = !item.picked;
  }

  pickDay(item: any) {
    if (this.pickedDay) {
      this.listDays.forEach(x => {
        if (x.id === this.pickedDay.id) {
          x.picked = false;
        }
      });
    }
    this.pickedDay = item;
    item.picked = !item.picked;
  }

  async sendBooking() {
    if (this.pickedTime) {
      const body = {
        // userId: this.userDetails.id,
        fieldId: this.pickedField.id,
        timeSlot: this.pickedTime.timeslot,
        day: this.pickedDay.dayFull,
        price: 400000,
        paid: 0
        // status: BookingStatusEnum.Waiting
      };
      this.isLoading = true;
      const res = await this.bookingService.userBooking(body);
      this.isLoading = false;

      if (res.success) {
        console.log('booking response', res.result);
        this.message.success('Đã gửi booking. Vui lòng đợi nhà sân nhận đơn nhé bạn!');
        this.handleOk(res.result);
      } else {
        this.message.error('Có lỗi xảy ra khi gửi yêu cầu.');
      }
    } else {
      this.message.error('Hãy chọn 1 khung giờ!');
    }
  }
}
