import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ProfileApiService } from '../../profile/services/profile-api.service';
import {
  BillResponse,
  CreateBillRequest,
  CreateBillResponse,
  CreateGroupType1Request,
  CreateGroupType2Request,
  CreateGroupType3Request,
  GroupResponse,
  JoinBillRequest, PaymentUrlRequest,
  ProductListResponse,
  ProductResponse,
  SetProducts,
  UserResponse
} from '../../../../generated';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsApiService {

  constructor(
    private httpClient: HttpClient,
    private api: ApiService,
    private profileService: ProfileApiService
  ) { }

  async joinGroupById(groupId: string): Promise<string> {
    try {
      const resp =  await firstValueFrom(this.api.apiService.handlerGroupJoinGroupIdPost(groupId));
      return resp;
    } catch (e: any) {
      throw e.error.detail;
    }
  }

  async joinGuestGroupById(code: string): Promise<UserResponse> {
    try {
      const token = await firstValueFrom(this.api.apiService.handlerAuthCodePost({ code: code }));
      await this.profileService.setAuth(token);
      return this.profileService.currentUser()!;
    } catch (e: any) {
      throw e.error.detail;
    }
  }


  async joinBillById(dto: JoinBillRequest): Promise<string> {
    try {
      return await firstValueFrom(this.api.apiService.handlerBillJoinPost(dto));
    } catch (e: any) {
      throw 'такой группы не существует';
    }
  }

  async setProductsToBill(dto: SetProducts): Promise<any> {
    try {
      return await firstValueFrom(this.api.apiService.handlerBillSetProductsGet(dto));
    } catch (e: any) {
      console.log(e);
      throw e.error.msg;
    }
  }

  async createSameGroup(dto: CreateGroupType1Request): Promise<GroupResponse> {
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerGroupCreateEqualPost(dto));
      console.log(resp);
      return resp;
    } catch (e: any) {
      console.log(e);
      throw e.error.detail;
    }
  }

  async createHardGroup(dto: CreateGroupType3Request): Promise<GroupResponse> {
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerGroupCreateSummaryPost(dto));
      console.log(resp);
      return resp;
    } catch (e: any) {
      console.log(e);
      throw e.error.detail;
    }
  }

  async createDifferentGroup(dto: CreateGroupType2Request): Promise<GroupResponse> {
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerGroupCreateNonequalPost(dto));
      console.log(resp);
      return resp;
    } catch (e: any) {
      console.log(e);
      throw e.error.detail;
    }
  }

  async createBillForGroup(dto: CreateBillRequest): Promise<CreateBillResponse> {
    try {
      const resp = await firstValueFrom(this.api.apiService.createBillHandlerBillCreatePost(dto));
      console.log(resp);
      return resp;
    } catch (e: any) {
      console.log(e);
      throw e.error.detail;
    }
  }

  async getAllGroups(): Promise<GroupResponse[]> {
    const profile = this.profileService.currentUser();
    if (profile === null) throw 'not Authorized';
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerGroupMyGet());
      return resp.groups;
    } catch (e: any) {
      console.log(e);
      throw 'failed';
    }
  }

  async getGroupDolg(groupId: string): Promise<number> {
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerGroupDolgsPost({ id: groupId }));
      return resp.value;
    } catch (e: any) {
      throw e.error.msg;
    }
  }

  async getBillsFromGroup(groupId: string): Promise<BillResponse[]> {
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerGroupBillsGet(groupId));
      return resp.bills;
    } catch (e: any) {
      throw e.error.msg;
    }
  }

  async getMembersFromGroup(groupId: number): Promise<UserResponse[]> {
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerGroupMembersGet(groupId));
      return resp.users;
    } catch (e: any) {
      throw e.error.msg;
    }
  }

  async getMembersFromBill(billId: number): Promise<UserResponse[]> {
    try {
      const resp = await firstValueFrom(this.api.apiService.getBillBillMembersGet(billId));
      // @ts-ignore TODO change
      return resp.users;
    } catch (e: any) {
      throw e.error.msg;
    }
  }

  async getProductsByBill(billId: number): Promise<ProductResponse[]> {
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerBillProductsGet(billId));
      return resp.products;
    } catch (e: any) {
      throw e.error.msg;
    }
  }

  async getGroupById(id: string): Promise<GroupResponse> {
    const profile = this.profileService.currentUser();
    if (profile === null) throw 'not Authorized';
    try {
      return await firstValueFrom(this.api.apiService.handlerGroupGetGet(id));
    } catch (e: any) {
      console.log(e);
      throw 'failed';
    }
  }

  async getBillById(billId: number): Promise<BillResponse> {
    try {
      return await firstValueFrom(this.api.apiService.getBillBillGetGet(billId));
    } catch (e: any) {
      throw e.error.msg;
    }
  }

  async getProductsFromQR(dto: FormData): Promise<ProductResponse[]> {
    try {
      const url = '/bill/scanqr';
      // @ts-ignore
      const res: ProductListResponse = await firstValueFrom(this.httpClient.post(environment.apiBaseUrl + url, dto));
      return res.products as ProductResponse[];
    } catch (e: any) {
      console.log(e);
      throw 'failed';
    }
  }

  async createGroupPayment(groupId: string, amount: number): Promise<string> {
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerGroupDolgsPaymentPost({ id: groupId }));
      // @ts-ignore
      return resp.url;
    } catch (e: any) {
      throw e.error.msg;
    }
  }

  async createBillPayment(dto: PaymentUrlRequest): Promise<string> {
    try {
      const resp = await firstValueFrom(this.api.apiService.createPaymentBillPaymentPost(dto));
      return resp.url;
    } catch (e: any) {
      throw e.error.msg;
    }
  }
}
