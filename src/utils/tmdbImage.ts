export type TmdbImageSize = 'w185' | 'w342' | 'w500' | 'w780' | 'w1280' | 'original';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const tmdbImage = (
    path: string | null | undefined,
    size: TmdbImageSize = 'w342'
): string | null => (path ? `${IMAGE_BASE_URL}/${size}${path}` : null);
