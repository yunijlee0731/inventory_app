// import { userInventoryWindow } from "../pages/UserInventory";

exports.updateItem = async (
  id,
  userID,
  itemName,
  description,
  quantity,
  userInventoryWindow
) => {
  console.log("current itemId", id);
  // console.log("Performing delete action for:", currSelectedRow.id);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      userID,
      itemName,
      description,
      quantity,
    }),
  };

  try {
    const response = await fetch("/api/inventory/update-item", requestOptions);
    const data = await response.json();
    console.log("EditItemHelper.js Success?: ", data.success);
    console.log("EditItemHelper.js Message: ", data.message);
    userInventoryWindow.reload();
    return data;
  } catch (error) {
    // setMessage(
    //   "An unexpected error occurred while adding the item. Please try again."
    // );
    // setMessageVariant("danger");
    console.log(error);
  }
};
