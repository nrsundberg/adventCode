lines = open("10/cpu.txt").read().splitlines()
cpu = {
    'cycle': 0,
    'X': 1,
    'strength': 0
    }
cycleCounter = {}
cyclesInterested = [20, 60, 100, 140, 180, 220]

for line in lines:
    cpu['cycle'] += 1
    cpu['strength'] = cpu['X'] * cpu['cycle']
    cycleCounter[cpu['cycle']] = cpu['strength']
    if line == 'noop':
        continue
    cpu['cycle'] += 1
    cpu['strength'] = cpu['X'] * cpu['cycle']
    cpu['X'] += int(line.split()[1])
    cycleCounter[cpu['cycle']] = cpu['strength']
sum(v for (x,v) in cycleCounter.items() if x in cyclesInterested)  