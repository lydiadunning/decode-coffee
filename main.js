const fadeIn = (e) => {
  // Using the event loop to execute two animations in sequence.
  // This function, activating a text fade-in, is called after
  // the event loop call stack is empty.
  console.log('fade-in')
  e.target.classList.toggle('opaque')
}

const openPane = (e) => {
  console.log('open-pane', e.target)
  e.target.classList.toggle('show')
}

window.onload = (e) => {
  console.log('window fully loaded')
  const panes = document.querySelectorAll(".pane")
  panes.forEach(pane => {
    console.log(pane)
    // pane.addEventListener('keydown', openPane)
    pane.classList.toggle('show')
    pane.addEventListener('transitionend', fadeIn)
  })
}