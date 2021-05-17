import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Toggleable from './Toggleable'

describe('<Toggleable />', () => {
    let component

    beforeEach(() => {
        component = render(
            <Toggleable buttonLabel="viewblogs">
                <div className="testDiv" />
            </Toggleable>
        )
    })

    test('renders its children', () => {
        expect(
            component.container.querySelector('.testDiv')
        ).toBeDefined()
    })

    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('viewblogs')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })
})