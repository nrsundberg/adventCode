import re
import numpy as np
import pandas as pd
lines = open("15/sample.txt").read().splitlines()
# lines = open("15/input.txt").read().splitlines()
sensors = {}
pointsTouchedByAllSensors = set()
for index,line in enumerate(lines):
    cords = list(map(int,re.findall('[-]?[0-9]+', line)))
    sensor, beacon = cords[0:2], cords[2:]
    sensors[index] = {
        'sensor': {
            'x': sensor[0],
            'y': sensor[1]
        },
        'beacon': {
            'x': beacon[0],
            'y': beacon[1]
        }
    }

def getDistanceToBeacon(sensor):
    xS, yS = [values for values in sensor['sensor'].values()]
    xB, yB = [values for values in sensor['beacon'].values()]
    # return sum of total distance to beacon
    distance = np.sum(np.abs(np.subtract(np.array([xS, yS]), np.array([xB, yB]))))
    return distance

def getFurthestPoints(distance, sensor):
    # left, right, up, down
    directions = [[1,0], [-1,0], [0,1], [0,-1]]
    furthestPoints = {}
    sensorCord = [sensor['sensor']['x'], sensor['sensor']['y']]
    for index,direction in enumerate(directions):
        point = np.add(np.multiply(distance, direction), sensorCord)
        furthestPoints[index] = point
    return furthestPoints

def perimeter(furthestPoints):
    # furthest points 0-right 1-left 2-down 3-up
    distanceComparisions = [[3,1], [1,2], [0,2], [3,0]]
    pointsTouched = []
    for index,direction in enumerate(distanceComparisions):
        left, right = furthestPoints.copy()[direction[0]], furthestPoints[direction[1]]
        numOfCrossPoints = np.abs(np.subtract(left, right))
        for i in range(0, numOfCrossPoints[0]):
            y = left[1] + (i + 1)
            if index % 2 == 0:
                x = left[0] - (i + 1)
            else:
                x = left[0] + (i + 1)
            pointsTouched.append([x, y])
    return pointsTouched

def insideArea(perimeterPoints, furthestPoints):
    allPointsTouched = []
    groupings = sorted(list(map(list,perimeterPoints)), key=lambda x: x[1])
    # groupings = list(map(list, [point for point in perimeterPoints if point[1] == i ]))
    for i in range(0, len(groupings), 2):
        left, right = groupings[i], groupings[i + 1]
        allPointsTouched.append(left)
        allPointsTouched.append(right)
        for c in range(1, abs(left[0] - right[0])):
            x = left[0] + (c if left[0] < right[0] else -c)
            y = left[1]
            allPointsTouched.append([x,y])
    allPointsTouched.append(furthestPoints[2])
    allPointsTouched.append(furthestPoints[3])
    return allPointsTouched

def makeGrid(i):
    grid = []
    # for c in range(0, 4000001):
    for c in range(0, 21):
        grid.append([c,i])
    return grid

# rangeNeeded = pd.Interval(0, 4000001)
rangeNeeded = pd.Interval(0, 21)
for sen in sensors.copy():
    sensor = sensors[sen]
    distance = getDistanceToBeacon(sensor)
    furthestPoints = getFurthestPoints(distance, sensor)
    rangeOfSensorY = pd.Interval(furthestPoints[3][1], furthestPoints[2][1] + 1)
    if rangeOfSensorY.overlaps(rangeNeeded) == False:
        del sensors[sen]
    rangeOfSensorX = pd.Interval(furthestPoints[1][0], furthestPoints[0][0] + 1)
    if rangeOfSensorX.overlaps(rangeNeeded) == False:
        del sensors[sen]
    pointsTouched = perimeter(furthestPoints)
    allPoints = insideArea(pointsTouched, furthestPoints)
    sensors[sen]['all points'] = set(map(tuple, allPoints))

# for i in range (0, 4000001):
for i in range (0, 21):
    grid = makeGrid(i)
    for sen in sensors:
        for point in sensors[sen]['all points'].copy():
            if point in grid:
                if point == (14,11):
                    print(sen, point)
                grid.remove(point)
                sensors[sen]['all points'].remove(point)
            if point[1] < i:
                sensors[sen]['all points'].remove(point)
            # if len(grid[0:5]) == 0:
            #     break
    if len(grid) == 1:
        print(grid)
        break

# make a larger grid


sensors[0]['all points'].remove((6,18))