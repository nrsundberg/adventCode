lines = open('01/calories.txt').read().splitlines()
# Part 1
calories = []
caloriesCounted = 0
for line in lines:
    if line == "":
        calories.append(caloriesCounted)
        caloriesCounted = 0
    else:
        caloriesCounted += int(line)
    if line == lines[len(lines)-1]:
        calories.append(int(caloriesCounted))
sorted(calories, reverse= True)[0]
# Part 2
sum(sorted(calories, reverse= True)[0:3])