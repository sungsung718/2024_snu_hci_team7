import threading
from typing import Callable


def timeout(func: Callable):
    """
    Decorator to add timeout to a function.
    To apply timeout, function calls should include a keyword argument `timeout`.
    If the function does not return before the timeout, a TimeoutError is raised.
    Note that the return value of the function will be ignored, and it has to be stored properly in a shared object.
    """

    def timeout_handler(signum, frame):
        raise TimeoutError("GPT API call failed")

    def timeout_wrapper(*args, **kwargs):
        if "timeout" not in kwargs:
            raise ValueError("timeout argument required")
        seconds = kwargs.pop("timeout")
        assert seconds is None or isinstance(
            seconds, (int, float)
        ), f"wrong type for timeout: {type(seconds)}"

        result = []
        error = []

        def target():
            try:
                result.append(func(*args, **kwargs))
            except Exception as e:
                error.append(e)

        thread = threading.Thread(target=target)
        thread.start()
        thread.join(timeout=seconds)

        if thread.is_alive():
            raise TimeoutError("Function timed out")

        if error:
            raise error[0]

        return result[0]

    return timeout_wrapper
