const fadeIn = (e) => {
  // Using the event loop to execute two animations in sequence.
  // This function, activating a text fade-in, is called after
  // the event loop call stack is empty.
  console.log('fade-in')
  e.target.classList.toggle('opaque')
}

// const openPane = (element) => {
//   element.classList.toggle('show')
// }

window.onload = (e) => {
  console.log('window fully loaded')
  const panes = document.querySelectorAll(".pane")
  panes.forEach(pane => {
    console.log(pane)
    // pane.addEventListener('keydown', openPane)
    // pane.classList.toggle('show')
    pane.addEventListener('transitionend', fadeIn)
  })
  const images = document.querySelector('.images')
  const scrollTriggers = []
  const thirdOfScreen = window.innerHeight / 3
  console.log('thirdOfScreen', thirdOfScreen)
  for (let i = 0; i < panes.length; i++) {
    console.log(images.children[i])
    const {y, height, ...rest} = images.children[i].getBoundingClientRect()
    console.log(y, height)
    const trigger = {
      paneClasses: panes[i].classList,
      open: false,
      top: Math.abs(y) - thirdOfScreen,
      bottom: Math.abs(y) + height - (thirdOfScreen * 2),
      checkRange (y) {
        if (!this.open && (y > this.top && y < this.bottom)) {
          console.log(y, this.classes, 'opening', this.open)
          this.open = true
          this.paneClasses.toggle('show')
        } else if (this.open && (y > this.bottom || y < this.top)) {
          console.log(y, this.classes, 'closing', this.open)
          this.open = false
          this.paneClasses.toggle('show')
        }
        return y > this.top && y < this.bottom
      },
    }
    scrollTriggers.push(trigger)
    console.log(trigger)
  }

  

  // console.log(images.children.map(image => image.getBoundingClientRect()))
  // const {y, height, ...rest} = images.firstElementChild.getBoundingClientRect()
  // const triggerRange = [Math.abs(y) - height + ( height / 3 ), Math.abs(y) - height + ( height * 2 / 3  )]
  // console.log(y, height)
  document.addEventListener('scroll', event => {
    console.log(window.scrollY)
    scrollTriggers.forEach(trigger => trigger.checkRange(window.scrollY))
  })
}

/**
 * get the yaxis center of each right-side image
 * (start with one to figure out my desired behavior)
 * 
 * add a scroll listener which watches for moving past
 * that point in the y axis
 */

/**
 * -------------------------------------------- <- scrollY at top of screen
 * 
 * 
 *           --------------------------         <- open when element top is here
 *                                                 y + 1/3 screen height
 * 
 *           --------------------------         <- close when element bottom is here
 *                                                 y + 2/3 screen height
 * 
 */