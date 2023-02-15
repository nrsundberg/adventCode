# lines = open("07/sample.txt").read().splitlines()
lines = open("07/directory.txt").read().splitlines()

allDirectories = list(set(line for line in lines if "dir " in line))
directoryFromRoot = {'/': lines[lines.index("$ cd /") + 2: lines[lines.index("$ cd /") + 2:].index("$ ls") + lines.index("$ cd /") + 2] }

startingLength,endingLength = 0,1
# Run till len doesn't go up
while startingLength != endingLength:
    startingLength = len(directoryFromRoot)
    for dir in [listEle for dir in directoryFromRoot.values() for listEle in dir if "dir " in listEle]:
        startVal = lines.index("$ cd " + dir.split()[1]) + 2
        try: 
            endVal = lines[startVal:].index("$ ls") + startVal
        except:
            endVal = len(lines) + 1
        directoryFromRoot[dir] = lines[startVal: endVal]
    for dir in directoryFromRoot.keys():
        directoryFromRoot[dir] = [subItem for subItem in directoryFromRoot[dir] if "$ cd" not in subItem]
    endingLength = len(directoryFromRoot)

directory = directoryFromRoot.copy()

while len([x for v in directory.values() for x in v if "dir " in x]) > 0 :
    for dir in list(reversed([dir for dir in directory.copy().keys()])):
        for item in directory.copy()[dir]:
            listToReplace = []
            directory[dir].remove(item)
            listToReplace = directory[dir]        
            if item[0:4] == 'dir ':
                listToReplace.extend(directory[item])
            else:
                listToReplace.append(item)
            directory[dir] = listToReplace

dirSize = {}
for dir in directory.keys():
    totalSize = sum(list(map(int, [file.split()[0] for file in directory[dir]])))
    dirSize[dir] = totalSize

sum({dir:size for (dir,size) in dirSize.items() if size <= 100000 }.values())
# 1506697 wrong
# 1158864 wrong