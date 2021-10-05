import { context, storage,u128,logging, PersistentSet,PersistentVector,ContractPromiseBatch,env } from "near-sdk-as";
import { AuctionItem,list_auction_items, JoinerBid, joiner_bids } from './model';

// --- contract code goes below
export const dAPP_OWNER:string='tuanlv.testnet';


/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
 export function addNewItem(productcode:string,productname:string, productdesc:string,producturl:string,productprice:u128 ): void {
  logging.log("Add new item: ".concat(productname)+"-".concat(productcode));
  assert(!list_auction_items.contains(productcode), "Item with this code is exists!");  
  assert((dAPP_OWNER==context.sender), "You have no right");
  const aucitem= new AuctionItem(productcode,productname,productdesc,producturl,productprice,dAPP_OWNER);
  
  // Adding the item to collection
  list_auction_items.set(productcode,aucitem);
}
/**
* Returns all Items.\
*/
export function getItems(): AuctionItem[] {
  logging.log("Get all items");   
 return list_auction_items.values();
}

export function joinItem(item_code:string ): AuctionItem | null {
  logging.log("Join on item to bid: ".concat(item_code));
  assert(list_auction_items.contains(item_code), "Item is not existed");
  assert(!(dAPP_OWNER==context.sender), "You are the owner");
  const auction_item = list_auction_items.get(item_code);
  if (auction_item) {
    const updated = auction_item.join();
    list_auction_items.set(updated.item_code, updated);
    return auction_item;
  }
  return null;
}

export function cleanJoiner(item_code:string ): AuctionItem | null {
  logging.log("Clear all Joiner on item: ".concat(item_code));
  assert(list_auction_items.contains(item_code), "Item is not existed");
  assert((dAPP_OWNER==context.sender), "You have no right");
  const auction_item = list_auction_items.get(item_code);
  if (auction_item) {
    const updated = auction_item.cleanJoiner();
    list_auction_items.set(updated.item_code, updated);
    return auction_item;
  }
  return null;
}

export function getCountJoiner(item_code: string): i32 {
  logging.log("Count joiner to bid on item: ".concat(item_code));
  
  assert(list_auction_items.contains(item_code), "Item is not existed");
  const auction_item = list_auction_items.get(item_code);
  if (auction_item) {
    return auction_item.list_joiners.length;
  }
  return 0;
}

export function getJoinerBids(item_code: string): JoinerBid[] {
  logging.log("Get all bids of all joiners on item: ".concat(item_code));
  assert(list_auction_items.contains(item_code), "Item is not existed");

  let results: JoinerBid[] = [];
  const auction_item = list_auction_items.get(item_code);
  if (auction_item != null) {
    const values = joiner_bids.values();
    for (let i = 0; i < values.length; i++) {
      if (item_code == values[i].item_code) {
        results.push(values[i]);
      }
    }
  }

  return results;
}

export function bidOnItem(item_code: string, bid_price: u128): JoinerBid[] {
  logging.log("Bid on the item: ".concat(item_code));
  
  assert(list_auction_items.contains(item_code), "Item is not existed");
  assert((dAPP_OWNER==context.sender), "You are the owner");
  const auction_item = list_auction_items.get(item_code);
  if (auction_item) {
    let bidId = storage.getPrimitive<i32>("bidId", 0);
    const joiner_bid = new JoinerBid(bidId,item_code,context.sender, bid_price, u128.from(context.blockTimestamp));
    joiner_bids.set(joiner_bid.bid_id, joiner_bid);

    bidId = bidId + 1;
    storage.set<i32>("bidId", bidId);
  }

  let results: JoinerBid[] = [];
  if (auction_item) {
    const values = joiner_bids.values();
    for (let i = 0; i < values.length; i++) {
      if (item_code == values[i].item_code) {
        results.push(values[i]);
      }
    }
  }

  return results;
}