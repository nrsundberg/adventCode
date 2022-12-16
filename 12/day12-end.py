import numpy
lines = open("12/map copy.txt").read().splitlines()
# for line in lines:
#     grid.append(list(line))
# for index,row in enumerate(grid):
#     for rowIndex,item in enumerate(row):
#         if item == 'S' or item == 'E':
#             continue
#         grid[index][rowIndex] = ord(item) - 96 
# grid
grid = []
for observation in lines[0]:
    grid.append(ord(observation) - 96)
grid