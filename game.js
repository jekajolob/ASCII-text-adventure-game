document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('game-output')
  const input = document.getElementById('game-input')

  const gameState = {
    currentRoom: 'start',
    rooms: {
      start: {
        description:
          'You are in a dark room. There is a door to the north and another to the south.',
        exits: { north: 'hallway', south: 'restroom' },
      },
      hallway: {
        description:
          'You are in a long hallway. There is a room to the south and another to the east.',
        exits: { south: 'start', east: 'kitchen' },
      },
      kitchen: {
        description: 'You are in a kitchen. There is a hallway to the west.',
        exits: { west: 'hallway' },
      },
      restroom: {
        description: 'You are in a restroom. There is a door to the north.',
        exits: { north: 'hallway' },
      },
    },
  }

  const displayText = (text) => {
    output.innerText += text + '\n'
    output.scrollTop = output.scrollHeight
  }

  const processInput = (command) => {
    const [action, direction] = command.split(' ')
    if (
      action === 'go' &&
      direction in gameState.rooms[gameState.currentRoom].exits
    ) {
      gameState.currentRoom =
        gameState.rooms[gameState.currentRoom].exits[direction]
      displayText(gameState.rooms[gameState.currentRoom].description)
    } else {
      displayText("I don't understand that command.")
    }
  }

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const command = input.value.trim()
      input.value = ''
      processInput(command)
    }
  })

  displayText(gameState.rooms[gameState.currentRoom].description)
})
