import Vue from 'vue'
import SearchField from '../../../src/components/SearchField'
import Result from '../../../src/components/Result'
import { shallowMount } from '@vue/test-utils'

import axios from 'axios'
Vue.prototype.$axios = axios;

const $route = {
  path: '/show-result',
  query: {'entity1': 'HL-60', 'entity2': 'PSGL-1', 'verb': 'isolate'}
}

const wrapper = shallowMount(SearchField,{
  mocks: {
    $route
  }
})


it('should fetch entityList when search button is clicked', done =>  {

  wrapper.find('Button').trigger('click')
  wrapper.vm.$nextTick(() => {
    expect(wrapper.vm.entityList).toEqual(['N-acetylglucosaminyltransferase'])
    done()
  })

})



