import random

import pytest

from weave.trace import refs
from weave.trace_server import refs_internal
from weave.weave_client import sanitize_object_name

quote = refs_internal.extra_value_quoter


def test_isdescended_from():
    a = refs.ObjectRef(entity="e", project="p", name="n", digest="v", extra=["x1"])
    b = refs.ObjectRef(
        entity="e", project="p", name="n", digest="v", extra=["x1", "x2"]
    )
    assert a.is_descended_from(b) == False
    assert b.is_descended_from(a) == True


def string_with_every_char(disallowed_chars=[]):
    char_codes = list(range(256))
    random.shuffle(char_codes)
    return "".join(chr(i) for i in char_codes if chr(i) not in disallowed_chars)


def test_ref_parsing_external_invalid():
    ref_start = refs.ObjectRef(
        entity="entity",
        project="project",
        name=string_with_every_char(),
        digest="1234567890",
        extra=("key", string_with_every_char()),
    )

    ref_str = ref_start.uri()
    with pytest.raises():
        refs.parse_uri(ref_str)


def test_ref_parsing_external_sanitized():
    ref_start = refs.ObjectRef(
        entity="entity",
        project="project",
        name=sanitize_object_name(string_with_every_char()),
        digest="1234567890",
        extra=("key", string_with_every_char()),
    )

    ref_str = ref_start.uri()
    exp_ref = f"{refs_internal.WEAVE_SCHEME}:///{ref_start.entity}/{ref_start.project}/object/{ref_start.name}:{ref_start.digest}/{ref_start.extra[0]}/{quote(ref_start.extra[1])}"
    assert ref_str == exp_ref

    parsed = refs.parse_uri(ref_str)
    assert parsed == ref_start


def test_ref_parsing_internal_invalid():
    ref_start = refs_internal.InternalObjectRef(
        project_id="project",
        name=string_with_every_char(),
        version="1234567890",
        extra=("key", string_with_every_char()),
    )

    ref_str = ref_start.uri()
    with pytest.raises():
        refs.parse_uri(ref_str)


def test_ref_parsing_internal_sanitized():
    ref_start = refs_internal.InternalObjectRef(
        entity="entity",
        project_id="project",
        name=sanitize_object_name(string_with_every_char()),
        version="1234567890",
        extra=("key", string_with_every_char()),
    )

    ref_str = ref_start.uri()
    exp_ref = f"{refs_internal.WEAVE_INTERNAL_SCHEME}:///{ref_start.project_id}/object/{ref_start.name}:{ref_start.digest}/{ref_start.extra[0]}/{quote(ref_start.extra[1])}"
    assert ref_str == exp_ref

    parsed = refs.parse_uri(ref_str)
    assert parsed == ref_start
