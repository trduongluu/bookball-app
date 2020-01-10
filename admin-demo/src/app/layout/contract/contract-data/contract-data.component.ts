import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { TemplateService } from 'src/app/_shared/services/template.service';

@Component({
  selector: 'app-contract-data',
  templateUrl: './contract-data.component.html',
  styleUrls: ['./contract-data.component.scss']
})
export class ContractDataComponent extends BaseDataComponent implements OnInit {

  public listOfData: any[] = [{ id: 1 }];
  public openTab: number = 1;
  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: TemplateService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.createForm({
      profileNo: [''],
      empCardNo: [''],
      empCode: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      otherName: [''],
      jobTitle: [''],
      genderId: [0],
      dateOfBirth: ['2019-11-19T04:52:51.736Z'],
      maritalId: [0],
      ethnicId: [0],
      religionId: [0],
      countryId: [0],
      originateId: [0],
      picture: [''],
      dataIdCard: {
        taxCode: [''],
        idCardNo: [''],
        issueDate: ['2019-11-19T04:52:51.736Z'],
        place: [0]
      },
      dataPassport: {
        passportNo: [''],
        passportIssueDate: ['2019-11-19T04:52:51.736Z'],
        passportPlace: [0],
        passportExpiredDate: ['2019-11-19T04:52:51.736Z']
      },
      dataHomeTown: {
        htAddress: [''],
        htCountry: [0],
        htProvince: [0],
        htDistrict: [0],
        htCommune: [0]
      },
      dataResidentAdd: {
        resAddress: [''],
        resCountry: [0],
        resProvince: [0],
        resDistrict: [0],
        resCommune: [0]
      },
      dataCurentAdd: {
        curAddress: [''],
        curCountry: [0],
        curProvince: [0],
        curDistrict: [0],
        curCommune: [0]
      },
      dataContact: {
        phone: [''],
        mobile: [''],
        email: [''],
        skype: [''],
        facebook: [''],
        language: ['']
      },
      dataJob: {
        trailDate: ['2019-11-19T04:52:51.736Z'],
        startDate: ['2019-11-19T04:52:51.736Z'],
        companyId: [0],
        departmentId: [0],
        divisionId: [0],
        positionId: [0],
        concurrently: [0],
        managedBy: ['']
      },
      dataEdu: {
        professorId: [0],
        marterId: [0],
        majorId: [0],
        expertId: [0],
        eduLevelId: [0],
        occupationalId: [0],
        workmanshipLevelId: [0]
      },
      dataHealth: {
        bloodGroup: [0],
        disability: true,
        height: [0],
        weight: [0],
        healthStatus: [0],
        healthNote: [0]
      },
      dataExtend: {
        note: [''],
        description: [''],
        orderIndex: [0],
        allowDisplay: true
      },
      dataDb: this.fb.group({
        status: [1]
      })
    });
    if (this.id) {
      const rs = await this.sv.findOneById(this.id);
      this.ex.logDebug('Edit item', rs);
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
      }
    }
  }

  async submitForm() {
    super.submitForm();
    const body: any = this.myForm.value;
    if (this.myForm.invalid) return;

    this.isLoading = true;
    let result: any;
    if (this.id) {
      const rs = await this.sv.edit(this.id as number, body);
      this.isLoading = false;
      if (rs.ok) {
        result = rs.result;
      } else {
        //this.bindError(this.myForm, rs);
      }
    } else {
      const rs = await this.sv.add(body);
      this.isLoading = false;
      if (rs.ok) {
        result = rs.result;
      } else {
        //this.bindError(this.myForm, rs);
      }
    }
    this.handleOk(result);
  }

}
