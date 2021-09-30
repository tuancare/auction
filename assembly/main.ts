import { context, u128, PersistentSet,PersistentVector,ContractPromiseBatch } from "near-sdk-as";
import { PostedMessage, messages, AuctionItem,list_auction_items } from './model';

// --- contract code goes below

// The maximum number of latest messages the contract returns. 
const MESSAGE_LIMIT = 10;
const ITEM_LIMIT = 10;
/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(text: string): void {
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text);
  // Adding the message to end of the the persistent collection
  messages.push(message);
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getMessages(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = messages[i + startIndex];
  }
  return result;
}

export function transferNear(receiver: string, num: u128): void {  
  let promise = ContractPromiseBatch.create(receiver).transfer(num)
}


/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
 export function addNewProduct(productcode:string, productdesc:string,producturl:string,productprice:u128 ): void {
  
  const aucitem= new AuctionItem(productcode,productdesc,producturl,productprice);
  
  // Adding the message to end of the the persistent collection
  list_auction_items.push(aucitem);
}
/**
* Returns an array of last N Products.\
* NOTE: This is a view method. Which means it should NOT modify the state.
*/
export function getProducts(): AuctionItem[] {
 const numProducts = min(ITEM_LIMIT, list_auction_items.length);
 const startIndex = list_auction_items.length - numProducts;
 const result = new Array<AuctionItem>(numProducts);
 for(let i = 0; i < numProducts; i++) {
   result[i] = list_auction_items[i + startIndex];
 }
 return result;
}

export function bidProduct( ): void {
  
  let item = list_auction_items[1];
  
  item.list_joiners.add('context.sender');
  //list_auction_items.replace(1, item);
}