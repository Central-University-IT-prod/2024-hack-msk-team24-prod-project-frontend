import { computed, Injectable, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from './jwt';
import { LoginRequest, LoginResponse, RegisterRequest, SetCardRequest, UserResponse } from '../../../../generated';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  public currentUser = signal<UserResponse | null>(null);

  public isAuthenticated = computed(() => this.currentUser() !== null);
  public notAuthenticated = computed(() => this.currentUser() === null);

  constructor(
    private http: HttpClient,
    private readonly jwtService: JwtService,
    private router: Router,
    private api: ApiService,
  ) {}

  async register(dto: RegisterRequest): Promise<LoginResponse | null> {
    try {
      await firstValueFrom(this.api.apiService.registerUserAuthRegisterPost(dto));
      const user_login = dto as LoginRequest;
      return await this.login(user_login);
    } catch (registerError: any) {
      throw registerError.error.detail;
    }
  }

  async login(dto: LoginRequest): Promise<LoginResponse | null> {
    try {
      const resp = await firstValueFrom(this.api.apiService.loginAuthLoginPost(dto));
      await this.setAuth(resp);
      return resp;
    } catch (loginError: any) {
      throw loginError.error.detail;
    }
  }

  async getProfile(): Promise<UserResponse> {
    try {
      if (!this.jwtService.checkTokenSetUp()) this.jwtService.setTokenToApi();
      const resp = await firstValueFrom(this.api.apiService.handlerUsersMeGet());
      await this.setAuthUser(resp);
      return resp;
    } catch (profileError: any) {
      this.purgeAuth();
      return profileError.error.detail;
    }
  }

  async connectCard(dto: SetCardRequest): Promise<string> {
    try {
      return await firstValueFrom(this.api.apiService.handlerUsersSetCardPost(dto));
    } catch (e: any) {
      console.log(e);
      return e.error.detail;
    }
  }

  async logout() {
    this.purgeAuth();
  }

  async setAuthUser(user: UserResponse | string) {
    if (typeof user === 'string') {
      this.purgeAuth();
      return;
    }
    this.currentUser.set(user);
  }

  async setAuth(user: LoginResponse) {
    this.jwtService.saveToken(user.access_token);
    await this.getProfile()
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUser.set(null);
    console.log(this.currentUser());
    console.log(this.isAuthenticated())
  }
}
