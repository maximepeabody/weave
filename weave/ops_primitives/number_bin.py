import bisect
import typing
import numpy as np

from ..api import type, op


@type()
class NumberBin:
    id: int
    start: float
    stop: float


@op()
def number_bins_equal(
    min: float, max: float, n_bins: int
) -> typing.Callable[[float], typing.Optional[NumberBin]]:
    bins = np.linspace(min, max, n_bins + 1)
    number_bins = [NumberBin(i, bins[i], bins[i + 1]) for i in range(len(bins) - 1)]

    def assign_bin(val: float) -> typing.Optional[NumberBin]:
        if val > bins[-1] or val < bins[0]:
            return None
        index = bisect.bisect_left(bins, val)
        return number_bins[index]

    return assign_bin
