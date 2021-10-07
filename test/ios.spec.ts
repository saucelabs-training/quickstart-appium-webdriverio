describe('iOS App flow', () => {
  it('should be able to order a the first product in the list', async () => {
    // Wait for the catalog to be shown
    await $('id=products screen').waitForDisplayed();

    /**
     * Open the first product and add it to the basket
     */
    await $$('id=store item')[0].click();
    await $('id=product screen').waitForDisplayed();
    // Make sure the button is available, if not then swipe
    await findElementBySwipe({
      element: await $('id=Add To Cart button'),
      scrollableElement: await $('id=product screen'),
    });
    await $('id=Add To Cart button').click();
    // There is an animation for updating the cart, wait for it with a hard sleep
    await driver.pause(750);

    /**
     * Now go to the cart and proceed to the login screen
     */
    await $('id=tab bar option cart').click();
    await $('id=cart screen').waitForDisplayed();
    await $('id=Proceed To Checkout button').click();
    await $('id=login screen').waitForDisplayed();

    /**
     * Submit valid data,
     * always close the keyboard to make sure that nothing will break
     */
    await $('id=Username input field').setValue('bob@example.com');
    await hideKeyboard();
    await $('id=Password input field').setValue('10203040');
    await hideKeyboard();
    await $('id=Login button').click();
    // Wait for animation to be done
    await driver.pause(750);
    await $('id=checkout address screen').waitForDisplayed();

    /**
     * Add the checkout address info, only the mandatory fields,
     * always close the keyboard to make sure that nothing will break
     *
     * NOTE: There is an issue with Appium and iOS regarding hiding the keyboard. The
     * `driver.hideKeyboard()` command doesn't work so a custom methods needs to be made.
     * There are 2 methods that are being used, the `hideKeyboard()` for the normal text keyboard
     * and the `hideNumericKeyboard` for a numeric keyboard
     */
    await $('id=Full Name* input field').setValue('Rebecca Winter');
    await hideKeyboard();
    await $('id=Address Line 1* input field').setValue('Mandorley 122');
    await hideKeyboard();
    // The following fields might not be on the screen anymore on smaller devices,
    // so first scroll
    await findElementBySwipe({
      element: await $('id=City* input field'),
      scrollableElement: await $('id=checkout address screen'),
    });
    await $('id=City* input field').setValue('Truro');
    await hideKeyboard();
    await findElementBySwipe({
      element: await $('id=Zip Code* input field'),
      scrollableElement: await $('id=checkout address screen'),
    });
    await $('id=Zip Code* input field').setValue('89750');
    await hideKeyboard();
    await findElementBySwipe({
      element: await $('id=Country* input field'),
      scrollableElement: await $('id=checkout address screen'),
    });
    await $('id=Country* input field').setValue('United Kingdom');
    await hideKeyboard();
    await $('id=To Payment button').click();
    await $('id=checkout payment screen').waitForDisplayed();

    /**
     * Add the payment info,
     * always close the keyboard to make sure that nothing will break
     *
     * NOTE: There is an issue with Appium and iOS regarding hiding the keyboard. The
     * `driver.hideKeyboard()` command doesn't work so a custom methods needs to be made.
     * There are 2 methods that are being used, the `hideKeyboard()` for the normal text keyboard
     * and the `hideNumericKeyboard` for a numeric keyboard
     */
    await $('id=Full Name* input field').setValue('Rebecca Winter');
    await hideKeyboard();
    await $('id=Card Number* input field').setValue('5555555555554444');
    await hideNumericKeyboard();
    // The following fields might not be on the screen anymore on smaller devices,
    // so first scroll
    await findElementBySwipe({
      element: await $('id=Expiration Date* input field'),
      scrollableElement: await $('id=checkout payment screen'),
    });
    await $('id=Expiration Date* input field').setValue('0325');
    await hideKeyboard();
    await findElementBySwipe({
      element: await $('id=Security Code* input field'),
      scrollableElement: await $('id=checkout payment screen'),
    });
    await $('id=Security Code* input field').setValue('123');
    await hideNumericKeyboard();
    await $('id=Review Order button').click();
    await $('id=checkout review order screen').waitForDisplayed();

    /**
     * Place the order and check if the checkout is complete
     */
    await $('id=Place Order button').click();
    await $('id=checkout complete screen').waitForDisplayed();
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

async function hideKeyboard() {
  // The hideKeyboard is not working on ios devices, so take a different approach
  if (!(await driver.isKeyboardShown())) {
    return;
  }

  await $('id=Return').click();
  // Wait for the keyboard animation to be done
  await driver.pause(750);
}

async function hideNumericKeyboard() {
  // The hideKeyboard is not working on ios devices, so take a different approach
  if (!(await driver.isKeyboardShown())) {
    return;
  }

  await driver.execute('mobile: tap', {
    element: await $('id=1'),
    x: 0,
    y: -100,
  });

  // Wait for the keyboard animation to be done
  await driver.pause(750);
}
