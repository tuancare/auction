import { context, u128, PersistentSet,PersistentVector } from "near-sdk-as";

export enum ItemStatus {
  Init,
  Open,
  Close,
  Refunded  
}

/** 
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class PostedMessage {
  premium: boolean;
  sender: string;
  constructor(public text: string) {
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
  }
}
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const messages = new PersistentVector<PostedMessage>("m");

/** 
 * Exporting a new class AuctionContract so it can be used outside of this file.
 */
 @nearBindgen
export class AuctionContract {
    description: string;
    list_items: PersistentVector<AuctionItem>;    

    constructor(
      description: string,
      list_items: PersistentVector<AuctionItem>
      
    ) {
        description = this.description;
        list_items = this.list_items;        
    }

}
 
/** 
 * Exporting a new class JoinerBid so it can be used outside of this file.
 */
 @nearBindgen
 export class JoinerBid {
   joiner: string;
   bid_price: u128;
   bid_time:u128;
   constructor(
    joiner: string,
    bid_price: u128,
    bid_time:u128
   ) {
     this.joiner = joiner;
     this.bid_price = bid_price;
     this.bid_time = bid_time;
   }
 }
 /** 
 * Exporting a new class AuctionItem so it can be used outside of this file.
 */
@nearBindgen
export class AuctionItem {
  item_id: string;
  desc: string;
  url: string;
  base_price:u128;
  status:ItemStatus;
  start_time:u128;
  end_time:u128;
  list_joiners:PersistentSet<string>;//array acound id
  joiner_bids:PersistentVector<JoinerBid>;
  constructor(
    item_id: string,
    desc: string,
    url: string,
    base_price:u128
  ) {
    this.item_id = item_id;
    this.desc = desc;
    this.url = url;
    this.base_price = base_price;    
  }
}
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const list_auction_items = new PersistentVector<AuctionItem>("i");
