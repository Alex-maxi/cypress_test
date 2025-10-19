/// <reference types="cypress" />

class BasePage {

    /**
     * @param {string} selector - locator of element
     * @param {object} options - additional options
     * @param {string} [options.text] - expected text of element
     * @param {string} [options.color] - expected color of element
     * @param {boolean} [options.shouldExist=true] - presents of elemrnt
     * @param {number} [options.timeout=4000] - waiting time
     */
    verifyElement(selector, { text, color, shouldExist = true, timeout = 5000 } = {}) {
        cy.get('body').then($body => {
            const elementExists = $body.find(selector).length > 0;
            try {
                if (shouldExist) {
                    if (!elementExists) {
                        cy.log(`Element "${selector}" not found`);
                        this.isElementPresent({selector: selector});
                        return;
                    }
                    cy.get(selector, { timeout }).then($el => {
                        const isVisible = $el.is(':visible');
                        if (!isVisible) {
                            cy.log(`Element "${selector}" exists but is not visible`);
                            this.isDisplayed({selector: selector});
                        } else {
                            if (text) {
                                let actualText = $el.text().replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
                                if (actualText !== text) {
                                    cy.wait(5000);
                                    cy.get(selector, { timeout }).then($el => {
                                        let actualText = $el.text().replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
                                        expect(actualText).to.equal(text);
                                    });
                                } else {
                                    expect(actualText).to.equal(text);
                                }
                            }
                            if (color) {
                                const actualColor = $el.css('color');
                                    expect(actualColor).to.equal(color);
                            }
                        }
                    });
                } else {
                    if (elementExists) {
                        cy.log(`Element "${selector}" should not exist, but it does`);
                    }
                }
            } catch (error) {
                cy.log(`Soft check failed for selector "${selector}": ${error.message}`);
            }
        });
    }

    isDisplayed({ selector, timeout = 10000 }) {
        cy.get(selector, { timeout: timeout }).should('be.visible');
    }

    isElementPresent({ selector, timeout = 10000 }) {
        cy.get(selector, { timeout: timeout }).should('exist');
    }

    isAbsent({ selector, timeout = 10000 }) {
        cy.get(selector, { timeout: timeout }).should('not.exist');
    }

    wait(timeout) {
        cy.wait(timeout);
        return this;
    }
}

export default BasePage
