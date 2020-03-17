from flask import Flask, jsonify, json, send_file, send_from_directory, request
from flask_cors import CORS
from py2neo import Graph
import spacy
import en_ner_jnlpba_md

nlp = spacy.load("en_ner_jnlpba_md")
# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# init linking to Neo4j (database created before)
graph = Graph("http://localhost//:7474", username="neo4j", password="yuqunpu1997")


# get the results from database based on queries returned from front end
def get_graph(first_entity, second_entity, verb):
    if first_entity == "":
        result_graph = graph.run("MATCH ()-[r:hasRelation]->(b:Entity) WHERE b.entity='" + second_entity
                                 + "' AND r.sentence =~  '(?i).*\\\\b" + verb + ".*' "
                                 + " RETURN DISTINCT r.sentence AS sentence, r.relation AS relation, r.type AS type").data()
    elif second_entity == "":
        result_graph = graph.run("MATCH (a:Entity)-[r:hasRelation]->() WHERE a.entity='"
                                 + first_entity + "' AND r.sentence =~  '(?i).*\\\\b" + verb + ".*' "
                                 + "RETURN DISTINCT r.sentence AS sentence, r.relation AS relation, "
                                   "r.type AS type").data()
    elif first_entity == "" and second_entity == "":
        result_graph = graph.run("MATCH ()-[r:hasRelation]->() AND r.sentence =~ '(?).*\\\\b " + verb + ".*' "
                                 + "RETURN DISTINCT r.sentence AS sentence, r.relation AS "
                                 + "relation, r.type AS type").data()
    else:

        result_graph = graph.run("MATCH (a:Entity)-[r:hasRelation]->(b:Entity) WHERE a.entity='"
                                 + first_entity + "' AND b.entity='" + second_entity
                                 + "' AND r.sentence =~  '(?i).*\\\\b" + verb + ".*' "
                                 + "RETURN DISTINCT r.sentence AS sentence, r.relation AS relation, r.type AS type").data()
    # print(result_graph)
    return result_graph


# read entities.json file and return the file to home page
@app.route('/', methods=['GET'])
def return_entities():
    try:
        with open('entities.json') as f:
            json_str = json.load(f)
            return jsonify(json_str)
    except Exception as e:
        return jsonify({"code": "exception", "message": "{}".format(e)})


# get two entities and return the result
@app.route('/result', methods=['POST'])
def return_result():
    post_data = request.get_json()

    try:
        # file just for testing
        # with open('result.json') as r:
        #     result = json.load(r)
        #     return jsonify(result)

        # data from real database
        result = get_graph(post_data.get('entity1'), post_data.get('entity2'), post_data.get('verb'))

        # encode and then decode to python object
        encode_result = json.dumps(result)

        # decode result is dict inside list
        decode_result = json.loads(encode_result)

        for i in range(len(decode_result)):
            t = decode_result[i]["sentence"]
            doc = nlp(t)
            entity_label = dict(([(X.text, X.label_) for X in doc.ents]))
            for j in entity_label:
                if entity_label[j] == "PROTEIN":
                    t = t.replace(j, "<mark class=\"protein\">" + j + "</mark>")
                    decode_result[i]["sentence"] = t
                elif entity_label[j] == "CELL_LINE":
                    t = t.replace(j, "<mark class=\"cell-line\">" + j + "</mark>")
                    decode_result[i]["sentence"] = t
                elif entity_label[j] == "CELL_TYPE":
                    t = t.replace(j, "<mark class=\"cell-type\">" + j + "</mark>")
                    decode_result[i]["sentence"] = t
                elif entity_label[j] == "DNA":
                    t = t.replace(j, "<mark class=\"DNA\">" + j + "</mark>")
                    decode_result[i]["sentence"] = t
                elif entity_label[j] == "RNA":
                    t = t.replace(j, "<mark class=\"RNA\">" + j + "</mark>")
                    decode_result[i]["sentence"] = t
        # print(decode_result)
        return json.jsonify(decode_result)

    except Exception as e:
        return jsonify({"code": "exception", "message": "{}".format(e)})


if __name__ == '__main__':
    app.run()
