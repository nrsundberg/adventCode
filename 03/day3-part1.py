lines = open('03/rucksack.txt').read().splitlines()
priority = 0
for line in lines:
    splitIndex = len(line)//2
    firstHalf = line[0:splitIndex]
    secondHalf = line[splitIndex:]
    for char in firstHalf:
        inSecond = char in secondHalf
        if inSecond:
            priority += ord(char) - (38 if char.isupper() else 96)
            break
priority