export interface LeaderboardConfig {
    id: string;
    name: string;
    session_id: string;
}

export interface RivalryConfig {
    year: number;
    global: LeaderboardConfig;
    rivals: Array<LeaderboardConfig>;
}

export interface AocPrivateLeaderboard {
    name?: string;
    event: string;
    members: { [key: string]: AocMember };
    owner_id: string
}

export interface AocMember {
    global_score: number;
    local_score:  number;
    last_star_ts: string;
    id:           string;
    name:         string;
    stars:        number;
}

export interface YearStats {
    year: number;
    rivals: Array<RivalStats>;
}

export interface RivalStats {
    name: string;
    stars: number;
    membersCount: number;
    starsPerMember: number;
    median: number;
}

export interface LeaderboardRequest {
    year: number;
    id: string;
    session_id: string;
}