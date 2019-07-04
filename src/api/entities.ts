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
    gpio: string;
    status: boolean;
    updatedOnUTC?: Date;
}

export interface ScheduleView {
    id?: number;
    cronExpression: string;
    durationInMinutes: number;
    enabled: boolean;
}

export interface SensorView {
    id?: number;
    endpoint: string;
    gpio: string;
    updatedOnUTC?: Date;
    value: number;
    zone?: ZoneView;
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
    schedule?: ScheduleView;
    location?: LocationView;
    area: AreaView;
    waterUsages: WaterUsageView[];
    name: string;
    runningLimitInMinutes?: number;
    lastStartOnUTC?: Date;
    lastEndOnUTC?: Date;
    surfaceSizeInMeter2?: number;
    waitTimeInMinutes?: number;
}