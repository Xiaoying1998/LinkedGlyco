import scispacy
import spacy
from spacy.scorer import Scorer
import en_ner_jnlpba_md
scorer = Scorer()
nlp = spacy.load("en_ner_jnlpba_md")
doc = nlp('''P-selectin glycoprotein ligand-1, PSGL-1, a specific ligand for P-, E-, and L-selectin, was isolated 
from in vivo [3H]-glucosamine labeled HL-60 cells by a combination of wheat germ agglutinin and platelet P-selectin- 
or E-selectin receptor globulin-agarose chromatography.''')
# displacy.render(doc, jupyter=True, style='ent')
print(doc.ents)
# displacy.serve(doc, style="ent")
j = dict(([(X.text, X.label_) for X in doc.ents]))
# j = dict(dict((X.text, X.label_) for X in doc.ents)
print(j)

# for x in j:
#     print(x)
#     print(j[x])

