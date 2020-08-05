import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogEntry from './BlogEntry'

test('<BlogEntry /> updates parent state and calls handleSubmit', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogEntry handlePost={addBlog} />
  )

  const title = component.container.querySelector('#title')
  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  const author = component.container.querySelector('#author')
  fireEvent.change(author, {
    target: { value: 'I am the author' }
  })
  const url = component.container.querySelector('#url')
  fireEvent.change(url, {
    target: { value: 'thisisaddress.com' }
  })
  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
  expect(addBlog.mock.calls[0][0].author).toBe('I am the author')
  expect(addBlog.mock.calls[0][0].url).toBe('thisisaddress.com')
})