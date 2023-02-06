import { Quote } from 'src/quotes/quote.entity';
import { QuoteStats } from '../interfaces/quote-stats.interface';

export const calculateQuoteStats = (quote: Quote): QuoteStats => {
  let upvotes = 0;
  let downvotes = 0;

  quote.votes.forEach((vote) => {
    vote.type === 1 ? upvotes++ : downvotes++;
  });

  const stats: QuoteStats = {
    upvotes,
    downvotes,
    score: upvotes - downvotes,
  };

  return stats;
};
