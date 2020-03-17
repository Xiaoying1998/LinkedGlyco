from flask import json, jsonify
from server.app import app


def test_app_return_entities():

    get_response = app.test_client().get('/')
    get_response_data = json.loads(get_response.get_data(as_text=True))

    assert get_response.status_code == 200
    assert get_response_data[0]['id'] == 'http://purl.uniprot.org/uniprot/Q8N0V5'
    assert get_response_data[0]['sentence_id'] == '040aba4fa2494fc1ab909cb22ff5d7f8'
    assert get_response_data[0]['surface_form'] == 'N-acetylglucosaminyltransferase'


def test_app_return_result():
    result_str = '<mark class="protein"><mark class="protein">P-</mark>selectin glycoprotein ligand-1</mark>, ' \
                 '<mark class="protein">PSGL-1</mark>, a specific ligand for <mark class="protein">P-</mark>, ' \
                 '<mark class="protein">E-</mark>, and <mark class="protein">L-selectin</mark>, was isolated from in ' \
                 'vivo ' \
                 '<mark class="cell-line">[3H]-glucosamine labeled HL-60 cells</mark> by a combination of ' \
                 'wheat germ agglutinin and platelet <mark class="protein">P-</mark>selectin- or <mark ' \
                 'class="protein">E-</mark>selectin receptor globulin-agarose chromatography. '

    post_response = app.test_client().post(
        '/result',
        data=json.dumps({'entity1': 'HL-60', 'entity2': 'PSGL-1', 'verb': 'isolate'}),
        content_type='application/json',
    )

    data = json.loads(post_response.get_data(as_text=True))
    test_result = data[0]['sentence']
    test_result = test_result.strip()
    result_str = result_str.strip()

    assert post_response.status_code == 200
    assert data[0]['type'] == 2
    assert data[0]['relation'] == 'ELABORATION'
    assert test_result == result_str


def test_app_return_more_result():
    result_str = 'The percentage of this <mark class="RNA">mRNA</mark> containing the truncated ORF out of the total ' \
                 'population of CMP-NeuAc hydroxylase <mark class="R' \
                 'NA">mRNA</mark> in various mouse tissues was about 10-25%.'

    post_response = app.test_client().post(
        '/result',
        data=json.dumps({'entity1': 'mRNA', 'entity2': '', 'verb': ''}),
        content_type='application/json',
    )

    data = json.loads(post_response.get_data(as_text=True))
    test_result = data[0]['sentence']
    test_result = test_result.strip()
    result_str = result_str.strip()

    assert post_response.status_code == 200
    assert data[0]['type'] == 3
    assert data[0]['relation'] == 'UNKNOWN_SUBORDINATION'
    assert test_result == result_str
