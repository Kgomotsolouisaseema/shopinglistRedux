import React, { useEffect, useState } from "react";
// import { Dropdown, ButtonGroup } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../components/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

//redux functionality 
import {connect}from 'react-redux'
import {addItemAction , deleteItemAction , updateItemAction} from "../redux/actions";

// Map category names to corresponding icons
const categoryIcons = {
  groceries: "🛒",
  household: "🏠",
  snacks: "🍿",
  frozenFood: "❄️",
  personalCare: "🧴",
};

const mapDispatchToProps = (dispatch) =>{
  return {
    addItem : (itemData)=> dispatch(addItemAction(itemData)),
    deletItem : (id)=> dispatch(deleteItemAction(id)),
    updateItem : (id , updatedItem)=> dispatch(updateItemAction(id ,updatedItem)),
  }
};

function AddItemPage(props) {
  // const dispatch = useDispatch();

  const [item, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQuantiy, setItemQuantity] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [updatedItem, setUpdatedItem] = useState("");

  const [shopingItems, setShopingItems] = useState([]);
  const shopingCollectionRef = collection(db, "shopingitems");

  const handleAddItem = async () => {
  
  
    try {
      await addDoc(shopingCollectionRef, {
        Item: item,
        Price: itemPrice,
        Quantity: itemQuantiy,
        Category: itemCategory,
      });

        // Dispatch Redux action to add the item to the shopping list
        props.addItem({
          Item: item,
          Price: itemPrice,
          Quantity: itemQuantiy,
          Category: itemCategory,
        })
      setItemName("");
      setItemPrice(0);
      setItemQuantity(0);
      setItemCategory("");

      alert("ITEM ADDED ");
    } catch (error) {
      console.error("Errod adding items to firebase", error);
    }
  };

  const deletItems = async (id) => {
    const shopItems = doc(db, "shopingitems", id);
    await deleteDoc(shopItems);
    
    //dispatch
    props.deletItem(id);
    // deletItem(id);
  };

  const updateItem = async (id) => {
    const shopItems = doc(db, "shopingitems", id);
    await updateDoc(shopItems, { Item: updatedItem });

    //dispatch
    props.updateItem(id, updatedItem);
    // updateItem(id, updatedItem);
  };

  const getShopingItems = async () => {
    // const  querySnapshot = await shopingCollectionRef.get();

    // querySnapshot.forEach((doc)=>{
    //   console.log("Document data:" , doc.data());
    // });
    //read data from database and set the shoping items
    try {
      const data = await getDocs(shopingCollectionRef);
      const filtereddata = data.docs.map((doc) => ({
        //this fucntion  returns the values in the collection of shoping list and displays it on the console.
        ...doc.data(),
        id: doc.id,
      }));
      setShopingItems(filtereddata);
      console.log(filtereddata);
    } catch (error) {
      console.error("Error fetching collection", error);
    }
  };

  useEffect(() => {
    getShopingItems();
  }, []);

 
 
  return (
    <div className="add-item-page">
      <h2>Add New Item</h2>
      <div>
        <label>Item Name :</label>
        <input
          type="text"
          value={item}
          placeholder="item Name"
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div>
        <label>Price :</label>
        <input
          type="text"
          value={itemPrice}
          placeholder="item Price"
          onChange={(e) => setItemPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={itemQuantiy}
          placeholder="item Quantiy"
          onChange={(e) => setItemQuantity(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Item Category:</label>
        <select
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          <option value="groceries">Groceries</option>
          <option value="household">Household Essentials</option>
          <option value="snacks">Snacks</option>
          <option value="frozen-food">Frozen Foods</option>
          <option value="personal-care">Personal Care</option>
        </select>
        {itemCategory && (
          <span className="category-icon" key={itemCategory}>
            {categoryIcons[itemCategory]}
          </span>
        )}
      </div>
      <button onClick={handleAddItem}>Add Item</button>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {shopingItems.map((item, index) => (
          <div key={item.id} style={{ marginBottom: '10px' }}>
            <h3>{item.Item}</h3>
            <ol style={{ listStyle: 'none', counterReset: 'item-counter' }}>
              <li style={{ counterIncrement: 'item-counter' }}>
                <p>Price: {item.Price}</p>
                <p>Quantity: {item.Quantity}</p>
                <p>Category: {item.Category}</p>
                <button onClick={() => deletItems(item.id)}>Delete item</button>
                <input
                  placeholder="new item..."
                  onChange={(e) => setUpdatedItem(e.target.value)}
                ></input>
                <button onClick={() => updateItem(item.id)}>Update Item</button>
              </li>
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default AddItemPage;
export default connect(null, mapDispatchToProps)(AddItemPage);
