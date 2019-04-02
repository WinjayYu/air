import { shallowMount } from '@vue/test-utils'
import warnMsg from '../src/lib/warn-msg'
import App from '../src/App'
import Popup from '../src/components/Popup'

describe('App.vue', () => {
  it('show popup window when button is clicked', () => {
    const wrapper = shallowMount(App)
    wrapper.find('button').trigger('click')
    expect(wrapper.contains(Popup)).toBe(true)
  })
})

describe('Popup.vue', () => {
  it('renders an error when full name characters long is least 3', () => {
    const wrapper = shallowMount(Popup)
    wrapper.setData({
      name: 'Hi',
      email: 'hello@gmail.com',
      confirmEmail: 'hello@gmail.com'
    })
    wrapper.find('input[type="submit"]').trigger('submit')
    expect(wrapper.findAll('.input-item').at(0).find('.warning').text()).toBe(warnMsg.name)
  })
})

describe('Popup.vue', () => {
  it('renders an error when email format is wrong', () => {
    const wrapper = shallowMount(Popup)
    wrapper.setData({
      name: 'foo',
      email: 'hello',
      confirmEmail: 'hello'
    })
    wrapper.find('input[type="submit"]').trigger('submit')
    expect(wrapper.findAll('.input-item').at(1).find('.warning').text()).toBe(warnMsg.email)
  })
})

describe('Popup.vue', () => {
  it('renders an error when the emails entered are not the same', () => {
    const wrapper = shallowMount(Popup)
    wrapper.setData({
      name: 'foo',
      email: 'hello@gmail.com',
      confirmEmail: 'ollhe@gmail.com'
    })
    wrapper.find('input[type="submit"]').trigger('submit')
    expect(wrapper.findAll('.input-item').at(2).find('.warning').text()).toBe(warnMsg.confirmEmail)
  })
})

