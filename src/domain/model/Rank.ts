import { Judge } from "@/domain/model/Judge";

export interface Rank {
  id: string;
  number: number;
  category: string;
  committee: Judge[];
  finished: boolean;
}

export const getRankName = (rank: Rank) => `${rank.category} ${rank.number}`;

export interface ApiRank {
  number: number;
  category: string;
  committee: string[];
  finished: boolean;
}

export const rankToApiRank = (rank: Rank): ApiRank => {
  const apiRank = JSON.parse(JSON.stringify(rank));
  delete apiRank.id;
  apiRank.committee = rank.committee.map(it => it.id);

  return apiRank;
};
