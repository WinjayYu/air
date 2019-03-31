import { shallowMount } from '@vue/test-utils'
import App from '../src/App'
import Popup from '../src/components/Popup'

describe('App.vue', () => {
  it('show popup window when button is clicked', () => {
    const wrapper = shallowMount(App)
    wrapper.find('button').trigger('click')
    expect(wrapper.contains(Popup)).toBe(true)
  })
})
