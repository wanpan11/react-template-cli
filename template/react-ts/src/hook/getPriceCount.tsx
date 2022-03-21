import { useState, useEffect, useCallback, useRef } from "react";

const usePriceCount: (
  arr: number[]
) => [number, boolean, (arr: number[]) => void] = arr => {
  /*  */
  const [priceArr, priceArrHandle] = useState(arr);
  const [status, statusHandle] = useState(false);
  const count = useRef(0);

  const setNumber = useCallback((num: number): number => {
    const num_str = (num * 100).toString();

    let new_num;
    if (num_str.indexOf(".") > -1) {
      new_num = Math.round(Number(num_str));
    } else {
      new_num = Number(num_str);
    }

    return new_num;
  }, []);

  const setCount = useCallback(
    (pay: number): void => {
      if (!pay) {
        return;
      }
      const tempPay = setNumber(pay);
      const oldCount = setNumber(count.current);

      count.current = Number((oldCount + tempPay) / 100);
    },
    [setNumber]
  );

  const reCount = arr => {
    statusHandle(false);
    priceArrHandle(arr);
  };

  useEffect(() => {
    priceArr.forEach((el, ind) => {
      setCount(el);
      if (ind + 1 === priceArr.length) statusHandle(true);
    });
  }, [priceArr, setCount, statusHandle]);

  return [count.current, status, reCount];
};

export default usePriceCount;
