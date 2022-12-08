import numpy
lines = open("08/forest.txt").read().splitlines()
# lines = open("08/sample.txt").read().splitlines()
rows = []
# Split lines in to single trees
for line in lines:
    rows.append([*line])
# Transpose rows to get columns
columns = list(map(list,zip(*rows)))

def getTreesToEdge(rowIndex, treeIndex):
    # Reverse lists for left and top because the array needs to be from tree in question -> edge
    surroundingRowLeft, surroundingRowRight = list(reversed(list(map(int, rows[rowIndex][:treeIndex])))), list(map(int, rows[rowIndex][treeIndex + 1:]))
    surroundingColumnTop, surroundingColumnBottom  = list(reversed(list(map(int, columns[treeIndex][:rowIndex])))), list(map(int, columns[treeIndex][rowIndex + 1:]))
    surroundingTrees = [surroundingRowLeft, surroundingRowRight, surroundingColumnTop, surroundingColumnBottom]
    return surroundingTrees 

scenicScore = []
# for all interior rows
for row in range(1, len(rows) - 1):
    # for all trees not in the first or last position i.e. borders
    for tree in range(1, len(rows[row]) - 1):
        surroundingTrees = getTreesToEdge(row, tree)
        score = []
        # return an array of number of trees out from the current tree in all directions
        for direction in surroundingTrees:
            runningTally = 0
            for i in range(0, len(direction)):
                runningTally += 1
                if i == len(direction) - 1:
                    score.append(runningTally)
                    break
                if direction[i] < int(rows[row][tree]):
                    continue
                else:
                    score.append(runningTally)
                    break
        # Array product
        scenicScore.append(numpy.prod(score))
max(scenicScore)