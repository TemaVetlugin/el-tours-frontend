import React from 'react'
import { mount } from '@cypress/react18';

import { UiButton } from './index';

describe('UiButton', () => {
    it('mount', () => {
        mount(<UiButton/>);
        cy.get('.ui-button');
    });

    it('label', () => {
        mount(<UiButton>test</UiButton>);
        cy.get('.ui-button').contains('test');
    });

    it('style', () => {
        mount(<UiButton style={{ marginBottom: 20 }}/>);
        cy.get('.ui-button').should('have.css', 'margin-bottom', '20px');
    });

    it('onClick', () => {
        const onClick = cy.stub().as('onClick');
        mount(<UiButton onClick={onClick} />);
        cy.get('.ui-button').click();
        cy.get('@onClick').should('have.been.called');
    });

    it('hasBorder', () => {
        mount(<UiButton hasBorder={false} />);
        cy.get('.ui-button').should('have.css', 'border', '0px none rgb(0, 0, 0)');
    });

    it('colors: single', () => {
        const COLORS = {
            button: 'rgb(0, 1, 2)',
            label: 'rgb(1, 1, 2)',
            border: 'rgb(2, 1, 2)',
        } as any;
        mount(<UiButton colors={COLORS} />);
        cy.get('.ui-button').should('have.css', 'background-color', COLORS.button);
        cy.get('.ui-button__background').should('have.css', 'background-color', COLORS.button);
        cy.get('.ui-button__inner').should('have.css', 'color',  COLORS.label);
        cy.get('.ui-button').should('have.css', 'border-color',  COLORS.border);

        cy.get('.ui-button__background').should('have.css', 'opacity', '0');
        cy.get('.ui-button').realHover();
        cy.wait(100);
        cy.get('.ui-button__background').should('have.css', 'opacity', '1');
        cy.get('.ui-button__inner').should('have.css', 'color',  COLORS.label);
        cy.get('.ui-button').should('have.css', 'border-color',  COLORS.border);
    });

    it('colors: array', () => {
        const COLORS = {
            button: ['rgb(0, 1, 2)', 'rgb(0, 1, 3)'],
            label: ['rgb(1, 1, 2)', 'rgb(4, 1, 3)'],
            border: ['rgb(2, 1, 2)', 'rgb(5, 1, 3)'],
        } as any;
        mount(<UiButton colors={COLORS} />);
        cy.get('.ui-button').should('have.css', 'background-color', COLORS.button[0]);
        cy.get('.ui-button__background').should('have.css', 'background-color', COLORS.button[1]);
        cy.get('.ui-button__inner').should('have.css', 'color',  COLORS.label[0]);
        cy.get('.ui-button').should('have.css', 'border-color',  COLORS.border[0]);

        cy.get('.ui-button__background').should('have.css', 'opacity', '0');
        cy.get('.ui-button').realHover();
        cy.wait(100);
        cy.get('.ui-button__background').should('have.css', 'opacity', '1');
        cy.get('.ui-button__inner').should('have.css', 'color',  COLORS.label[1]);
        cy.get('.ui-button').should('have.css', 'border-color',  COLORS.border[1]);
    });
})

