import re
lines = open("16/sample.txt").read().splitlines()

def createValves(lines):
    valves = {}
    for line in lines:
        valveNum = line.split()[1]
        flowRate = int(re.findall('[-]?[0-9]+', line)[0])
        if "lead to valves " in line:
            tunnelsTo = line.split("lead to valves ")[1].split(",")
            tunnelsTo = [ele.strip() for ele in tunnelsTo]
        else:
            tunnelsTo = line.split("leads to valve ")[1]
        valves[valveNum] = {
            'flowRate': flowRate,
            'tunnelsTo': tunnelsTo
        }
    return valves

valves = createValves(lines)

valvesOpen = set()
valveIn = 'AA'
valveToOpen = ''
def runLocator():
    for minute in range(0,30):
        global valveToOpen, valveIn, valvesOpen, valves
        print(valveToOpen)
        if valveToOpen != '':
            valvesOpen.add(tuple([valveToOpen]))
            valves[valveToOpen]['opened'] = minute + 1
            valveToOpen = ''
            continue
        flowRateFromPath = []
        print(valveIn)
        if (valveIn,) in valvesOpen or valves[valveIn]['flowRate'] == 0:
            for paths in valves[valveIn]['tunnelsTo']:
                if paths not in valvesOpen: 
                    flowRateFromPath.append([paths, valves[paths]['flowRate']])
            valveToOpen = sorted(flowRateFromPath, key= lambda x:x[1], reverse=True)[0][0]
            valveIn = valveToOpen
            continue
        valvesOpen.add(tuple([valveIn]))
        valves[valveIn]['opened'] = minute + 1
        valveToOpen = ''

runLocator()


# pressureReleased = 0
# for valve in valves:
#     flowRate = valves[valve]['flowRate']
#     minute = valves[valve]['opened']
#     pressureReleased += flowRate * minute
# pressureReleased