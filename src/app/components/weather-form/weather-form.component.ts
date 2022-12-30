import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from 'src/app/entities/Weather';
import { NotificationsService } from 'src/app/services/notifications.service';


export interface DialogData {
  isEditing: true | false;
  weather: Weather | null;
}

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss']
})
export class WeatherFormComponent implements OnInit {
  weatherForm: FormGroup;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<WeatherFormComponent>,
    public formBuilder: FormBuilder,
    public weatherService: WeatherService,
    public notifications: NotificationsService
  ) {
    this.weatherForm = this.formBuilder.group({
      summary: [this.data.weather?.summary ?? '', Validators.compose([Validators.required, Validators.minLength(5)])],
      date: [this.data.weather?.date ?? '', Validators.required],
      temperaturec: [this.data.weather?.temperatureC ?? '', Validators.min(-20)],
      temperaturef: [this.data.weather?.temperatureF ?? '', Validators.min(-200)],
    });
  }

  title = "";

  ngOnInit(): void {
    if (this.data.isEditing) {
      this.title = "Edit weather item"
    } else {
      this.title = "Add weather item"

    }
  }

  public getItemVal(name: string) {
    return this.weatherForm.controls[name].value
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.weatherForm.get(controlName)?.hasError(errorName) ?? false;
  };

  public getControl(controlName: string) {
    return this.weatherForm.get(controlName)
  }

  async onSubmit() {
    console.log("submit");
    this.loading = true;

    const weather = {
      summary: this.getItemVal("summary"),
      date: this.getItemVal("date"),
      temperatureC: this.getItemVal("temperaturec"),
      temperatureF: this.getItemVal("temperaturef"),
    };

    if (this.data.isEditing) {
      console.log("editing");

      this.dialogRef.close();
    } else {
      const response = await this.weatherService.CreateAsync(weather);
      if (response.result) {
        this.notifications.showAlert(`Weather created Successfuly`);
        this.loading = false;
        this.dialogRef.close(response.data);
      } else {
        const message = response.message ? response.message : 'Sorry, service is now unavailable. Please try later.'
        this.notifications.showAlert(message, 5000);
        this.loading = false;
      }
    }
  }

}
