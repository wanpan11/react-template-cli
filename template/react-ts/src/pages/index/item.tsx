type PriceItemProps = {
  start_time: string;
  pay_amount: number;
};

const PriceItem = (props: PriceItemProps) => {
  /*  */
  return (
    <div>
      <span>{props.start_time}</span>
      <span>{props.pay_amount}</span>
    </div>
  );
};

export default PriceItem;
