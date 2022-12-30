import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsService } from 'src/app/services/notifications.service';
import { WeatherService } from 'src/app/services/weather.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherFormComponent } from '../weather-form/weather-form.component';
import { Weather } from 'src/app/entities/Weather';
import { WeatherDeleteConfirmComponent } from '../weatherDeleteConfirm/weather-delete-confirm.component';


const ELEMENT_DATA1: Weather[] = [];

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss'],
})
export class WeatherListComponent implements OnInit {

  displayedColumns: string[] = ['summary', 'date', 'temperatureC', 'temperatureF', 'operations'];
  dataSource1 = new MatTableDataSource(ELEMENT_DATA1);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  constructor(public weatherService: WeatherService,
    public notifications: NotificationsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getWeatherList();
  }

  async getWeatherList() {
    const response = await this.weatherService.GetWeatherListAsync();

    console.log(response);

    if (response.result) {
      this.notifications.showAlert(`Loaded`);
      await this.fillDatasource(response?.data);
    } else {
      const message = response.message ? response.message : 'Sorry, service is now unavailable. Please try later.'
      console.log(message)
    }
  }

  async fillDatasource(elements: Weather[]) {
    this.dataSource1 = new MatTableDataSource(elements);
  }

  createItem() {
    const dialogRef = this.dialog.open(WeatherFormComponent, { data: { isEditing: false } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        const data = this.dataSource1.data;
        data.push(result);
        this.dataSource1.data = data;
      }
    });
  }

  async edit(id: number) {
    let response = await this.weatherService.GetAsync(id);

    if (response.result) {
      this.notifications.showAlert(`Loaded`);

      const dialogRef = this.dialog.open(WeatherFormComponent, {
        data: { isEditing: true, weather: response.data }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(`Dialog result: ${result}`);
          this.getWeatherList()
        }
      });
    } else {
      const message = response.message ? response.message : 'Sorry, service is now unavailable. Please try later.'
      console.log(message)
    }
  }

  async delete(id: number) {
    let response = await this.weatherService.GetAsync(id);

    if (response.result) {
      this.notifications.showAlert(`Loaded`);

      const dialogRef = this.dialog.open(WeatherDeleteConfirmComponent, {
        data: { weather: response.data }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          console.log(`Dialog result: ${result}`);
          this.getWeatherList()
        }
      });
    } else {
      const message = response.message ? response.message : 'Sorry, service is now unavailable. Please try later.'
      console.log(message)
    }
  }

}
