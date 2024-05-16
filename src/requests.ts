import axios, { AxiosResponse } from 'axios';
import {
  Movie,
  TVShow,
  TMDBSearchResponse,
  Show,
  TMDBResponse,
} from './types/types';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY as string;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTVShows = async (): Promise<Show[] | undefined> => {
  try {
    const response: AxiosResponse<TMDBResponse> = await axios.get(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}`
    );
    return response.data.results as Show[];
  } catch (error) {
    console.error(error);
  }
};

export const getMovies = async (): Promise<Movie[] | undefined> => {
  try {
    const response: AxiosResponse<TMDBResponse> = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    return response.data.results as Movie[];
  } catch (error) {
    console.error(error);
  }
};

export const searchTVShows = async (
  query: string
): Promise<TVShow[] | undefined> => {
  try {
    const response: AxiosResponse<TMDBSearchResponse> = await axios.get(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    return response.data.results as TVShow[];
  } catch (error) {
    console.error('Error searching TV shows:', error);
    return undefined;
  }
};

export const searchMovies = async (
  query: string
): Promise<Movie[] | undefined> => {
  try {
    const response: AxiosResponse<TMDBSearchResponse> = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    return response.data.results as Movie[];
  } catch (error) {
    console.error('Error searching movies:', error);
    return undefined;
  }
};
