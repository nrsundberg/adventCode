lines = open('03/rucksack.txt').read().splitlines()
groups = []
for i in range(0, len(lines), 3):
    groups.append(lines[i: i+3])
priorityGroup = 0
for group in groups:
    for char in group[0]:
        inSecond = char in group[1] and char in group[2]
        if inSecond:
            priorityGroup += ord(char) - (38 if char.isupper() else 96)
            break
priorityGroup