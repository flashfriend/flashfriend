import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createReadStream } from 'fs';
import { RootState, AppThunk } from '../../app/store';
import { sampleCards } from '../../data/sampleCards';

export interface Card {
  id: number;
  creator_id: number | null;
  front: string;
  back: string;
  hidden?: boolean;
  tags?: string[];
  last_correct?: Date | null;
  last_incorrect?: Date | null;
  total_correct?: number;
  total_incorrect?: number;
}

export interface NewCard {
  userid: number;
  front: string;
  back: string;
}

export interface DeckState {
  cards: Card[];
  currentCard: number;
  cardCount: number;
}

const welcomeCard: Card = {
  id: 0,
  creator_id: null,
  front: 'Welcome to flashfriend! \n\n Flip me!',
  back: 'Answers to your custom questions will be shown here.',
  tags: ['welcome', 'test'],
};

const initialState: DeckState = {
  cards: [welcomeCard],
  currentCard: 0,
  cardCount: 1,
};

export const getDeckAsync = createAsyncThunk('deck/fetchDeck', 
  async () => {
    const user = localStorage.getItem("ff_userid")
    const response = await fetch(`/api/cards/${user}`).then(data => data.json())
    return response.deck
  }
);

export const addCardAsync = createAsyncThunk('deck/addCard', 
  async (card: NewCard) => {
    const body = JSON.stringify(card)
    const response = await fetch(`/api/cards/${card.userid}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body
    }).then(data => data.json())
    console.log("new card", response);
    return response
  });


export const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    // getCards: (state, action: PayloadAction<Card[]>) => {
    //   console.log('Getting cards');
    //   state.cards = action.payload;
    //   state.cardCount = action.payload.length;
    // },
    addCard: (state, action: PayloadAction<Card>) => {
      console.log('Adding card');
      state.cards.push(action.payload);
      state.cardCount += 1;
      // put request
    },
    deleteCard: (state, action: PayloadAction<Card>) => {
      console.log('Deleting card');
      // delete request
      // remove card from cards array
    },
    getNextCard: (state) => {
      console.log('Getting Next Card');
      state.currentCard += 1;
      //show cards[currentCard]
    },
    getPrevCard: (state) => {
      console.log('Getting Next Card');
      state.currentCard -= 1;
      // show cards[currentCard]
    },
    updateCard: (state, action: PayloadAction<Card>) => {
      console.log('Updating Card');
      const card = state.cards.find((card) => card.id === action.payload.id);
      if (card) {
        card.front = action.payload.front;
        card.back = action.payload.back;
      }
      // put request
    },
    toggleHidden: (state, action: PayloadAction<Card>) => {
      console.log('Toggling hidden');
      const card = state.cards.find((card) => card.id === action.payload.id);
      if (card) {
        card.hidden = !card.hidden;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeckAsync.fulfilled, (state, action: PayloadAction<Card[]>) => {
        if (action.payload.length > 0) {
          state.cards = action.payload;
          state.cardCount = action.payload.length;
        } else {
          state.cards = [welcomeCard];
          state.cardCount = 1;
        }
      })
      .addCase(addCardAsync.fulfilled, (state, action: PayloadAction<Card>) => {
        let returnCard: any = action.payload;
        if (returnCard.err) return state;
        else {
          state.cards.push(action.payload);
          state.cardCount += 1;
        }
      })
  }
});

// SELECTORS
export const selectDeck = (state: RootState) => state.deck.cards;
export const selectCurrentCard = (state: RootState) => state.deck.cards[state.deck.currentCard];

export const {
  // getCards,
  addCard,
  deleteCard,
  getNextCard,
  getPrevCard,
  updateCard,
  toggleHidden,
} = deckSlice.actions;

export default deckSlice.reducer;
