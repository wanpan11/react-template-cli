import moment from "moment";
import { List } from "tdesign-react";
import "./index.less";
import price from "../../mock/price";
import usePriceCount from "../../hook/getPriceCount";
import PriceItem from "./item";

const { ListItem } = List;

type HelloProps = {
  compiler: string;
  framework: string;
};

const Index = (props: HelloProps) => {
  /*  */
  const [count_1, ,] = usePriceCount(
    price.data_1.map(el => Number(el.pay_amount))
  );
  const [count_2, ,] = usePriceCount(price.data_2.map(el => Number(el.amount)));

  return (
    <div>
      <h1>
        Hello from {props.compiler} and {props.framework}!
      </h1>

      <div className="content_box">
        <List className="list_box">
          {price.data_1.map(el => {
            return (
              <PriceItem
                pay_amount={el.pay_amount}
                start_time={moment(el.order_create_time * 1000).format(
                  "YYYY-MM-DD HH:MM"
                )}
                key={el.order_id}
              />
            );
          })}

          <ListItem>
            <div>订单数：{price.data_1.length}</div>
            <div>总额：{count_1}</div>
          </ListItem>
        </List>

        <List className="list_box">
          {price.data_2.map(el => {
            return (
              <PriceItem
                pay_amount={Number(el.amount)}
                start_time={el.createTime}
                key={el.orderId}
              />
            );
          })}

          <ListItem>
            <div>订单数：{price.data_2.length}</div>
            <div>总额：{count_2}</div>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Index;
