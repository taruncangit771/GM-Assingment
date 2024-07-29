export interface IGame {
    id: number;
    name: string;
    genre: string;
    releaseDate: Date;
    createdAt: Date;
    updatedAt: Date;
    is_deleted: number // 0 or 1
}