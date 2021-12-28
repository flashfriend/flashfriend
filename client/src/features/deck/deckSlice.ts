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
  cards: [...sampleCards],
  currentCard: 0,
  cardCount: 1,
};

export const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    getCards: (state) => {
      console.log('Getting cards');
      fetch('/api/cards/test')
        .then(data => data.json())
        .then(data => console.log(data))
    },
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
      state.currentCard += 1
      //show cards[currentCard]
    },
    getPrevCard: (state) => {
      console.log('Getting Next Card');
      state.currentCard -= 1
      // show cards[currentCard]
    },
    updateCard: (state, action: PayloadAction<Card>) => {
      console.log('Updating Card')
      const card = state.cards.find(card => card.id === action.payload.id)
      if (card) {
        card.front = action.payload.front;
        card.back = action.payload.back;
      }
      // put request
    },
    toggleHidden: (state, action: PayloadAction<Card>) => {
      console.log('Toggling hidden')
      const card = state.cards.find(card => card.id === action.payload.id)
      if (card) {
        card.hidden = !card.hidden;
      }
    }
  },
});

// SELECTORS
export const selectDeck = (state: RootState) => state.deck.cards;
export const selectCurrentCard = (state: RootState) => state.deck.currentCard;

export const { getCards, addCard, deleteCard, getNextCard, getPrevCard, updateCard, toggleHidden } = deckSlice.actions;

export default deckSlice.reducer;