export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type Team = {
  id: string;
  name: string;
  city: string;
  logo: string;
};

export type Game = {
  id: string;
  date: Date;
  location: "Away" | "Home";
  opponentId: string;
  opponent: Team;
};
