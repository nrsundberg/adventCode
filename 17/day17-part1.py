# Rocks
lines = open("17/sample.txt").read().splitlines()
# Jet Moves
path = open("17/pathSample.txt").read()

def makeRockObject(lines):
    rocks = {}
    shapeHolder = {}
    rockHolder = {}
    rowNum = 0
    rockNum = 0
    for line in lines:
        if line == '':
            rocks[rockNum] = rockHolder
            rockHolder = {}
            rowNum = 0
            rockNum += 1
        else:
            for index,ele in enumerate(line):
                if ele == '.':
                    continue
                shapeHolder[index + 2] = ele
            rockHolder[rowNum] = shapeHolder
            rowNum += 1
            shapeHolder = {}
            # linedList = list(map(lambda x: x.replace('.',''),list(line)))
            # shapeHolder[rowNum]
    return rocks

def adjustChamber (rockObj, chamberList):
    chamberRow = ['','','','','','','']
    chamber = chamberList.copy()
    try:
        heightOfAvailChamber = ['#' in sublist for sublist in chamberList].index(True)
    except:
        heightOfAvailChamber = len(chamberList) 
    if heightOfAvailChamber < len(rockObj) + 3:
        for i in range(0, len(rockObj) + 3 - heightOfAvailChamber):
            chamber.insert(0, chamberRow)
    return chamber

def initalPlacement(rockObj, chamberList):
    chamber = chamberList.copy()
    for i in range(0, len(rockObj)):
        row = chamber[i].copy()
        for ele in rockObj[i]:
            row[ele] = '#'
        chamber[i] = row
    return chamber
# make jet movement to the rock obj

def moveRock(rockObj, chamberList, moves, movesIndex):
    chamber = chamberList.copy()
    
    return chamber, movesIndex

# check doesnt hit wall or another rock

# make movement
rocks = makeRockObject(lines)
chamber = []
newRock = rocks[0].copy()
chamber = adjustChamber(newRock, chamber)
chamber = initalPlacement(newRock, chamber)
chamber


newRock = rocks[1].copy()
chamber = adjustChamber(newRock, chamber)
chamber = initalPlacement(newRock, chamber)
chamber
