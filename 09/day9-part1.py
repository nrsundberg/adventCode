import numpy as np
# lines = open("09/sample.txt").read().splitlines()
lines = open("09/moves.txt").read().splitlines()
# Create dictionary with moves
moves = {}
for index,line in enumerate(lines):
    direction, spacesMoved = line.split()
    moves[index] = {'direction': direction,
                    'spacesMoved': int(spacesMoved)}

head, tail = np.array([1,0]), np.array([0,0])
spacesTouchedByTail = set()

def moveHead(move, piece):
    if move['direction'] == 'R':
        piece[0] += move['spacesMoved']
        return
    elif move['direction'] == 'L':
        piece[0] -= move['spacesMoved']
        return
    if move['direction'] == 'U':
        piece[1] += move['spacesMoved']
        return
    elif move['direction'] == 'D':
        piece[1] -= move['spacesMoved']
        return

def moveTail(headToTailDifference, tail):
    # Correct for not being in same row or column
    if all(diff != 0 for diff in headToTailDifference):
        # diagonal movement
        tail[0] += (1 if headToTailDifference[0] > 0 else -1)
        tail[1] += (1 if headToTailDifference[1] > 0 else -1)
        spacesTouchedByTail.add(f"${tail}")
        return
    for index,difference in enumerate(headToTailDifference):
        if difference not in range(-1, 2):
            tail[index] += (1 if headToTailDifference[index] > 0 else -1)
    spacesTouchedByTail.add(f"${tail}")

for moveItem in moves:
    move = moves[moveItem]
    moveHead(move, head)
    headToTailDifference = np.subtract(head, tail)
    isNotTouching = any(difference for difference in headToTailDifference if difference not in range(-1, 2))
    while isNotTouching:
        moveTail(headToTailDifference, tail)
        headToTailDifference = np.subtract(head, tail)
        isNotTouching = any(difference for difference in headToTailDifference if difference not in range(-1, 2))
print(len(spacesTouchedByTail))