import Vue from 'vue'
import Result from '../../../src/components/Result'
import { shallowMount } from '@vue/test-utils'

import axios from 'axios'
Vue.prototype.$axios = axios;



describe('when entering two entities', async() => {

  const $route = {
    path: '/show-result',
    query: {'entity1': 'HL-60', 'entity2': 'PSGL-1', 'verb': 'isolate'}
  }

  const resultWrapper = shallowMount(Result,{
    mocks:{
      $route
    }
  })


  const expectedTypeList = [{"label": 0, "text": " 0: Background"}, {"label": 1, "text": " 1: Objective"},
    {"label": 2, "text": " 2: Methods"}, {"label": 3, "text": " 3: Results"},
    {"label": 4,"text": " 4: Conclusions"}]

  const expectedRelationList = [{"label": "ATTRIBUTION", "text": " Attribution"},{"label": "BACKGROUND", "text": " Background"},{"label": "CAUSE", "text":" Cause"},
    {"label": " CONDITION", "text": " Condition"}, {"label": "CONTRAST","text":" Contrast"},
    {"label": "DESCRIBING_DEFINITION","text": " Describing definition"}, {"label": "DISJUNCTION","text": " Disjunction"},
    {"label": "ELABORATION", "text": " Elaboration"}, {"label": "IDENTIFYING_DEFINITION", "text": " Identifying definition"},
    {"label": "LIST", "text": " List"}, {"label": " PURPOSE", "text": " Purpose"},{"label": "UNKNOWN_SUBORDINATION","text": " Unknown subordination"}
  ]

  const expectedSentence = '<mark class="protein"><mark class="protein">P-</mark>selectin glycoprotein ligand-1</mark>, ' +
    '<mark class="protein">PSGL-1</mark>, a specific ligand for <mark class="protein">P-</mark>, ' +
    '<mark class="protein">E-</mark>, and <mark class="protein">L-selectin</mark>, was isolated from in ' +
    'vivo ' +
    '<mark class="cell-line">[3H]-glucosamine labeled HL-60 cells</mark> by a combination of ' +
    'wheat germ agglutinin and platelet <mark class="protein">P-</mark>selectin- or <mark ' +
    'class="protein">E-</mark>selectin receptor globulin-agarose chromatography.'

  const expectedAfterHighlight = '<mark class="protein"><mark class="protein">P-</mark>selectin glycoprotein ligand-1</mark>, <mark class="protein"><b>PSGL-1</b></mark>, a specifi' +
    'c ligand for <mark class="protein">P-</mark>, <mark class="protein">E-</mark>, and <mark class="protein">L-selectin</mark>, was isolated from in vivo' +
    ' <mark class="cell-line">[3H]-glucosamine labeled <b>HL-60</b> cells</mark> by a combination of wheat germ agglutinin and platelet <mark class="prote' +
    'in">P-</mark>selectin- or <mark class="protein">E-</mark>selectin receptor globulin-agarose chromatography.'

  it('should fetch right result sentence', async() => {

    const dataSentence = resultWrapper.vm.test[0].sentence
    const dataType = resultWrapper.vm.test[0].type
    const dataRelation = resultWrapper.vm.test[0].relation

    expect(dataSentence).toEqual(expectedSentence)
    expect(dataType).toBe(2)
    expect(dataRelation).toEqual('ELABORATION')
  })

  it('should fetch right result after highlight function', async() => {

    const dataSentence = resultWrapper.vm.test[0].sentence
    const highlightSentence = resultWrapper.vm.highlight(dataSentence)

    expect(highlightSentence).toEqual(expectedAfterHighlight)
  })

  it('should create right typeList', async() => {

    expect(resultWrapper.vm.typeList).toEqual(expectedTypeList)

  })

  it('should create right relationList', async () => {

    expect(resultWrapper.vm.relationList).toEqual(expectedRelationList)

  })

})



describe('when entering first entity', async() => {

  const $route = {
    path: '/show-result',
    query: {'entity1': 'mRNA', 'entity2': '', 'verb': ''}
  }

  const oneEntityResultWrapper = shallowMount(Result,{
    mocks:{
      $route
    }
  })


  const expectedTypeList = [{"label": 0, "text": " 0: Background"}, {"label": 1, "text": " 1: Objective"},
    {"label": 2, "text": " 2: Methods"}, {"label": 3, "text": " 3: Results"},
    {"label": 4,"text": " 4: Conclusions"}]

  const expectedRelationList = [{"label": "ATTRIBUTION", "text": " Attribution"},{"label": "BACKGROUND", "text": " Background"},{"label": "CAUSE", "text":" Cause"},
    {"label": " CONDITION", "text": " Condition"}, {"label": "CONTRAST","text":" Contrast"},
    {"label": "DESCRIBING_DEFINITION","text": " Describing definition"}, {"label": "DISJUNCTION","text": " Disjunction"},
    {"label": "ELABORATION", "text": " Elaboration"}, {"label": "IDENTIFYING_DEFINITION", "text": " Identifying definition"},
    {"label": "LIST", "text": " List"}, {"label": " PURPOSE", "text": " Purpose"},{"label": "UNKNOWN_SUBORDINATION","text": " Unknown subordination"}
  ]

  const expectedSentence = 'The percentage of this <mark class="RNA">mRNA</mark> containing the truncated ORF out of the total ' +
                 'population of CMP-NeuAc hydroxylase <mark class="R' +
                 'NA">mRNA</mark> in various mouse tissues was about 10-25%.'

  const expectedAfterHighlight = 'The percentage of this <mark class="RNA"><b>mRNA</b></mark> containing the truncated ORF out of the total ' +
    'population of CMP-NeuAc hydroxylase <mark class="R' +
    'NA"><b>mRNA</b></mark> in various mouse tissues was about 10-25%.'

  it('should fetch right result sentence', async() => {

    const dataSentence = oneEntityResultWrapper.vm.test[1].sentence
    const dataType = oneEntityResultWrapper.vm.test[1].type
    const dataRelation = oneEntityResultWrapper.vm.test[1].relation
    console.log(oneEntityResultWrapper.vm.test[1].sentence)
    console.log(oneEntityResultWrapper.vm.test[0].sentence)
    expect(dataSentence).toEqual(expectedSentence)
    expect(dataType).toBe(3)
    expect(dataRelation).toEqual('UNKNOWN_SUBORDINATION')
  })

  it('should fetch right result after highlight function', async() => {

    const dataSentence = oneEntityResultWrapper.vm.test[1].sentence
    const highlightSentence = oneEntityResultWrapper.vm.highlight(dataSentence)

    expect(highlightSentence).toEqual(expectedAfterHighlight)
  })

  it('should create right typeList', async() => {

    expect(oneEntityResultWrapper.vm.typeList).toEqual(expectedTypeList)

  })

  it('should create right relationList', async () => {

    expect(oneEntityResultWrapper.vm.relationList).toEqual(expectedRelationList)

  })

})



describe('when entering second entity', async() => {

  const $route = {
    path: '/show-result',
    query: {'entity1': '', 'entity2': 'mRNA', 'verb': ''}
  }

  const secEntityResultWrapper = shallowMount(Result,{
    mocks:{
      $route
    }
  })

  const expectedSentence = 'The percentage of this <mark class="RNA">mRNA</mark> containing the truncated ORF out of the total ' +
    'population of CMP-NeuAc hydroxylase <mark class="R' +
    'NA">mRNA</mark> in various mouse tissues was about 10-25%.'

  const expectedAfterHighlight = 'The percentage of this <mark class="RNA"><b>mRNA</b></mark> containing the truncated ORF out of the total ' +
    'population of CMP-NeuAc hydroxylase <mark class="R' +
    'NA"><b>mRNA</b></mark> in various mouse tissues was about 10-25%.'

  it('should fetch right result sentence', async() => {

    const dataSentence = secEntityResultWrapper.vm.test[1].sentence
    const dataType = secEntityResultWrapper.vm.test[1].type
    const dataRelation = secEntityResultWrapper.vm.test[1].relation
    expect(dataSentence).toEqual(expectedSentence)
    expect(dataType).toBe(3)
    expect(dataRelation).toEqual('UNKNOWN_SUBORDINATION')
  })

  it('should fetch right result after highlight function', async() => {

    const dataSentence = secEntityResultWrapper.vm.test[1].sentence
    const highlightSentence = secEntityResultWrapper.vm.highlight(dataSentence)

    expect(highlightSentence).toEqual(expectedAfterHighlight)
  })

})


describe('when entering no entity', async() => {

  const $route = {
    path: '/show-result',
    query: {'entity1': '', 'entity2': '', 'verb': ''}
  }

  const noEntityResultWrapper = shallowMount(Result,{
    mocks:{
      $route
    }
  })

  const expectedTypeList = [{"label": 0, "text": " 0: Background"}, {"label": 1, "text": " 1: Objective"},
    {"label": 2, "text": " 2: Methods"}, {"label": 3, "text": " 3: Results"},
    {"label": 4,"text": " 4: Conclusions"}]

  const expectedRelationList = [{"label": "ATTRIBUTION", "text": " Attribution"},{"label": "BACKGROUND", "text": " Background"},{"label": "CAUSE", "text":" Cause"},
    {"label": " CONDITION", "text": " Condition"}, {"label": "CONTRAST","text":" Contrast"},
    {"label": "DESCRIBING_DEFINITION","text": " Describing definition"}, {"label": "DISJUNCTION","text": " Disjunction"},
    {"label": "ELABORATION", "text": " Elaboration"}, {"label": "IDENTIFYING_DEFINITION", "text": " Identifying definition"},
    {"label": "LIST", "text": " List"}, {"label": " PURPOSE", "text": " Purpose"},{"label": "UNKNOWN_SUBORDINATION","text": " Unknown subordination"}
  ]



  const expectedSentence2 = 'The percentage of this <mark class="RNA">mRNA</mark> containing the truncated ORF out of the total ' +
    'population of CMP-NeuAc hydroxylase <mark class="R' +
    'NA">mRNA</mark> in various mouse tissues was about 10-25%.'

  const expectedAfterHighlight2 = 'The percentage of this <mark class="RNA">mRNA</mark> containing the truncated ORF out of the total ' +
    'population of CMP-NeuAc hydroxylase <mark class="R' +
    'NA">mRNA</mark> in various mouse tissues was about 10-25%.'


  it('should fetch right second result sentence', async() => {

    const dataSentence = noEntityResultWrapper.vm.test[1].sentence
    const dataType = noEntityResultWrapper.vm.test[1].type
    const dataRelation = noEntityResultWrapper.vm.test[1].relation
    expect(dataSentence).toEqual(expectedSentence2)
    expect(dataType).toBe(3)
    expect(dataRelation).toEqual('UNKNOWN_SUBORDINATION')
  })

  it('should fetch right second result after highlight function', async() => {

    const dataSentence = noEntityResultWrapper.vm.test[1].sentence
    const highlightSentence = noEntityResultWrapper.vm.highlight(dataSentence)

    expect(highlightSentence).toEqual(expectedAfterHighlight2)
  })

  it('should create right typeList', async() => {

    expect(noEntityResultWrapper.vm.typeList).toEqual(expectedTypeList)

  })

  it('should create right relationList', async () => {

    expect(noEntityResultWrapper.vm.relationList).toEqual(expectedRelationList)

  })

})
