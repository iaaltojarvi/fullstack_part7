import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me myself and I',
    url: 'testing.com',
    likes: 100

  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Me myself and I'
  )
  expect(component.container).not.toHaveTextContent('testing.com')
  expect(component.container).not.toHaveTextContent('100')
})

test('shows url and likes when show more button is clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me myself and I',
    url: 'testing.com',
    likes: 100
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} showMore={mockHandler} />
  )
  const button = component.getByText('Show more')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('testing.com')
  expect(component.container).toHaveTextContent('100')
})

test('handleLike function is called twice, when like button is clicked twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me myself and I',
    url: 'testing.com',
    likes: 100
  }

  const mockHandler = jest.fn()
  const mockHandlerTwo = jest.fn()

  const component = render(
    <Blog blog={blog} showMore={mockHandler} addOneLike={mockHandlerTwo} />
  )
  const button = component.getByText('Show more')
  fireEvent.click(button)
  const buttonTwo = component.getByText('Like')
  fireEvent.click(buttonTwo)
  fireEvent.click(buttonTwo)

  expect(mockHandlerTwo.mock.calls).toHaveLength(2)
})

