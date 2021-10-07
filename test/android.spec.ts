describe('Android App flow', () => {
  it('should be able to order a the first product in the list', async () => {
    // Wait for the catalog to be shown
    ////*[@content-desc="
    await $('//*[@content-desc="products screen"]').waitForDisplayed();

    /**
     * Open the first product and add it to the basket
     */
    await $$('//*[@content-desc="store item"]')[0].click();
    await $('//*[@content-desc="product screen"]').waitForDisplayed();
    // Make sure the button is available, if not then swipe
    await findElementBySwipe({
      element: await $('//*[@content-desc="Add To Cart button"]'),
      scrollableElement: await $('//*[@content-desc="product screen"]'),
    });
    await $('//*[@content-desc="Add To Cart button"]').click();
    // There is an animation for updating the cart, wait for it with a hard sleep
    await driver.pause(750);

    /**
     * Now go to the cart and proceed to the login screen
     */
    await $('//*[@content-desc="cart badge"]').click();
    await $('//*[@content-desc="cart screen"]').waitForDisplayed();
    await $('//*[@content-desc="Proceed To Checkout button"]').click();
    await $('//*[@content-desc="login screen"]').waitForDisplayed();

    /**
     * Submit valid data,
     * always close the keyboard to make sure that nothing will break
     */
    await $('//*[@content-desc="Username input field"]').setValue('bob@example.com');
    await driver.hideKeyboard();
    await $('//*[@content-desc="Password input field"]').setValue('10203040');
    await driver.hideKeyboard();
    await $('//*[@content-desc="Login button"]').click();
    // Wait for animation to be done
    await driver.pause(750);
    await $('//*[@content-desc="checkout address screen"]').waitForDisplayed();

    /**
     * Add the checkout address info, only the mandatory fields,
     * always close the keyboard to make sure that nothing will break
     */
    await $('//*[@content-desc="Full Name* input field"]').setValue('Rebecca Winter');
    await driver.hideKeyboard();
    await $('//*[@content-desc="Address Line 1* input field"]').setValue('Mandorley 122');
    await driver.hideKeyboard();
    // The following fields might not be on the screen anymore on smaller devices,
    // so first scroll
    await findElementBySwipe({
      element: await $('//*[@content-desc="City* input field"]'),
      scrollableElement: await $('//*[@content-desc="checkout address screen"]'),
    });
    await $('//*[@content-desc="City* input field"]').setValue('Truro');
    await driver.hideKeyboard();
    await findElementBySwipe({
      element: await $('//*[@content-desc="Zip Code* input field"]'),
      scrollableElement: await $('//*[@content-desc="checkout address screen"]'),
    });
    await $('//*[@content-desc="Zip Code* input field"]').setValue('89750');
    await driver.hideKeyboard();
    await findElementBySwipe({
      element: await $('//*[@content-desc="Country* input field"]'),
      scrollableElement: await $('//*[@content-desc="checkout address screen"]'),
    });
    await $('//*[@content-desc="Country* input field"]').setValue('United Kingdom');
    await driver.hideKeyboard();
    await $('//*[@content-desc="To Payment button"]').click();
    await $('//*[@content-desc="checkout payment screen"]').waitForDisplayed();

    /**
     * Add the payment info,
     * always close the keyboard to make sure that nothing will break
     */
    await $('//*[@content-desc="Full Name* input field"]').setValue('Rebecca Winter');
    await driver.hideKeyboard();
    await $('//*[@content-desc="Card Number* input field"]').setValue('5555555555554444');
    await driver.hideKeyboard();
    // The following fields might not be on the screen anymore on smaller devices,
    // so first scroll
    await findElementBySwipe({
      element: await $('//*[@content-desc="Expiration Date* input field"]'),
      scrollableElement: await $('//*[@content-desc="checkout payment screen"]'),
    });
    await $('//*[@content-desc="Expiration Date* input field"]').setValue('0325');
    await driver.hideKeyboard();
    await findElementBySwipe({
      element: await $('//*[@content-desc="Security Code* input field"]'),
      scrollableElement: await $('//*[@content-desc="checkout payment screen"]'),
    });
    await $('//*[@content-desc="Security Code* input field"]').setValue('123');
    await driver.hideKeyboard();
    await $('//*[@content-desc="Review Order button"]').click();
    await $('//*[@content-desc="checkout review order screen"]').waitForDisplayed();

    /**
     * Place the order and check if the checkout is complete
     */
    await $('//*[@content-desc="Place Order button"]').click();
    await $('//*[@content-desc="checkout complete screen"]').waitForDisplayed();
  });
});

/**
 * Swipe over the screen based on coordinates
 */
async function swipe(from: { x: number; y: number }, to: { x: number; y: number },
) {
  await driver.performActions([
    {
      // a. Create the event
      type: 'pointer',
      id: 'finger1',
      parameters: {pointerType: 'touch'},
      actions: [
        // b. Move finger into start position
        {type: 'pointerMove', duration: 0, x: from.x, y: from.y},
        // c. Finger comes down into contact with screen
        {type: 'pointerDown', button: 0},
        // d. Pause for a little bit
        {type: 'pause', duration: 100},
        // e. Finger moves to end position
        //    We move our finger from the center of the element to the
        //    starting position of the element
        {type: 'pointerMove', duration: 1000, x: to.x, y: to.y},
        // f. Finger lets up, off the screen
        {type: 'pointerUp', button: 0},
      ],
    },
  ]);
  // Always wait 1 second for the swipe to be done
  await driver.pause(2000);
}

/**
 * Find elements based on a swipe from bottom to top within a certain scrollable element
 */
async function findElementBySwipe({element, maxScrolls = 5, scrollableElement}: {
  element: WebdriverIO.Element;
  maxScrolls?: number;
  scrollableElement: WebdriverIO.Element;
}): Promise<WebdriverIO.Element | undefined> {
  for (let i = 0; i < maxScrolls; i++) {
    // Check if it's displayed
    if (await element.isDisplayed()) {
      return element;
    }

    const {x, y, height, width} = await driver.getElementRect(
      scrollableElement.elementId,
    );
    const centerX = x + width / 2;
    const yStart = y + height * 0.9;
    const yEnd = y + height * 0.1;
    // Swipe
    await swipe({x: centerX, y: yStart}, {x: centerX, y: yEnd});
  }
}
