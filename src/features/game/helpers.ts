type GridLocation = [string, { selected: boolean }];

export const getGridLocationsMap = () => {
  const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  const rows = [1, 2, 3, 4, 5, 6];
  const gridLocations: GridLocation[] = [];

  for (const col of cols) {
    for (const row of rows) {
      if (col === 'a' && row === 1) {
        gridLocations.push([`${col}${row}`, { selected: true }]);
      } else {
        gridLocations.push([`${col}${row}`, { selected: false }]);
      }
    }
  }

  return new Map<string, { selected: boolean }>(gridLocations);
};
