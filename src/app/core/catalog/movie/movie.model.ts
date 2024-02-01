
export class Movie{

    constructor(
        public adult: boolean,
        public backdropPath: string | null,
        public genre_ids: number[]|null,
        public id: number,
        public originalLanguage: string,
        public originalTitle: string,
        public overview: string,
        public popularity: number,
        public posterPath: string | null,
        public releaseDate: string,
        public title: string,
        public video: boolean,
        public voteAverage: number,
        public voteCount: number
      ) {}
      
}