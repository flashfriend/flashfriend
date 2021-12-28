import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './counterAPI';

export interface Card {
  id: number;
  creator_id: number;
  front: string;
  back: string;
  tags: string[];
  last_correct: Date | null;
  last_incorrect: Date;
  total_correct: number;
  total_incorrect: number;
}

export interface DeckState {
  cards: Card[];
  total: number;
}