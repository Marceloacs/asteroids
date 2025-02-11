
export interface GetFavoriteAsteroidsPayload {}

export interface GetFavoriteAsteroidsResponse {
  list: string[];
}

export interface AddFavoriteAsteroidPayload {
  asteroidId: number;
}

export interface AddFavoriteAsteroidResponse {
  success: boolean;
}

export interface RemoveFavoriteAsteroidPayload {
  asteroidId: number;
}

export interface RemoveFavoriteAsteroidResponse {
  success: boolean;
}