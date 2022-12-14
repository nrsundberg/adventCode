import numpy as np
# lines = open("09/sample.txt").read().splitlines()
lines = open("09/moves.txt").read().splitlines()
# Create dictionary with moves
moves = {}
for index,line in enumerate(lines):
    direction, spacesMoved = line.split()
    moves[index] = {'direction': direction,
                    'spacesMoved': int(spacesMoved)}

head = np.array([1,0])
tail = {
    1: np.array([1,0]),
    2: np.array([1,0]),
    3: np.array([1,0]),
    4: np.array([1,0]),
    5: np.array([1,0]),
    6: np.array([1,0]),
    7: np.array([1,0]),
    8: np.array([1,0]),
    9: np.array([1,0])
}
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

def moveTail(tail):
    # Correct for not being in same row or column
    isNotTouching = notTouching()
    # print(isNotTouching)
    while isNotTouching:
        for tails in tail:
            if tails == 9 and np.all(tail[9] == [1,0]):
                spacesTouchedByTail.add(f"${tail[tails]}")
            tailDifference = getTailDifference(tails)
            isTouchingNextTail = notTouching(tailDifference, single=True) is not True
            if isTouchingNextTail:
                continue
            # print(tailDifference, isTouchingNextTail)
            if all(diff != 0 for diff in tailDifference):
                    # diagonal movement
                tail[tails][0] += (1 if tailDifference[0] > 0 else -1)
                tail[tails][1] += (1 if tailDifference[1] > 0 else -1)
                if tails == 9:
                    spacesTouchedByTail.add(f"${tail[tails]}")
                continue
            for index,difference in enumerate(tailDifference):
                if difference not in range(-1, 2):
                    tail[tails][index] += (1 if tailDifference[index] > 0 else -1)
                if tails == 9:
                    spacesTouchedByTail.add(f"${tail[tails]}")
        isNotTouching = notTouching()
        # print(isNotTouching)

def getTailDifference(tails):
    if tails == 1:
        tailDifference = np.subtract(head, tail[tails])
    else:
        tailDifference = np.subtract(tail[tails - 1], tail[tails])
    return tailDifference

def notTouching(tailDiff = None, single = False):
    if single:
        isNotTouching = any(difference for difference in tailDiff if difference not in range(-1, 2))
        return isNotTouching
    tailDifferences = []
    for tails in tail:
        if tails == 1:
            tailDifferences.append(np.subtract(head, tail[tails]))
            continue
        tailDifferences.append(np.subtract(tail[tails - 1], tail[tails]))
    isNotTouching = any(difference for subList in tailDifferences for difference in list(subList) if difference not in range(-1, 2)) 
    return isNotTouching

for move in moves:
    actualMove = moves[move]
    moveHead(actualMove, head)
    moveTail(tail)
print(len(spacesTouchedByTail))