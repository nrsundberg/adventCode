lines = open('rps.txt').read().splitlines()
# Part 1
moves = {
    'A Z':3,'B X':1,'C Y':2,
    'C X':7, 'A Y':8, 'B Z':9,
    'A X':4, 'B Y':5, 'C Z':6
}
totalScore = 0 
for line in lines:
    totalScore += moves[line]
totalScore

# Part 2
identify = {
    'X': 0, 'Y': 1, 'Z': 2
}
different = {
    0: {'A':3,'B':1,'C':2},
    1: {'A':4,'B':5,'C':6},
    2: {'A':8,'B':9,'C':7}
}
totalScore = 0
for line in lines:
    totalScore += different[identify[line[2]]][line[0]]
totalScore
