describe('Android App flow', () => {
  it('should be able to order the first product in the list', async function() {
    this.timeout(120000); // Increase timeout to 2 minutes
    
    // Wait for the catalog to be shown
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
    await driver.pause(750); // Wait for cart update animation

    /**
     * Now go to the cart and proceed to the login screen
     */
    await $('//*[@content-desc="cart badge"]').click();
    await $('//*[@content-desc="cart screen"]').waitForDisplayed();
    await $('//*[@content-desc="Proceed To Checkout button"]').click();
    await $('//*[@content-desc="login screen"]').waitForDisplayed();

    /**
     * Submit valid login credentials
     */
    await $('//*[@content-desc="Username input field"]').setValue('bob@example.com');
    await driver.hideKeyboard();
    await $('//*[@content-desc="Password input field"]').setValue('10203040');
    await driver.hideKeyboard();
    await $('//*[@content-desc="Login button"]').click();
    await driver.pause(750);
    await $('//*[@content-desc="checkout address screen"]').waitForDisplayed();

    /**
     * Fill in address details
     */
    await $('//*[@content-desc="Full Name* input field"]').setValue('Rebecca Winter');
    await driver.hideKeyboard();
    
    await findElementBySwipe({
      element: await $('//*[@content-desc="Address Line 1* input field"]'),
      scrollableElement: await $('//*[@content-desc="checkout address screen"]'),
    });
    await $('//*[@content-desc="Address Line 1* input field"]').setValue('Mandorley 122');
    await driver.hideKeyboard();

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
     * Fill in payment info
     */
    await $('//*[@content-desc="Full Name* input field"]').setValue('Rebecca Winter');
    await driver.hideKeyboard();
    await $('//*[@content-desc="Card Number* input field"]').setValue('5555555555554444');
    await driver.hideKeyboard();

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

    /**
     * Click Review Order and wait for navigation to review screen
     */
    const reviewOrderBtn = await $('//*[@content-desc="Review Order button"]');
    await reviewOrderBtn.waitForDisplayed({ timeout: 10000 });
    await reviewOrderBtn.waitForEnabled({ timeout: 10000 });

    // Try multiple click strategies for robustness
    try {
      // First try: Regular click
      await reviewOrderBtn.click();
    } catch (e) {
      // Second try: Touch action
      await reviewOrderBtn.touchAction('tap');
    }
    
    // Third try: UiScrollable click for Sauce Labs compatibility
    try {
      await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("Review Order button"))');
      await reviewOrderBtn.click();
    } catch (e) {
      // Ignore if this fails
    }

    // Wait for navigation to review order screen
    await $('//*[@content-desc="checkout review order screen"]').waitForDisplayed({ timeout: 10000 });

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
async function swipe(from: { x: number; y: number }, to: { x: number; y: number }) {
  await driver.performActions([
    {
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: from.x, y: from.y },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 100 },
        { type: 'pointerMove', duration: 1000, x: to.x, y: to.y },
        { type: 'pointerUp', button: 0 },
      ],
    },
  ]);
  await driver.pause(2000); // wait for swipe animation
}

/**
 * Find elements based on a swipe from bottom to top within a certain scrollable element
 */
async function findElementBySwipe({ element, maxScrolls = 5, scrollableElement }: {
  element: WebdriverIO.Element;
  maxScrolls?: number;
  scrollableElement: WebdriverIO.Element;
}): Promise<WebdriverIO.Element | undefined> {
  for (let i = 0; i < maxScrolls; i++) {
    if (await element.isDisplayed()) {
      return element;
    }

    const { x, y, height, width } = await driver.getElementRect(scrollableElement.elementId);
    const centerX = x + width / 2;
    const yStart = y + height * 0.9;
    const yEnd = y + height * 0.1;

    await swipe({ x: centerX, y: yStart }, { x: centerX, y: yEnd });
  }
}