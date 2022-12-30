import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { IResponse } from '../interfaces/IResponse';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { IWeather } from '../interfaces/IWeather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly resourceUrl = `${environment.apiUrl}/WeatherForecast`;

  constructor(private httpService: HttpService, private storageService: StorageService) { }

  /**
   * Get weather list 
   *
   */
  public async GetWeatherListAsync(): Promise<IResponse> {
    const url = `${this.resourceUrl}`;
    const response = await this.httpService.get<IResponse>(url).toPromise()


    return {
      result: <boolean>response?.result,
      message: <string>response?.message,
      data: response?.data,
      headers: response?.headers
    }
  }

  public async GetAsync(id: number): Promise<IResponse> {
    const url = `${this.resourceUrl}/${id}`;
    const response = await this.httpService.get<IResponse>(url).toPromise()


    return {
      result: <boolean>response?.result,
      message: <string>response?.message,
      data: response?.data,
      headers: response?.headers
    }
  }

  public async CreateAsync(weather: IWeather): Promise<IResponse> {
    const url = `${this.resourceUrl}`;
    const response = await this.httpService.post<IResponse>(url, weather).toPromise()


    return {
      result: <boolean>response?.result,
      message: <string>response?.message,
      data: response?.data,
      headers: response?.headers
    }
  }

  public async UpdateAsync(id: number, weather: IWeather): Promise<IResponse> {
    const url = `${this.resourceUrl}/${id}`;
    const response = await this.httpService.put<IResponse>(url, weather).toPromise()


    return {
      result: <boolean>response?.result,
      message: <string>response?.message,
      data: response?.data,
      headers: response?.headers
    }
  }

  public async DeleteAsync(id: number): Promise<IResponse> {
    const url = `${this.resourceUrl}/${id}`;
    const response = await this.httpService.delete<IResponse>(url).toPromise()

    return {
      result: <boolean>response?.result,
      message: <string>response?.message,
      data: response?.data,
      headers: response?.headers
    }
  }
}
