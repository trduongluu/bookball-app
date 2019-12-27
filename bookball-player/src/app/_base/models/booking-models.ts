export interface BookingModels {
}

export interface FieldModel {
    id: number;
    name: string;
    picked?: boolean;
}

export interface DayModel {
    id: number;
    day: string;
    dayFull: Date;
    picked?: boolean;
}

export interface TimeSlotModel {
    id: number;
    timeslot: string;
    status: TimeSlotStatusEnum;
    picked?: boolean;
}

export interface UserBooking {
    name: string;
    field: string;
    day: string;
    timeSlot: string;
    price: string;
    paid: string;
    checkin: Date;
    checkout: Date;
    status: BookingStatusEnum;
}

export enum TimeSlotStatusEnum {
    Available = 1,
    NotAvailable
}

export enum BookingStatusEnum {
    Waiting = 1,
    Booked,
    Canceled,
    Rejected
}
