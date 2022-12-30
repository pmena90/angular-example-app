import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment";
import { HttpService } from "./http.service";
import { IUser } from "../entities/User";
import { BehaviorSubject } from "rxjs";
import { IResponse } from "../interfaces/IResponse";
import { StorageService } from "./storage.service";
import { handleRejectionMessage } from "../helpers/response";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly resourceUrl = `${environment.apiUrl}/WeatherForecast`;
  user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(<IUser><unknown>null)

  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) {
  }

  /**
   * Token validator
   */
  public isAuthenticated(): boolean {
    const token = this.storageService.getKey('token');

    return !jwtHelper.isTokenExpired(token ? token.authToken : undefined);
  }

  /**
   * Login to system
   *
   * @param username
   * @param password
   */
  public async signIn(username: string, password: string): Promise<IResponse> {
    const url = `${this.resourceUrl}/login`;
    const response = await this.httpService.postLogin<IResponse>(url, {
      username,
      password
    }).toPromise()

    console.log(response);
    let token = "";
    if (response?.headers !== null) {
      token = response?.headers?.get('Authorization') || '';

    }
    let data = { token: token, user: response?.data }
    //Save user token and data to localStorage and set current user data
    this.initUser(data);

    return {
      result: <boolean>response?.result,
      message: <string>response?.message,
      data: response?.data,
      headers: response?.headers
    }
  }

  /**
   * Register new user
   *
   * @param payload
   */
  /**
   * Signup
   *
   * @param signup
   */
  async signup(signup: { username: string; password: string; }): Promise<IResponse> {
    try {
      const url = `${this.resourceUrl}/signup`

      const signupResult = await this.httpService
        .post<any>(url, {
          ...signup
        })
        .toPromise();
      console.log({ signupResult });

      if (signupResult.result) {
        if (signupResult.data) {
          return {
            result: true,
            message: signupResult.message,
          };
        } else {
          this.user$.next(<IUser><unknown>null);
          return {
            result: false,
            message: signupResult.message,
          };
        }
      } else {
        return {
          result: false,
          message: signupResult.message,
        };
      }
    } catch (error) {
      return handleRejectionMessage(error);
    }
  }

  /**
   * Save current token to localStorage and set user data
   *
   * @param data
   */
  initUser(data: { token: string; user: IUser }) {
    this.storageService.setKeyFromJSON('token', { authToken: data?.token, refreshToken: data?.token });

    if (data?.user) {
      this.storageService.setKeyFromJSON('user-data', data.user);
      this.user$.next(data.user)
    }
  }
}
