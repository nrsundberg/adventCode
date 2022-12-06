signal = open("06/signal.txt").read()
for i in range(0, len(signal)):
    if len(set(signal[i: i + 4])) == 4:
        print(i+4)
        break