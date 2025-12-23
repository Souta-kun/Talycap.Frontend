export interface CharacterResponse {
  info: Info;
  results: Character[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}