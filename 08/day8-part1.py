lines = open("08/forest.txt").read().splitlines()
rows = []
# Split lines in to single trees
for line in lines:
    rows.append([*line])
# Transpose rows to get columns
columns = list(map(list,zip(*rows)))

def getTreesToEdge(rowIndex, treeIndex):
    # Take some tree and return the height of all trees between it and the edge
    surroundingRowLeft, surroundingRowRight = list(map(int, rows[rowIndex][:treeIndex])), list(map(int, rows[rowIndex][treeIndex + 1:]))
    surroundingColumnTop, surroundingColumnBottom  = list(map(int, columns[treeIndex][:rowIndex])), list(map(int, columns[treeIndex][rowIndex + 1:]))
    surroundingTrees = [max(surroundingRowLeft), max(surroundingRowRight), max(surroundingColumnTop), max(surroundingColumnBottom)]
    return surroundingTrees 

def totalEdgeTrees(rowTreeFormat, columnTreeFormat):
    perimeter = 2 * (len(rowTreeFormat[0]) + len(columnTreeFormat[0]))
    # Adjust for overlapping corners
    perimeter -= 4
    return perimeter

visibleTrees = 0
for row in range(1, len(rows) - 1):
    for tree in range(1, len(rows[row]) - 1):
        surroundingTrees = getTreesToEdge(row, tree)
        if any(max < int(rows[row][tree]) for max in surroundingTrees):
            visibleTrees += 1
visibleTrees + totalEdgeTrees(rows, columns)

