export {
  FeaturedItem,
  ItemSummary,
  Item,
  ItemImage,
  BiddingInformation,
  ItemAggregate
};

interface ItemBaseProperties {
  id: number;
  name: string;
  initialPrice: number;
  currentPrice: number;
}

interface FeaturedItem extends ItemBaseProperties {
  description: string;
  thumbnail: ItemImage;
}

interface ItemSummary extends ItemBaseProperties {
  thumbnail: ItemImage;
}

interface Item extends ItemBaseProperties {
  description: string;
  timeLeft: string;
  images: Array<ItemImage>;
  finished: boolean;
}

interface ItemImage {
  id: number;
  imageUrl: string;
}

interface BiddingInformation {
  highestBid: number;
  totalNumberOfBids: number;
  highestBidderId: number;
}

interface ItemAggregate {
  item: Item;
  biddingInformation: BiddingInformation;
  ownerId: number;
}
