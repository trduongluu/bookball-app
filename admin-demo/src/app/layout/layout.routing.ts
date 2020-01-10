import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'pitch', loadChildren: () => import('./pitch/pitch.module').then(x => x.PitchModule) },
      { path: 'field', loadChildren: () => import('./field/field.module').then(x => x.FieldModule) },
      { path: 'booking', loadChildren: () => import('./booking/booking.module').then(x => x.BookingModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(x => x.UsersModule) },



      // { path: 'project-type', loadChildren: () => import('./project-type/project-type.module').then(x => x.ProjectTypeModule) },
      // { path: 'project-group', loadChildren: () => import('./project-group/project-group.module').then(x => x.ProjectGroupModule) },
      // { path: 'project-work', loadChildren: () => import('./project-work/project-work.module').then(x => x.ProjectWorkModule) },
      // { path: 'project-general', loadChildren: () => import('./project-general/project-general.module').then(x => x.ProjectGeneralModule) },
      // {
      //   path: 'bidding-document',
      //   loadChildren: () => import('./bidding-document/bidding-document.module').then(x => x.BiddingDocumentModule)
      // },
      // {
      //   path: 'package-bids',
      //   loadChildren: () => import('./package-bids/package-bids.module').then(x => x.PackageBidsModule)
      // },
      // {
      //   path: 'contracts',
      //   loadChildren: () => import('./contracts/contracts.module').then(x => x.ContractsModule)
      // },
      // {
      //   path: 'other-document',
      //   loadChildren: () => import('./attachments/attachments.module').then(x => x.AttachmentsModule)
      // },
      // {
      //   path: 'hanover-progress',
      //   loadChildren: () => import('./handover-schedule/handover-schedule.module').then(x => x.HandoverScheduleModule)
      // },

      // { path: 'timesheet', loadChildren: () => import('./timesheet/timesheet.module').then(m => m.TimesheetModule) },
      // { path: 'bidding', loadChildren: () => import('./bidding/bidding.module').then(m => m.BiddingModule) },
      // { path: 'payment-type', loadChildren: () => import('./payment-type/payment-type.module').then(m => m.PaymentTypeModule) },
      // { path: 'work-type', loadChildren: () => import('./work-type/work-type.module').then(m => m.WorkTypeModule) },
      // { path: 'terms-of-payment', loadChildren: () => import('./terms-of-payment/terms-of-payment.module').then(m => m.TermsOfPaymentModule) },
      // { path: 'project-profile', loadChildren: () => import('./project-profile/project-profile.module').then(m => m.ProjectProfileModule) },
      // { path: 'project-profile-detail', loadChildren: () => import('./project-profile-detail/project-profile-detail.module').then(m => m.ProjectProfileDetailModule) },
      // { path: 'partner', loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule) },
      // { path: 'partner-group', loadChildren: () => import('./partner-group/partner-group.module').then(m => m.PartnerGroupModule) },
      // {
      //   path: 'bidding-model',
      //   loadChildren: () => import('./bidding-model/bidding-model.module').then(m => m.BiddingModelModule)
      // },
      // { path: 'contract-form', loadChildren: () => import('./contract-form/contract-form.module').then(m => m.ContractFormModule) },
      // { path: 'contractor', loadChildren: () => import('./contractor/contractor.module').then(m => m.ContractorModule) },
      // { path: 'biz-model', loadChildren: () => import('./biz-model/biz-model.module').then(m => m.BizModelModule) },
      // { path: 'expenses-item', loadChildren: () => import('./expenses-item/expenses-item.module').then(m => m.ExpensesItemModule) },
      // { path: 'expenses-item-group', loadChildren: () => import('./expenses-item-group/expenses-item-group.module').then(m => m.ExpensesItemGroupModule) },
      // {
      //   path: 'invests',
      //   loadChildren: () => import('./invests/invests.module').then(m => m.InvestsModule)
      // },
      // { path: 'issue-causes', loadChildren: () => import('./issue-causes/issue-causes.module').then(m => m.IssueCausesModule) },
      // { path: 'issue-type', loadChildren: () => import('./issue-type/issue-type.module').then(m => m.IssueTypeModule) },
      // { path: 'product-services', loadChildren: () => import('./product-services/product-services.module').then(m => m.ProductServicesModule) },


      // { path: 'management-form', loadChildren: () => import('./management-form/management-form.module').then(m => m.ManagementFormModule) },
      // { path: 'target', loadChildren: () => import('./target/target.module').then(m => m.TargetModule) },
      // { path: 'target-detail', loadChildren: () => import('./target-detail/target-detail.module').then(m => m.TargetDetailModule) },
      // { path: 'storage-cabinets', loadChildren: () => import('./storage-cabinets/storage-cabinets.module').then(m => m.StorageCabinetsModule) },
      // { path: 'field-of-activity', loadChildren: () => import('./field-of-activity/field-of-activity.module').then(m => m.FieldOfActivityModule) },
      // { path: 'costs', loadChildren: () => import('./costs/costs.module').then(x => x.CostsModule) },
      // { path: 'status', loadChildren: () => import('./status/status.module').then(x => x.StatusModule) },
      // { path: 'cr', loadChildren: () => import('./cr/cr.module').then(x => x.CrModule) },
      // { path: 'project-resource', loadChildren: () => import('./project-resource/project-resource.module').then(x => x.ProjectResourceModule) },
      // { path: 'issue', loadChildren: () => import('./issue/issue.module').then(x => x.IssueModule) },


    ]
  }
];

export const LayoutRoutes = RouterModule.forChild(routes);
