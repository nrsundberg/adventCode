import re
lines = open("05/crateAndMoves.txt").read().splitlines()
crates = lines[0:lines.index("") -1]
moves = lines[lines.index("") + 1:]

cratesCleaned = [crateStack.replace("[","").replace("]","").replace("    ", ",").replace(" ", ",") for crateStack in crates]
transposedCrates = list(map(list,list(zip(*[list(crateRow.split(",")) for crateRow in cratesCleaned]))))
cratesCleaned = [[crate for crate in crateStack if crate] for crateStack in transposedCrates]

def moveCrates(movesList, crateList, reverse = True):
    for move in movesList:
        numCratesToMove, crateColumnFrom, crateColumnTo = list(map(int, re.findall('[0-9]+', move)))    
        cratesToMoveReversed = crateList[crateColumnFrom - 1][0:numCratesToMove]
        if reverse:
            cratesToMoveReversed.reverse()
        newCrateFromColumn = crateList[crateColumnFrom - 1][numCratesToMove:]
        newCrateToColumn = cratesToMoveReversed + crateList[crateColumnTo - 1]
        crateList[crateColumnFrom - 1], crateList[crateColumnTo - 1] = newCrateFromColumn, newCrateToColumn
    return ''.join([crateStack[0] for crateStack in crateList if len(crateStack) > 0 ])
# Part 1
moveCrates(moves, cratesCleaned.copy())
#  Part 2
moveCrates(moves, cratesCleaned.copy(), reverse=False)