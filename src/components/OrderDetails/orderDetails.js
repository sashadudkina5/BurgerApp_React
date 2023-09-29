import orderDetailsStyles from "./orderDetails.module.css"
import Modal from "../Modal/modal"

function OrderDetails() {
    return (
      <Modal title="title">
      <div className={orderDetailsStyles.wrapper}>
      <h2>Order Details Content</h2>
      </div>
      </Modal>
    );
  }

  export default OrderDetails;