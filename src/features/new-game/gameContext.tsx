import { BackgroundTheme, Player } from "@constants/types";
import { ReactNode, createContext, useContext, useState } from "react";

export type Game = {
  players: Player[];
};

type GameState = {
  game: Game;
  newGame: (game: Game) => void;
  restartGame: () => void;
  updatePlayers: (players: Player[]) => void;
  updateLifeTotal: (playerId: string, newLifeTotal: number) => void;
  updateStartingLife: (playerId: string, newLifeTotal: number) => void;
  updateTheme: (playerId: string, newTheme: BackgroundTheme) => void;
  updateBackgroundColor: (playerId: string, backgroundColor: string) => void;
};

const defaultState: GameState = {
  game: {
    players: [],
  },
  newGame: () => {},
  restartGame: () => {},
  updatePlayers: () => {},
  updateLifeTotal: () => {},
  updateStartingLife: () => {},
  updateTheme: () => {},
  updateBackgroundColor: () => {},
};

export const GameContext = createContext<GameState>(defaultState);

export const GameContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [game, setGame] = useState<Game>({ players: [] });

  const newGame = (game: Game) => {
    setGame(game);
  };

  const restartGame = () => {
    setGame({
      ...game,
      players: game.players.map((player) => ({ ...player, lifeTotal: player.startingLife })),
    });
  };

  const updatePlayers = (players: Player[]) => {
    setGame({
      ...game,
      players,
    });
  };

  const updateLifeTotal = (playerId: string, newLifeTotal: number) => {
    setGame((prevGameState) => ({
      ...prevGameState,
      players: prevGameState.players.map((player) =>
        player.playerId === playerId ? { ...player, lifeTotal: newLifeTotal } : player,
      ),
    }));
  };

  const updateStartingLife = (playerId: string, newLifeTotal: number) => {
    setGame((prevGameState) => ({
      ...prevGameState,
      players: prevGameState.players.map((player) =>
        player.playerId === playerId ? { ...player, startingLife: newLifeTotal } : player,
      ),
    }));
  };

  const updateBackgroundColor = (playerId: string, backgroundColor: string) => {
    setGame((prevGameState) => ({
      ...prevGameState,
      players: prevGameState.players.map((player) =>
        player.playerId === playerId ? { ...player, backgroundColor } : player,
      ),
    }));
  };

  const updateTheme = (playerId: string, newTheme: BackgroundTheme) => {
    setGame((prevGameState) => ({
      ...prevGameState,
      players: prevGameState.players.map((player) =>
        player.playerId === playerId ? { ...player, backgroundTheme: newTheme } : player,
      ),
    }));
  };

  return (
    <GameContext.Provider
      value={{
        game,
        newGame,
        restartGame,
        updatePlayers,
        updateLifeTotal,
        updateStartingLife,
        updateTheme,
        updateBackgroundColor,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
