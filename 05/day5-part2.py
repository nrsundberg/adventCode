crates = open("05/crates.txt").read().splitlines()
moves = open("05/craneMoves.txt").read().splitlines()

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
cratesCleaned = [''.join(ele) for ele in cratesCleanedNew]
cratesCleanedNew = [list(ele) for ele in cratesCleaned]
cratesCleaned = cratesCleanedNew

def moveCrates(numCratesToMove, crateColumnFrom, crateColumnTo):
    cratesToMoveReversed = cratesCleaned[int(crateColumnFrom) - 1][0:int(numCratesToMove)]
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