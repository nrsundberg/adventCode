# numbers = open("20/sample.txt").read().split()
numbers = open("20/input.txt").read().split()

original = []
for index,number in enumerate(numbers):
    original.append((index, int(number)))

def moveNumber(indexOfMove, newList):
    setList = original[indexOfMove]
    movingListIndex = newList.index(setList)
    endingIndex = movingListIndex + setList[1]
    if endingIndex <= 0:
        endingIndex = (endingIndex - 1) % len(newList)
    elif endingIndex >= len(original) - 1:
        endingIndex = (endingIndex + 1) % len(newList) 
    del newList[movingListIndex]
    newList.insert(endingIndex, setList)
    return newList

toMove = original.copy()
for i in range(0, len(original)):
    toMove = moveNumber(i, toMove)

values = []
zeroIndex = [value[1] for value in toMove].index(0)
for c in range(1000,3001,1000):
    indexToUse = (zeroIndex + c) % len(toMove) 
    values.append(toMove[indexToUse])

sum([val[1] for val in values])