fetch('checklist.json')
  .then((response) => response.json())
  .then((data) => {
    const container = document.createElement('div')
    container.classList.add('question')

    document.body.appendChild(container)

    // título
    const title = document.createElement('p')
    title.textContent = data.title

    container.appendChild(title)

    // renderiza todos os itens
    data.items.forEach((item, index) => {
      const itemTitle = document.createElement('p')
      itemTitle.style.fontSize = '1.2rem'
      itemTitle.style.marginTop = '2rem'
      itemTitle.style.marginBottom = '1rem'
      itemTitle.textContent = `${index + 1}. ${item.label}`

      container.appendChild(itemTitle)

      const options = ['Concluído', 'Parcial', 'Não iniciado', 'Não se aplica']

      options.forEach((option) => {
        const answerContainer = document.createElement('div')
        answerContainer.classList.add('answer-container')

        const radio = document.createElement('input')
        radio.type = 'radio'
        radio.name = `item-${index}`
        radio.value = option

        const label = document.createElement('label')
        label.textContent = option

        // feedback visual
        radio.addEventListener('change', () => {
          const allOptions = document.querySelectorAll(
            `input[name="item-${index}"]`,
          )

          allOptions.forEach((input) => {
            input.parentElement.classList.remove(
              'correta',
              'incorreta',
              'neutra',
            )
          })

          if (option === 'Concluído') {
            answerContainer.classList.add('correta')
          } else if (option === 'Não se aplica') {
            answerContainer.classList.add('neutra')
          } else {
            answerContainer.classList.add('incorreta')
          }
        })

        answerContainer.appendChild(radio)
        answerContainer.appendChild(label)

        container.appendChild(answerContainer)
      })
    })

    // botão finalizar
    const finishButton = document.createElement('button')

    finishButton.textContent = 'Finalizar Checklist'

    finishButton.style.fontFamily = 'var(--fonte-secundaria)'
    finishButton.style.marginTop = '2rem'
    finishButton.style.padding = '1rem 2rem'
    finishButton.style.borderRadius = '12px'
    finishButton.style.border = 'none'
    finishButton.style.cursor = 'pointer'
    finishButton.style.fontWeight = 'bold'
    finishButton.style.backgroundColor = 'var(--cor-terciaria)'
    finishButton.style.color = 'var(--cor-primaria)'

    finishButton.addEventListener('click', () => {
      const results = []

      data.items.forEach((item, index) => {
        const selected = document.querySelector(
          `input[name="item-${index}"]:checked`,
        )

        results.push({
          item: item.label,
          status: selected ? selected.value : 'Sem resposta',
        })
      })

      const completed = results.filter((r) => r.status === 'Concluído').length

      container.innerHTML = `
        <p>
          Checklist concluída.<br><br>

          Você concluiu
          <strong>${completed}</strong>
          de
          <strong>${results.length}</strong>
          critérios.
        </p>
      `
    })

    container.appendChild(finishButton)
  })
  .catch((error) => {
    console.error('Erro ao carregar checklist:', error)
  })
