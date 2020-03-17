
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Home from '../../../src/components/Home'
import SearchField from '../../../src/components/SearchField'
import axios from 'axios'
Vue.prototype.$axios = axios;

const wrapper = mount(Home)

it('should show the right headers', function () {
  // expected(wrapper.findAll('a').at(0).text())
  expect(wrapper.findAll('a').at(0).text()).toBe('LinkedGlyco')
})
it('should show the right title', function () {
   //use mount to create a vue component wrapper
  expect(wrapper.findAll('p').at(0).text()).toBe('Discover')
  expect(wrapper.findAll('p').at(1).text()).toBe('the amazing relationship')
  expect(wrapper.findAll('p').at(2).text()).toBe('Select entities to find their potential relations.')
})

it('should show the particle background', function () {
  expect(wrapper.find('vue-particle-line').exists()).toBe(true)
})

it('should show the SearchField component', function () {
  expect(wrapper.find(SearchField).exists()).toBe(true)
})


