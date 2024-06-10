class Error(Exception):
    """Base class for exceptions in this module."""

    pass


class RequestTooLarge(Error):
    """Raised when a request is too large."""

    pass
