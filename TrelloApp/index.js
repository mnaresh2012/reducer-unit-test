function TrelloApp(currState, action) {
  switch(action.type) {
    case 'ADD_CARD':
      const list = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index = currState.currentBoard.lists.indexOf(list);
      const newList = Object.assign({}, list, {
        cards: [...list.cards, { id: '' + Math.random()*89793113, text: action.payload.text }]
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index),
            newList,
            ...currState.currentBoard.lists.slice(index+1)
          ]
        })
      });

    case 'EDIT_BOARD':
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          name: action.payload.name
        })
      });
    case 'CREATE_LIST':
      let newListItem = action.payload.list;
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists,
            newListItem
          ]
        })
    });
    case 'EDIT_LIST':
      let newId = action.payload.id;
      let newName = action.payload.name;

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists, { name: newName, id:  newId}
          ]
        })
      });
    case 'MOVE_LIST':
      let startingPosition = action.payload.fromPosition;
      let endingPosition = action.payload.toPosition;

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists, { name: newName, id: newId}
          ]
        })
      });
    case 'EDIT_CARD':
      const getList = currState.currentBoard.lists.find(ele => ele.id == action.payload.listId);
      const getListIndex = currState.currentBoard.lists.indexOf(getList);
      const getCard = getList.cards.find(ele => ele.id == action.payload.cardId);
      const getCardIndex = getList.cards.indexOf(getCard);

      const newCardList = [
        ...getList.cards.slice(0, getCardIndex),
        Object.assign({}, getList.cards[getCardIndex], {
          text: action.payload.newText
        }),
        ...getList.cards.slice(getCardIndex + 1)
      ];

      const newEditedList = [
        ...currState.currentBoard.lists.slice(0, getListIndex),
        Object.assign({}, currState.currentBoard.lists[getListIndex], {
        cards: newCardList
        }),
        ...currState.currentBoard.lists.slice(getListIndex + 1)
      ];

      return  Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: newEditedList
        })
      })
    case 'MOVE_CARD':
      const fromList = currState.currentBoard.lists.find(list => list.id == action.payload.fromListId);
      const fromListIndex = currState.currentBoard.lists.indexOf(fromList);      
      const sourceCardRemoved = currState.currentBoard.lists[fromListIndex].cards.filter(card => {
        return card.id !== action.payload.cardId
      })
      const removedCardList = Object.assign({}, currState.currentBoard.lists[fromListIndex], {
        cards: sourceCardRemoved
      })

      const sourceCard = currState.currentBoard.lists[fromListIndex].cards.filter(card => {
        return card.id == action.payload.cardId
      })

      const moveCard = currState.currentBoard.lists.find(list => list.id == action.payload.toListId);      
      const toListIndex = currState.currentBoard.lists.indexOf(moveCard);
      const movedCards = [
        ...moveCard.cards.slice(0, action.payload.toListPosition),
        sourceCard[0],
        ...moveCard.cards.slice(action.payload.toListPosition)
      ]

      const addedCardList = Object.assign({}, currState.currentBoard.lists[toListIndex], {
        cards: movedCards
      })

      const newMovedLists = currState.currentBoard.lists.map(list => {
        if(list.id == action.payload.fromListId) {
          return removedCardList
        } else if(list.id == action.payload.toListId) {
          return addedCardList
        } else {
          return list
        }
      })
    
      return Object.assign({}, currState, {
        currentBoard: {
          lists: newMovedLists
        }
      })
    default:
      return currState;
  }
}

module.exports = TrelloApp;
