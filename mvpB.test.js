import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {
  /*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.

    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */

 describe('sumTests', () => {
  let message = 'pass valid numbers';
  it('should throw an error with no arguments', () => {
    expect(() => sum()).toThrowError(message);
  });
  it('should throw error with non-numerical arguments', () => {
    expect(() => sum(2, 'seven')).toThrow(message);
  });
  it('should sum ints correctly', () => {
    expect(() => sum(1, 3).toBe(4));
  });
  it('should sum int and string correctly', () => {
    expect(() => sum('1', 2).toBe(3));
  });
  it('should sum two strings correctly', () => {
    expect(() => sum('10','3').toBe(13));
  });
 });

  /*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
  */

 describe('HelloWorld tests', () => {
  let component;
  beforeEach(() => {
    component = render(<HelloWorld />)
  })
  it('should render a link that reads "Home"', () => {
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });
  it('should render a link that reads "About"', () => {
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
  });
  it('should render a link that reads "Blog"', () => {
    const blogLink = screen.getByText('Blog');
    expect(blogLink).toBeInTheDocument();
  });

  it('should render a text that reads "The Truth"', () => {
    const truthText = screen.getByText('The Truth');
    expect(truthText).toBeInTheDocument();
  });

  it('should render a text that reads "JavaScript is pretty awesome"', () => {
    const awesomeText = screen.getByText('JavaScript is pretty awesome');
    expect(awesomeText).toBeInTheDocument();
  });

  it('should render a text that inexactly contains "javaScript is pretty"', () => {
  const prettyText = screen.getByText(/.*javaScript is pretty.*/i);
    expect(prettyText).toBeInTheDocument();
  });
 });
});

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}
