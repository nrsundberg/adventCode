lines = open("05/crateAndMoves.txt").read().splitlines()
crates = lines[0:lines.index("") -1]
moves = lines[lines.index("") + 1:]

cratesCleaned = []
for crateStack in crates:
    cratesCleaned.append(crateStack.replace("[","").replace("]","").replace("    ", ",").replace(" ", ","))
cratesCleaned

cratesCleanedNew = []
for i in range(0,len(cratesCleaned) + 1):
    columnHolder = list()
    for c in range(0, len(cratesCleaned)):
        val = cratesCleaned[c].split(",")[i]
        val = ''.join(val)
        val = val.strip()
        columnHolder.append(val)
    cratesCleanedNew.append(columnHolder)
cratesCleaned = [list(''.join(ele)) for ele in cratesCleanedNew]

def moveCrates(numCratesToMove, crateColumnFrom, crateColumnTo):
    cratesToMoveReversed = cratesCleaned[int(crateColumnFrom) - 1][0:int(numCratesToMove)]
    cratesToMoveReversed.reverse()
    newCrateFromColumn, newCrateToColumn = cratesCleaned[int(crateColumnFrom) - 1][int(numCratesToMove):], cratesToMoveReversed + cratesCleaned[int(crateColumnTo) - 1]
    cratesCleaned[int(crateColumnFrom) - 1], cratesCleaned[int(crateColumnTo) - 1] = newCrateFromColumn, newCrateToColumn

for move in moves:
    moveCrates(move.split(" ")[1], move.split(" ")[3], move.split(" ")[5])

finalAnswer = []
for crateColumn in cratesCleaned:
    try:
        finalAnswer.append(crateColumn[0])
    except:
        continue
''.join(finalAnswer)