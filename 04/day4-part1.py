assignmentPairs = open("04/cleanup.txt").read().splitlines()
numberOfOverlappingPairs = 0
for pair in assignmentPairs:
    firstPairSplit = list(map(int,pair.split(",")[0].split("-")))
    secondPairSplit = list(map(int,pair.split(",")[1].split("-")))
    if firstPairSplit[0] <= secondPairSplit[0] and firstPairSplit[1] >= secondPairSplit[1]:
        numberOfOverlappingPairs += 1
        continue
    if secondPairSplit[0] <= firstPairSplit[0] and secondPairSplit[1] >= firstPairSplit[1]:
        numberOfOverlappingPairs += 1
numberOfOverlappingPairs