import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { IZone } from 'src/model/model';

export interface IZoneView {
    endpoint: string,
    pin: string,
    name: string,
    status: boolean,
    startTime: string,
    endTime: string,
    duration: number
}

export class ZoneConverter {

    static convertZone(zone: IZone): IZoneView {
        const startTime = new Date(zone.startTime);
        const endTime = new Date(zone.endTime);
        
        
        return {
            endpoint: zone.endpoint,
            pin: zone.pin,
            name: zone.name,
            status: zone.status,
            startTime: startTime.toString(),
            endTime: endTime.toString(),
            duration: duration
        }
    }

    static convertZones(zones: IZone[]): IZoneView[] {
        return zones.map(zone => this.convertZone(zone));
    }
}