def str2arr(string, delimiter=","):
    return string.split(delimiter)


def elems2int(lst):
    return list(map(int, lst))


def ids2arr(string):
    return elems2int(str2arr(string))
