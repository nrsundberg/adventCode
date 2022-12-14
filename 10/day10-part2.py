lines = open("10/cpu.txt").read().splitlines()

cpu = {
    'cycle': 0,
    'sprite': 2,
}

crt = {
    0:[], 1:[], 2:[], 3:[], 4:[], 5:[]
} 

def getCrtNum():
    num = cpu['cycle']
    if num in range(0,41):
        return 0, num
    elif num in range(41,81):
        return 1, num - 40
    elif num in range(81,121):
        return 2, num - 80
    elif num in range(121,161):
        return 3, num - 120
    elif num in range(161,201):
        return 4, num - 160
    elif num in range(201,241):
        return 5, num - 200

for line in lines:
    if cpu['cycle'] == 240:
        break
    cpu['cycle'] += 1
    crtNumber, cpuLineVal = getCrtNum()
    if cpuLineVal in range(cpu['sprite'] - 1, cpu['sprite'] + 2):
        crt[crtNumber].append("#")
    else:
        crt[crtNumber].append(".")
    if line == 'noop':
        continue
    cpu['cycle'] += 1
    crtNumber, cpuLineVal = getCrtNum()
    if cpuLineVal in range(cpu['sprite'] - 1, cpu['sprite'] + 2):
        crt[crtNumber].append("#")
    else:
        crt[crtNumber].append(".")
    cpu['sprite'] += int(line.split()[1])

for arr in crt:
    print(''.join(crt[arr]))