
export interface IScore {
    id: number;
    userId: number;  // Foreign key to User
    gameId: number;  // Foreign key to Game
    score: number;
    created_at: Date;
    updated_at: Date;
}
