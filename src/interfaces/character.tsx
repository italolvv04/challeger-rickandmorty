interface ItemOrigin {
  name: string;
  url: string;
}

interface ItemLocation {
  name: string;
  url: string;
}

export interface Item {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ItemOrigin;
  location: ItemLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
  isFavorite?: boolean;
}
