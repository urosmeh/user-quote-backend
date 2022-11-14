import { Quote } from 'src/quotes/quote.entity';
import { QuoteStats } from '../interfaces/quote-stats.interface';

export const calculateQuoteStats = (quote: Quote): QuoteStats => {
  let upvotes: number = 0;
  let downvotes: number = 0;

  quote.votes.forEach((vote) => {
    vote.type === 1 ? upvotes++ : downvotes++;
  });

  quote.upvotes = upvotes;
  quote.downvotes = downvotes;

  const stats: QuoteStats = {
    upvotes,
    downvotes,
  };

  return stats;
};
