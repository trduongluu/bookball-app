export interface AuditableModel {
  createdBy: string;
  created: Date;
  lastModifiedBy: string;
  lastModified?: Date;
}

export interface AuditableEntity {
  auditData: AuditableModel;
}
