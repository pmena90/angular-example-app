import { Component, Inject, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { WeatherService } from 'src/app/services/weather.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Weather } from 'src/app/entities/Weather';

export interface DeleteData {
    weather: Weather | null;
}

@Component({
    selector: 'confirm-delete-dialog',
    templateUrl: './confirm-delete-dialog.component.html',
})
export class WeatherDeleteConfirmComponent implements OnInit {
    summary = "";
    id = 0;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DeleteData,
        public dialogRef: MatDialogRef<WeatherDeleteConfirmComponent>,
        public weatherService: WeatherService,
        public notifications: NotificationsService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        if (this.data.weather) {
            this.summary = this.data.weather.summary;
            this.id = this.data.weather.id;
        }
    }

    async delete() {
        let response = await this.weatherService.DeleteAsync(this.id);

        if (response.result) {
            this.notifications.showAlert(`Deleted`);
            const dialogRef = this.dialogRef.close(true);
        } else {
            const message = response.message ? response.message : 'Sorry, service is now unavailable. Please try later.'
            console.log(message)
        }
    }
}