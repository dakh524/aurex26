// Reusable Game Scoring Utility for Tamil Heritage Games

export interface GameScoreState {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  streak: number;
  maxStreak: number;
  accuracy: number;
}

export const INITIAL_SCORE_STATE: GameScoreState = {
  score: 0,
  correctAnswers: 0,
  totalQuestions: 0,
  streak: 0,
  maxStreak: 0,
  accuracy: 0,
};

export function calculateAnswerScore(
  isCorrect: boolean,
  timeTakenMs: number,
  currentStreak: number
): { pointsAdded: number; newStreak: number; streakBonus: number } {
  if (!isCorrect) {
    return { pointsAdded: 0, newStreak: 0, streakBonus: 0 };
  }

  let points = 100;

  // Speed bonus if answered in less than 5 seconds (5000ms)
  if (timeTakenMs < 5000) {
    points += 50;
  }

  const newStreak = currentStreak + 1;
  let streakBonus = 0;

  if (newStreak === 3) {
    streakBonus = 50;
  } else if (newStreak >= 5) {
    streakBonus = 100;
  }

  return {
    pointsAdded: points + streakBonus,
    newStreak,
    streakBonus,
  };
}

export function getHighScore(gameId: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const val = localStorage.getItem(`tamil_game_highscore_${gameId}`);
    return val ? parseInt(val, 10) : 0;
  } catch (e) {
    return 0;
  }
}

export function saveHighScore(gameId: string, score: number): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getHighScore(gameId);
    if (score > current) {
      localStorage.setItem(`tamil_game_highscore_${gameId}`, score.toString());
      return true; // New high score achieved
    }
  } catch (e) {
    // Ignore storage errors
  }
  return false;
}
