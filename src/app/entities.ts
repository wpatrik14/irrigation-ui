export interface AreaView {
    id?: number;
    name: string;
    enabled: boolean;
    zones?: ZoneView[];
}

export interface ForecastView {
    id?: number;
    hours: number;
    mm: number;
    calculation: string;
    enabled: boolean;
    zone?: ZoneView;
}

export interface LocationView {
    id?: number;
    longitude: string;
    latitude: string;
}

export interface PlantView {
    id?: number;
    name: string;
}

export interface RelayView {
    id?: number;
    endpoint: string;
    clientId: string;
    gpio: string;
    status: boolean;
    lastStartOnUTC?: string;
    lastEndOnUTC?: string;
    durationInfo?: string;
}

export interface ScheduleView {
    id?: number;
    cronExpression: string;
    durationInMinutes: number;
    enabled: boolean;
    zone?: ZoneView;
}

export interface SensorView {
    id?: number;
    endpoint: string;
    clientId: string;
    zone?: ZoneView;
    values?: SensorValueView[];
}

export interface SensorValueView {
    type: string;
    value: string;
    insertedOnUTC: Date;
    unit: string;
}

export interface SoilView {
    id?: number;
    name: string;
}

export interface WaterUsageView {
    id?: number;
    fromUTC: Date;
    toUTC: Date;
    volumeInLiter: number;
    zone?: ZoneView;
}

export interface ZoneView {
    id?: number;
    relay: RelayView;
    sensors?: SensorView[];
    soil?: SoilView;
    plant?: PlantView;
    forecast?: ForecastView;
    schedules?: ScheduleView[];
    location?: LocationView;
    area?: AreaView;
    waterUsages?: WaterUsageView[];
    name: string;
    enabled: boolean;
    runningLimitInMinutes?: number;
    surfaceSizeInMeter2?: number;
    waitTimeInMinutes?: number;
}