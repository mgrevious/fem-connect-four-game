import { describe } from 'vitest';
import { PlayerColor, createGrid, findWinner } from './helpers';

describe('Helper functions tests', () => {
  test('findWinner returns false if no valid winner exists in gridMap', () => {
    const gridMap = createGrid();
    expect(findWinner(gridMap, PlayerColor.RED)).toBe(false);
  });

  test('findWinner returns true if gridMap has 4 consecutive vertical values for same player.', () => {
    const grid = createGrid();
    grid[0].rows.forEach((row, index) => {
      if (index < 4) {
        row.color = PlayerColor.RED;
        row.selected = true;
        row.highlight = true;
      }
    });

    expect(findWinner(grid, PlayerColor.RED)).toBe(true);
  });

  test('findWinner returns false if gridMap has 4 consecutive vertical values for different player.', () => {
    const grid = createGrid();
    grid[0].rows.forEach((row, index) => {
      if (index < 4) {
        row.color = PlayerColor.RED;
        row.selected = true;
        row.highlight = true;
      }
    });

    expect(findWinner(grid, PlayerColor.YELLOW)).toBe(false);
  });

  test('findWinner returns true if gridMap has 4 consecutive horizontal values for same player.', () => {
    const grid = createGrid();
    grid[0].rows[5].color = PlayerColor.RED;
    grid[0].rows[5].selected = true;
    grid[0].rows[5].highlight = true;
    grid[1].rows[5].color = PlayerColor.RED;
    grid[1].rows[5].selected = true;
    grid[1].rows[5].highlight = true;
    grid[2].rows[5].color = PlayerColor.RED;
    grid[2].rows[5].selected = true;
    grid[2].rows[5].highlight = true;
    grid[3].rows[5].color = PlayerColor.RED;
    grid[3].rows[5].selected = true;
    grid[3].rows[5].highlight = true;

    expect(findWinner(grid, PlayerColor.RED)).toBe(true);
  });

  test('findWinner returns false if gridMap has 4 consecutive horizontal values for different player.', () => {
    const grid = createGrid();
    grid[0].rows[5].color = PlayerColor.RED;
    grid[0].rows[5].selected = true;
    grid[0].rows[5].highlight = true;
    grid[1].rows[5].color = PlayerColor.RED;
    grid[1].rows[5].selected = true;
    grid[1].rows[5].highlight = true;
    grid[2].rows[5].color = PlayerColor.RED;
    grid[2].rows[5].selected = true;
    grid[2].rows[5].highlight = true;
    grid[3].rows[5].color = PlayerColor.RED;
    grid[3].rows[5].selected = true;
    grid[3].rows[5].highlight = true;

    expect(findWinner(grid, PlayerColor.YELLOW)).toBe(false);
  });

  test('findWinner returns true if gridMap has 4 consecutive upward diagonal values for same player.', () => {
    const grid = createGrid();
    grid[0].rows[5].color = PlayerColor.YELLOW;
    grid[0].rows[5].selected = true;
    grid[0].rows[5].highlight = true;
    grid[1].rows[4].color = PlayerColor.YELLOW;
    grid[1].rows[4].selected = true;
    grid[1].rows[4].highlight = true;
    grid[2].rows[3].color = PlayerColor.YELLOW;
    grid[2].rows[3].selected = true;
    grid[2].rows[3].highlight = true;
    grid[3].rows[2].color = PlayerColor.YELLOW;
    grid[3].rows[2].selected = true;
    grid[3].rows[2].highlight = true;

    expect(findWinner(grid, PlayerColor.YELLOW)).toBe(true);
  });

  test('findWinner returns false if gridMap has 4 consecutive upward diagonal values for different player.', () => {
    const grid = createGrid();
    grid[0].rows[5].color = PlayerColor.YELLOW;
    grid[0].rows[5].selected = true;
    grid[0].rows[5].highlight = true;
    grid[1].rows[4].color = PlayerColor.YELLOW;
    grid[1].rows[4].selected = true;
    grid[1].rows[4].highlight = true;
    grid[2].rows[3].color = PlayerColor.YELLOW;
    grid[2].rows[3].selected = true;
    grid[2].rows[3].highlight = true;
    grid[3].rows[2].color = PlayerColor.YELLOW;
    grid[3].rows[2].selected = true;
    grid[3].rows[2].highlight = true;

    expect(findWinner(grid, PlayerColor.RED)).toBe(false);
  });

  test('findWinner returns true if gridMap has 4 consecutive downward diagonal values for same player.', () => {
    const grid = createGrid();
    grid[0].rows[2].color = PlayerColor.RED;
    grid[0].rows[2].selected = true;
    grid[0].rows[2].highlight = true;
    grid[1].rows[3].color = PlayerColor.RED;
    grid[1].rows[3].selected = true;
    grid[1].rows[3].highlight = true;
    grid[2].rows[4].color = PlayerColor.RED;
    grid[2].rows[4].selected = true;
    grid[2].rows[4].highlight = true;
    grid[3].rows[5].color = PlayerColor.RED;
    grid[3].rows[5].selected = true;
    grid[3].rows[5].highlight = true;

    expect(findWinner(grid, PlayerColor.RED)).toBe(true);
  });

  test('findWinner returns false if gridMap has 4 consecutive downward diagonal values for different player.', () => {
    const grid = createGrid();
    grid[0].rows[2].color = PlayerColor.YELLOW;
    grid[0].rows[2].selected = true;
    grid[0].rows[2].highlight = true;
    grid[1].rows[3].color = PlayerColor.YELLOW;
    grid[1].rows[3].selected = true;
    grid[1].rows[3].highlight = true;
    grid[2].rows[4].color = PlayerColor.YELLOW;
    grid[2].rows[4].selected = true;
    grid[2].rows[4].highlight = true;
    grid[3].rows[5].color = PlayerColor.YELLOW;
    grid[3].rows[5].selected = true;
    grid[3].rows[5].highlight = true;

    expect(findWinner(grid, PlayerColor.RED)).toBe(false);
  });
});
