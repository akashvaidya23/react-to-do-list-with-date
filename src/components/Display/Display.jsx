import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./display.module.css";

const Display = (props) => {
  let list = props.list;
  const listItem = list.map((task, index) => {
    return (
      <li key={index} className={styles.itemContainer}>
        {task.isEditing && (
          <Input
            value={task.editedItem}
            inputChangehandler={(e) => {
              props.editingHandler(e, index);
            }}
          />
        )}

        {/*Conditional rendering and Styling */}
        {!task.isEditing && (
          <span className={task.isDone ? styles.itemDone : ""}>
            {task.item}
          </span>
        )}

        <span className={styles.btnSpan}>
          {/* Conditional Rendering */}

          {task.isEditing && (
            <>
              <Button
                btnText="Save"
                btnClickHandler={() => {
                  props.saveHandler(index);
                }}
                disable={task.editedItem.trim().length === 0}
              />
              <Button
                btnText="Cancel"
                btnClickHandler={() => {
                  props.cancelHandler(index);
                }}
              />
            </>
          )}

          {!task.isEditing && (
            <Button
              btnText="Edit"
              disable={task.isDone}
              btnClickHandler={() => {
                props.editHandler(index);
              }}
            />
          )}

          {task.isDone && (
            <Button
              btnText="Delete"
              btnClickHandler={() => {
                props.deleteHandler(index);
              }}
            />
          )}

          {!task.isDone && (
            <Button
              btnText="Done"
              disable={task.isEditing}
              btnClickHandler={() => {
                props.isDoneHandler(index);
              }}
            />
          )}

          <Button
            btnText="UP"
            btnClickHandler={() => {
              props.swapItems(index, index - 1);
            }}
            disable={index === 0}
          />
          <Button
            btnText="DOWN"
            btnClickHandler={() => {
              props.swapItems(index, index + 1);
            }}
            disable={index === list.length - 1}
          />
        </span>
      </li>
    );
  });

  return (
    <div className={styles.listContainer}>
      <ul>{listItem}</ul>
    </div>
  );
};

export default Display;
