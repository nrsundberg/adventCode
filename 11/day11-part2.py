import re
import operator
# import math
# lines = open("11/monkey.txt").read().splitlines()
lines = open("11/sample.txt").read().splitlines()
monkeys = {}
monkeyItems = {}
def getNumberFromLine(lineIndex, lineIndexAdd, listOfNumbers = False):
    nums = re.findall('[0-9]+', lines[lineIndex + lineIndexAdd])
    if listOfNumbers:
        nums = list(map(int, nums))
    else:
        nums = int(nums[0])
    return nums

for i in range(0, len(lines), 7):
    monkeys[int(lines[i].split()[1][:-1])] = {
        'items': getNumberFromLine(i, 1, listOfNumbers=True),
        'operation': lines[i + 2].split("new = ")[1],
        'test': {
            'check': getNumberFromLine(i, 3),
            'true': getNumberFromLine(i, 4),
            'false': getNumberFromLine(i, 5)
        }
    }
    monkeyItems[int(lines[i].split()[1][:-1])] = 0

ops = {
    '+' : operator.add,
    '-' : operator.sub,
    '*' : operator.mul,
    '/' : operator.floordiv, 
    '^' : operator.xor,
}

# for i in range(0, 10000):
for i in range(0, 20):
    for monkeyKey in monkeys:
        monkey = monkeys[monkeyKey]
        val1, operand, val2 = monkey['operation'].split()
        checkModulus = monkey['test']['check']
        if len(monkey['items']) == 0:
            continue
        monkeyItems[monkeyKey] += len(monkey['items'])
        for item in monkey['items'].copy():
            if val2 == 'old':
                newValue = item
                # newValue = ops[operand](item, item)
            else:
                newValue = ops[operand](item, int(val2))
            if newValue % checkModulus == 0:
                monkeys[monkey['test']['true']]['items'].append(newValue)
            else:
                monkeys[monkey['test']['false']]['items'].append((newValue % checkModulus))
            monkey['items'].remove(item)
monkeyItems
topTwo = sorted([inspected for inspected in monkeyItems.values()], reverse=True)[0:2]
topTwo[0] * topTwo[1]
# FAIL