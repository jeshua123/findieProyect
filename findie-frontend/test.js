const nodes = [...document.querySelectorAll('.navBar-options')]
nodes.forEach((node) => {
  node.onmouseenter = () => {
    //setTimeout(() => {
    setInterval(function () {
      const nodeITEM = document.querySelector('.navBar-display')
      const parentNode1 = [...nodeITEM.children[1].children]
      const parentNode2 = [...nodeITEM.children[1].children[0].children]
      if (parentNode1.length === 1) {
        handleList(parentNode2)
      } else {
        handleList(parentNode1)
      }
    }, 500)
  }
})

const handleList = (list) => {
  list.forEach((n) => {
    const ul = n.children[1]
    const parent = [...n.children[1].children]
    parent.sort((a, b) => a.textContent.localeCompare(b.textContent)).forEach((li) => ul.appendChild(li))
    const verMas = ul.children[ul.children.length - 1].children[0]
    const ver = ul.children[ul.children.length - 1]
    verMas.textContent = 'Ver todo >'
    verMas.style.fontSize = '13px'
    verMas.style.color = '#0079d7'
    ul.insertBefore(ver, ul.children[0])
  })
}
