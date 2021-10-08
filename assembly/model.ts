import { context, u128, PersistentSet,PersistentVector,PersistentUnorderedMap } from "near-sdk-as";

export enum ItemStatus {
  Init,
  Open,
  Close,
  Refunded  
}

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
  bid_id:i32; 
  item_code:string;
  joiner: string;
  bid_price: u128;
  bid_time:u128;
   constructor(
    bid_id:i32,
    item_code:string,
    joiner: string,
    bid_price: u128,
    bid_time:u128
   ) {
    this.bid_id = bid_id;
    this.item_code = item_code;
    this.joiner = joiner;
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
  item_code: string;
  item_name: string;
  desc: string;
  url: string;
  base_price:u128;
  status:ItemStatus;
  start_time:u128;
  end_time:u128;
  len_time:u128;
  list_joiners:string[];//array acound id  
  owner:string;
  constructor(
    item_code: string,
    item_name: string,
    desc: string,
    url: string,
    base_price:u128,
    owner:string,
    start_time:u128,
    len_time:u128
  ) {
    this.item_code = item_code;
    this.item_name = item_name;
    this.desc = desc;
    this.url = url;
    this.base_price = base_price;  
    this.list_joiners  =[];
    this.owner=owner;
    this.start_time=start_time;
    this.len_time=len_time;
  }

  public isJoined(): boolean {
    const index = this.list_joiners.indexOf(context.sender);
    if (index == -1) {
      return false;
    }
    return true;
  }

  public join(): AuctionItem {
    if (!this.isJoined()) {
      this.list_joiners.push(context.sender);
    }
    return this;
  }

  //TODO: just admin can do that 
  public cleanJoiner(): AuctionItem {
    this.list_joiners=[];       
    return this;
  }

  //update status 
  public updateStatus(status:ItemStatus): AuctionItem {
    this.status=status;
    return this;
  }


}


/** 
 * Exporting a new class Transactions so it can be used outside of this file.
 */
 @nearBindgen
 export class Transactions {
  tran_id:i32;
  item_code: string;  
  sender: string;
  tran_price: u128;
  tran_time:u128;
  desc:string;
   constructor(
    tran_id:i32,
    item_code:string,
    sender:string,
    tran_price: u128,
    tran_time: u128,
    desc:string
   ) {
    this.tran_id = tran_id;
    this.item_code = item_code;
    this.sender = sender;
    this.tran_price = tran_price;
    this.tran_time = tran_time;
    this.desc = desc;
    
   }
 }
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const list_auction_items = new PersistentUnorderedMap<string, AuctionItem>("auc-item");
export const joiner_bids = new PersistentUnorderedMap<i32, JoinerBid>("joiner-bid");
export const trans_list = new PersistentUnorderedMap<i32, Transactions>("trans");
