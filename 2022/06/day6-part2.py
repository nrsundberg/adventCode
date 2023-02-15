signal = open("06/signal.txt").read()
for i in range(0, len(signal)):
    if len(set(signal[i: i + 14])) == 14:
        print(i+14)
        break