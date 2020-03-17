export default {
  get: () => Promise.resolve({
    data: [{
      'id': 'http://purl.uniprot.org/uniprot/Q8N0V5',
      'surface_form': 'N-acetylglucosaminyltransferase',
      'sentence_id': '040aba4fa2494fc1ab909cb22ff5d7f8'
    }, {
      'id': 'http://purl.uniprot.org/uniprot/Q8N0V5',
      'surface_form': 'N-acetylglucosaminyltransferase',
      'sentence_id': 'a20fc23fdb6140fba4a6d698b8a34a38'
    }]
  }).catch(error => {
    console.log('error')
  }),

  post: (url, obj) => Promise.resolve({
    data: [{
      'sentence': '<mark class="protein"><mark class="protein">P-</mark>selectin glycoprotein ligand-1</mark>, ' +
                 '<mark class="protein">PSGL-1</mark>, a specific ligand for <mark class="protein">P-</mark>, ' +
                 '<mark class="protein">E-</mark>, and <mark class="protein">L-selectin</mark>, was isolated from in ' +
                 'vivo ' +
                 '<mark class="cell-line">[3H]-glucosamine labeled HL-60 cells</mark> by a combination of ' +
                 'wheat germ agglutinin and platelet <mark class="protein">P-</mark>selectin- or <mark ' +
                 'class="protein">E-</mark>selectin receptor globulin-agarose chromatography.',

      'type': 2,
      'relation': 'ELABORATION'
    },{
      'sentence': 'The percentage of this <mark class="RNA">mRNA</mark> containing the truncated ORF out of the total ' +
        'population of CMP-NeuAc hydroxylase <mark class="R' +
        'NA">mRNA</mark> in various mouse tissues was about 10-25%.',
      'type': 3,
      'relation': 'UNKNOWN_SUBORDINATION'
    }]
  }).catch(error => {
    console.log('error')
  })
}
