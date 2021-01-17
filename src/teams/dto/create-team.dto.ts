export class rawTeamDto { 
    id: number;
    name: string;
    link: string;
    abbreviation: string;
    teamName: string;
    locationName: string;
    firstYearOfPlay: string;
    division: Division;
    conference: Conference;
    franchise: Franchise;
    shortName: string;
    officialSiteUrl: string;
    franchiseId: number;
    active: boolean;
}

export interface TimeZone {
    id: string;
    offset: number;
    tz: string;
}

export interface Division {
    id: number;
    name: string;
    link: string;
}

export interface Conference {
    id: number;
    name: string;
    link: string;
}

export interface Franchise {
    franchiseId: number;
    teamName: string;
    link: string;
}

