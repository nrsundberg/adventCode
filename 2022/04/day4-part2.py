assignmentPairs = open("04/cleanup.txt").read().splitlines()
numberOfOverlappingPairs = 0
for pair in assignmentPairs:
    firstPairSplit = list(map(int,pair.split(",")[0].split("-")))
    secondPairSplit = list(map(int,pair.split(",")[1].split("-")))
    firstRange = range(firstPairSplit[0], firstPairSplit[1] + 1)
    secondRange = range(secondPairSplit[0], secondPairSplit[1] + 1)
    if any(num in secondRange for num in firstPairSplit) or any(num in firstRange for num in secondPairSplit):
        numberOfOverlappingPairs += 1
numberOfOverlappingPairs