export interface NHLTeamsListExport {
  copyright: string;
  teams: RawTeamDto[];
}

export class RawTeamDto {
  id: number;
  name: string;
  link: string;
  venue: Venue;
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
  roster: Roster;
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

export interface Venue {
  name: string;
  link: string;
  city: string;
  timeZone: TimeZone;
}

export interface Roster {
  roster: RosterPlayers[];
  link: string;
}

export interface RosterPlayers {
  person: Person;
  jerseyNumber: string;
  position: Position;
}

export interface Person {
  id: number;
  fullName: string;
  link: string;
}

export interface Position {
  code: string;
  name: string;
  type: string;
  abbreviation: string;
}
