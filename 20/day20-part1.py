# numbers = open("20/sample.txt").read().split()
numbers = open("20/input.txt").read().split()

original = {}
for index,number in enumerate(numbers):
    original[index] = int(number)


def getWrappedIndex(fullListObj, currentIndex):
    straightIndex = currentIndex + fullListObj[list(fullListObj.keys())[currentIndex]]
    # if straightIndex == 0:
    #     straightIndex = -1
    #     return straightIndex
    # elif straightIndex == len(fullListObj) - 1:
    #     straightIndex = 0
    #     return straightIndex
    # elif straightIndex >= len(fullListObj):
    #     straightIndex -= len(fullListObj) -1
        # return straightIndex
    straightIndex = (straightIndex + 1) % (len(fullListObj) - 1)
    return straightIndex

def makeMove(dictToMove, index):
    currentDict = dictToMove.copy()
    indexOfMovement = list(currentDict.keys()).index(index)
    indexOfEndingMovement = getWrappedIndex(currentDict, indexOfMovement)
    items = list(currentDict.copy().items())
    del items[indexOfMovement]
    items.insert(indexOfEndingMovement, (index, currentDict[index]))
    currentDict = dict(items)
    return currentDict

toMove = original.copy()
for i in range(0, len(original)):
    toMove = makeMove(toMove, i)


repeatedList = list(toMove.values()) * 2
val = repeatedList.index(0)
repeatedList[val + 1000] + repeatedList[val + 2000] + repeatedList[val + 3000]
# -2079
# -8678
# -8570
# -21638