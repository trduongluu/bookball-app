export enum DataType {
    Number = 1,
    String,
    Date,
    Float,
    DropdownSingle,
    Boolean,
    Textarea,
    Editor,
    Image,
    Tag,
    DropdownMulti,
    Email,
    Phone,
    TableSingle,
    Object,
    Jaray,
    TableMulti,
    DateTime,
    Json
}

export enum GoosVoucherType {
    Receipt = 1,
    Transfer,
    Issue,
    Payment
}

export enum GoodsVoucherType2{
    Original = 1,
    Correction
}

export enum GoosVoucherStatus {
    New = 1,
    Done,
    Edit,
    Packaging,
    Delivering,
    Cancel,
    OnHold,
    Transfering,
    TransferCompleted,
    Invoke
}

export enum UnitType{
    Unit,
    Additional
}