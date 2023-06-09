window.onload = (e) => {
  const images = document.querySelector('.images') 

  const options = {
    root: null,
    rootMargin: '-10% 0% -33% 0%',
    threshold: 1
  };
  
  const imageObserver = new IntersectionObserver((entries, imageObserver) => {
    entries.forEach(entry => {
      
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains('show-secret')) {
          const pane = document.getElementById(entry.target.classList[0])
          if (pane) {
            pane.classList.add('show')
            entry.target.classList.add('show-secret')
            pane.classList.add('opaque')
          }
        }

      } else {
        if (entry.target.classList.contains('show-secret')) {
          const pane = document.getElementById(entry.target.classList[0])
          if (pane) {
            pane.classList.remove('show')
            pane.classList.remove('opaque')
            entry.target.classList.remove('show-secret')
          }
        }
      }
    })
  }, options)

  for (const image of images.children) {
    imageObserver.observe(image)
  }
}