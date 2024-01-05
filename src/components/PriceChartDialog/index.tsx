import { useMemo } from "react";
import Highcharts from "highcharts";
import Highstockcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { Slideover } from "../../base-components/Headless";

interface IMainProps {
  open?: boolean;
  all?: boolean;
  prices?: any[];
  onClose?: () => void;
}

const getPrice = (price: string) => {
  return Number(
    price
      .split("")
      .filter((char) => char.match(/[0-9.]/))
      .join("")
  );
};

const getPriceData = (prices: any[], all: boolean = false) => {
  return prices.map((price: any) => [
    new Date(price.date).getTime(),
    getPrice(price.price),
  ]);
};

const initialStockSeries = {
  name: "Price",
  type: "areaspline",
  threshold: null,
  tooltip: {
    valueDecimals: 2,
  },
  fillColor: {
    linearGradient: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1,
    },
    stops: [
      [0, Highcharts.getOptions().colors[0]],
      [
        1,
        Highcharts.color(Highcharts.getOptions().colors[0])
          .setOpacity(0)
          .get("rgba"),
      ],
    ],
  },
};

function Main({
  open = false,
  all = false,
  prices = [],
  onClose = () => {},
}: IMainProps) {
  const options = useMemo(() => {
    console.log("-----------------Price All Dialog---------", prices);
    return all
      ? {
          title: {
            text: "Price Diagram",
          },
          chart: {
            type: "spline",
          },
          series: prices.map((size: any) => ({
            name: size.size,
            data: getPriceData(size.prices, true),
          })),
          xAxis: {
            type: "datetime",
            title: {
              text: "Date",
            },
          },
          yAxis: {
            title: {
              text: "Price",
            },
          },
          // yAxis: prices.map((price: any) => ({
          //   title: {
          //     text: price.size,
          //   },
          // })),
        }
      : {
          rangeSelector: {
            selected: 1,
          },
          title: {
            text: "Price Diagram",
          },
          series: [{ ...initialStockSeries, data: getPriceData(prices) }],
        };
  }, [prices]);

  return (
    <Slideover size="xl" open={open} onClose={onClose}>
      <Slideover.Panel>
        <Slideover.Title>Price Chart</Slideover.Title>
        <Slideover.Description className="w-full">
          {all ? (
            <HighchartsReact highcharts={Highcharts} options={options} />
          ) : (
            <HighchartsReact
              highcharts={Highstockcharts}
              options={options}
              constructorType={"stockChart"}
            />
          )}
        </Slideover.Description>
      </Slideover.Panel>
    </Slideover>
  );
}

export default Main;
