lines = open('rucksack.txt').read().splitlines()
# Part 1
priority = 0
for line in lines:
    splitIndex = len(line)//2
    firstHalf = line[0:splitIndex]
    secondHalf = line[splitIndex:]
    for char in firstHalf:
        isUpperCase = char.isupper()
        inSecond = char in secondHalf
        if inSecond:
            if isUpperCase:
                priority += ord(char) - 38
            else:
                priority += ord(char) - 96
            break
priority
# Part 2
groups = []
for i in range(0, len(lines), 3):
    groups.append(lines[i: i+3])
priorityGroup = 0
for group in groups:
    for char in group[0]:
        isUpperCase = char.isupper()
        inSecond = char in group[1] and char in group[2]
        if inSecond:
            if isUpperCase:
                priorityGroup += ord(char) - 38
            else:
                priorityGroup += ord(char) - 96
            break
priorityGroup