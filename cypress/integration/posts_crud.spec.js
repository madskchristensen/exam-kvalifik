/// <reference types="cypress" />

import { uuid } from 'uuidv4';

describe('CRUD Post', () => {
    //-- global variables --//
    const title = uuid(); //To make sure we can find the same post through out the tests
    const text = 'Randwom text';

    beforeEach(() => {
        cy.visit('/posts');
    });

    it('can press new post and create valid draft', () => {
        //click new post button
        cy.get('#new-btn').click();
        //check page contains message
        cy.contains('New Post');
        //check new post site location is equeal to
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:4200/new-post');
        });
        //add title
        cy.get('#titleInput').type(title).should('have.value', title);
        //add text
        cy.get('#textInput').type(text).should('have.value', text);
        //click save draft button
        cy.get('#save-button').click();
        //check new post site location is equeal to
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:4200/posts');
        });
        //check page contains message
        cy.contains('Post saved succesfully');
        //check if status is draft
        cy.contains('mat-cell', title)
            .parent('mat-row')
            .within(() => {
                cy.get('.status-div').should('have.text', ' DRAFT ');
            });
    });

    it('can press new post and get error on invalid post', () => {
        cy.get('#new-btn').click();
        cy.contains('New Post');
        cy.get('#save-button').click();
        cy.contains('Error!');
    });

    it('can press edit on post and change to publish', () => {
        cy.contains('mat-cell', title)
            .parent('mat-row')
            .within(() => {
                cy.get('.status-div').should('have.text', ' DRAFT ');
                cy.get('mat-cell').contains('button', 'Edit').click();
            });
        cy.location().should((location) => {
            expect(location.href).to.contain('http://localhost:4200/edit-post');
        });
        cy.get('#titleInput').should('have.value', title);
        cy.get('#textInput').should('have.value', text);
        cy.get('#publish-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:4200/posts');
        });
        cy.contains('Post updated succesfully');
        cy.contains('mat-cell', title)
            .parent('mat-row')
            .within(() => {
                cy.get('.status-div').should('have.text', ' PUBLISHED ');
            });
    });

    it('can filter posts and press edit to then delete', () => {
        cy.get('#cy_test').type(title);

        cy.contains('mat-cell', title)
            .parent('mat-row')
            .within(() => {
                cy.get('mat-cell').contains('button', 'Edit').click();
            });

        cy.location().should((location) => {
            expect(location.href).to.contain('http://localhost:4200/edit-post');
        });

        cy.get('#titleInput').should('have.value', title);
        cy.get('#textInput').should('have.value', text);

        cy.get('#delete-button').click();

        //check new post site location is equeal to
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:4200/posts');
        });
        //check page contains message
        cy.contains('Post deleted succesfully');

        //check that test data is removed
        cy.get('mat-table').should('not.contain', title);
    });
});
