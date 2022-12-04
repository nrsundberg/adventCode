lines = open('02/rps.txt').read().splitlines()
different = {
    'X': {'A':3,'B':1,'C':2},
    'Y': {'A':4,'B':5,'C':6},
    'Z': {'A':8,'B':9,'C':7}
}
totalScore = 0
for line in lines:
    totalScore += different[line[2]][line[0]]
totalScore