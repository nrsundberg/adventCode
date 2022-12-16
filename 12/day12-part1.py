import numpy
import time

lines = open("12/map.txt").read().splitlines()
grid = []
for line in lines:
    grid.append(list(line))
for index,row in enumerate(grid):
    for rowIndex,item in enumerate(row):
        if item == 'S' or item == 'E':
            continue
        grid[index][rowIndex] = ord(item) - 96 

def findStartingPiece(grid):
    for index,row in enumerate(grid):
        for colIndex,column in enumerate(row):
            if column == 'S':
                return [index, colIndex]

def edgePiece(startingPositionRow, startingPositionColumn):
    # 0 Left, 1 Right, 2 Up, 3 Down
    piece = {'0': True, '1': True, '2': True, '3': True}
    # Changes to the position based on the four directions
    pieceCheck = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    cord = numpy.array([startingPositionRow, startingPositionColumn])
    for index,direction in enumerate(pieceCheck):
        toCheck = cord + numpy.array(direction)
        if any(toCheck < 0) or toCheck[0] >= len(grid) or toCheck[1] >= len(grid[0]):
            piece[str(index)] = False
        else:
            piece[str(index)] = True
    return piece

def startingMoves(startingPiece, piece):
    directionalMoves = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    for direction in [direction for (direction,values) in piece.items() if values is True]:
        newPosition = numpy.array(startingPiece) + numpy.array(directionalMoves[int(direction)])
        if grid[newPosition[0]][newPosition[1]] - 1 in range(0,2):
            movesList.append([newPosition])

def alreadyInPath(previousMoves, lastMove, piece):
    pieceToChange = piece.copy()
    directionalMoves = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    for direction in [direction for (direction,values) in piece.items() if values is True]:
        newPosition = numpy.array(lastMove) + numpy.array(directionalMoves[int(direction)])
        if numpy.any(numpy.all(newPosition == previousMoves, axis = 1)):
            pieceToChange[str(direction)] = False
    return pieceToChange

def nextMoves(movesList):
    global gameWon
    directionalMoves = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    newMoves = []
    for i in range(0, len(movesList)):
        lastMove = movesList[i][-1]
        piece = edgePiece(lastMove[0], lastMove[1])
        piece = alreadyInPath(movesList[i], lastMove, piece)
        for direction in [direction for (direction,values) in piece.items() if values is True]:
            newOrder = []
            newPosition = numpy.array(lastMove) + numpy.array(directionalMoves[int(direction)])
            newPositionValue = grid[newPosition[0]][newPosition[1]]
            lastMoveValue = grid[lastMove[0]][lastMove[1]]
            if newPositionValue == 'E':
                if lastMoveValue != 26:
                    continue
                gameWon = True
                newOrder = movesList[i] + [newPosition]
                newMoves.append(newOrder)
                return newOrder               
            if newPositionValue - lastMoveValue <= 1:
                newOrder = movesList[i] + [newPosition]
                newMoves.append(newOrder)
    return newMoves                

# grid[startingPiece[0]][startingPiece[1]] = 'S'
movesList = []   
gameWon = False
startingPiece = findStartingPiece(grid)
piece = edgePiece(startingPiece[0], startingPiece[1])
startingMoves(startingPiece, piece)
grid[startingPiece[0]][startingPiece[1]] = 999
while gameWon == False:
    start = time.time()
    movesList = nextMoves(movesList)
    end = time.time()
    print(f"There are {len(movesList)} possible solutions and they are {len(movesList[0])} moves deep. It took {end - start} seconds to complete this loop.")
len(movesList)
