import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Display from "../Display/Display";
import Input from "../Input/Input";
// import Label from "../Label/Label";

const Todo = () => {
  const [listName, setlistName] = useState([]);
  const [inputText, setInputText] = useState("");
  const [date, setDate] = useState("");
  const [listDate, setListDate] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem("todoList");
    if (items) {
      setlistName(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(listName));
  }, [listName]);

  const addToList = () => {
    if (inputText.trim()) {
      const items = [...listName];
      items.push({
        item: inputText,
        isDone: false,
        isEditing: false,
        editedItem: inputText,
      });
      setlistName(items);
      const dates = [...listDate];
      dates.push(date);
      setListDate(dates);
    }
    setInputText("");
    setDate("");
  };

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    setInputText(value);
  };

  const inputKeychange = (e) => {
    if (e.keyCode === 13) {
      addToList();
    }
  };

  const isDoneHandler = (itemIndex) => {
    const items = [...listName];
    items[itemIndex].isDone = true;
    setlistName(items);
  };

  const isDeleteHandler = (itemIndex) => {
    const items = [...listName];
    items.splice(itemIndex, 1);
    setlistName(items);
  };

  const swapItem = (initialIndex, finalIndex) => {
    const items = [...listName];
    const item = items[initialIndex];
    items[initialIndex] = items[finalIndex];
    items[finalIndex] = item;
    setlistName(items);
  };

  const editHandler = (index) => {
    const items = [...listName];
    items[index].isEditing = true;
    setlistName(items);
  };

  const cancelHandler = (itemIndex) => {
    const items = [...listName];
    items[itemIndex].isEditing = false;
    items[itemIndex].editedItem = items[itemIndex].item;
    setlistName(items);
  };

  const editingHandler = (e, indexItem) => {
    const value = e.target.value;
    const items = [...listName];
    items[indexItem].editedItem = value;
    setlistName(items);
  };

  const saveHandler = (indexItem) => {
    const items = [...listName];
    const value = items[indexItem].editedItem.trim();
    if (value) {
      items[indexItem].item = value;
      items[indexItem].editedItem = value;
      items[indexItem].isEditing = false;
      setlistName(items);
    }
  };

  return (
    <>
      <div>
        <div>
          <Input
            inputChangehandler={inputChangeHandler}
            placeholder="Enter Task Name"
            value={inputText}
            type="text"
            inputKeychange={inputKeychange}
          />
        </div>
      </div>
      <div>
        <Button btnText="Add to list" btnClickHandler={addToList} />
      </div>
      <div>
        <Display
          list={listName}
          isDoneHandler={isDoneHandler}
          deleteHandler={isDeleteHandler}
          swapItems={swapItem}
          editHandler={editHandler}
          cancelHandler={cancelHandler}
          editingHandler={editingHandler}
          saveHandler={saveHandler}
        />
      </div>
    </>
  );
};

export default Todo;
