lines = open('02/rps.txt').read().splitlines()
moves = {
    'A Z':3,'B X':1,'C Y':2,
    'C X':7, 'A Y':8, 'B Z':9,
    'A X':4, 'B Y':5, 'C Z':6
}
totalScore = 0 
for line in lines:
    totalScore += moves[line]
totalScore