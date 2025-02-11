export interface AsteroidDetail {
    id: string;
    date: string;
    name: string;
    diameter: number;
    isHazardous: boolean;
    link: string;
    nasaJPLURL: string;
    absoluteMagnitudeH: number;
    isSentryObject: boolean;
    velocity: string;
}

export interface AsteroidDetailPayload {
    id: string;
    date: string;
}

export interface AsteroidDetailResponse {
    detail: AsteroidDetail;
}