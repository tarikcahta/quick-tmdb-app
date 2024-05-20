import axios, { AxiosResponse } from 'axios';
import {
  Movie,
  TVShow,
  TMDBSearchResponse,
  TMDBResponse,
} from '../types/types';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY as string;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTVShows = async (): Promise<TVShow[] | undefined> => {
  try {
    const response: AxiosResponse<TMDBResponse> = await axios.get(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}`
    );
    return response.data.results as TVShow[];
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

export const getMovieDetails = async (
  movieId: number
): Promise<Movie | undefined> => {
  try {
    const response: AxiosResponse<Movie> = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
  }
};

export const getTVSeriesDetails = async (
  seriesId: number
): Promise<TVShow | undefined> => {
  try {
    const response: AxiosResponse<TVShow> = await axios.get(
      `${BASE_URL}/tv/${seriesId}?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching details for TV series ID ${seriesId}:`,
      error
    );
  }
};

export const getMovieImages = async (movieId: number): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`
    );

    return response.data.backdrops[0];
  } catch (error) {
    console.error(`Error fetching images for movie ID ${movieId}:`, error);
    return undefined;
  }
};

export const getMovieVideos = async (movieId: number): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    return response.data.results[0];
  } catch (error) {
    console.error(`Error fetching videos for movie ID ${movieId}:`, error);
    return undefined;
  }
};

export const getTVSeriesImages = async (seriesId: number): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${BASE_URL}/tv/${seriesId}/images?api_key=${API_KEY}`
    );
    return response.data.backdrops[0];
  } catch (error) {
    console.error(`Error fetching images for TV series ID ${seriesId}:`, error);
    return undefined;
  }
};

export const getTVSeriesVideos = async (seriesId: number): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${BASE_URL}/tv/${seriesId}/videos?api_key=${API_KEY}`
    );
    return response.data.results[0];
  } catch (error) {
    console.error(`Error fetching videos for TV series ID ${seriesId}:`, error);
    return undefined;
  }
};
