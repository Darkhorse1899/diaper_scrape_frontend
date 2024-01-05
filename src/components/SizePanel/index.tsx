// import { useEffect, useState } from "react";
import { useEffect, useMemo, useState } from "react";
import Button from "../../base-components/Button";

import PriceChartDialog from "../../components/PriceChartDialog";

import { HttpService } from "../../utils/api";

import _ from "lodash";

interface IMainProps {
  sizes: any[];
  openOneSizeDialog: (_: string) => void;
}

function Main({ sizes, openOneSizeDialog }: IMainProps) {
  const [sizePrices, setSizePrices] = useState<any[]>([]);
  const [openPriceDialog, setOpenPriceDialog] = useState(false);

  useEffect(() => {
    Promise.all(
      sizes.map(
        (size: any) =>
          new Promise((resolve, reject) => {
            HttpService.get(`/prices/${size.id}`)
              .then((response) => {
                resolve({ prices: response, size: size.size });
              })
              .catch((err) => reject(err));
          })
      )
    ).then((response) => {
      console.log("-----------prices--------", response);
      setSizePrices(response);
    });
  }, [sizes]);

  return (
    <div className="flex flex-col p-5 box box--stacked">
      <nav
        className="-mt-0.5 flex  items-center justify-between"
        aria-label="breadcrumb"
      >
        <p className="text-theme-1 text-[18px]">Size List</p>
        <Button
          variant="primary"
          onClick={() => setOpenPriceDialog(true)}
          disabled={!sizes.length}
        >
          Chart
        </Button>
      </nav>
      <div className="grid grid-cols-12 rounded-[0.6rem] border-dashed border shadow-sm overflow-hidden mt-4">
        {sizes.map((size, sizeKey) => (
          <div
            key={sizeKey}
            className="col-span-6 sm:col-span-4 2xl:col-span-3 border-dashed [&:nth-child(4n)]:border-r-0 px-5 pb-5 pt-6 border-r border-b text-center flex flex-col -mb-px cursor-pointer"
            onClick={() => openOneSizeDialog(size.id)}
          >
            <div className="w-20 h-20 mx-auto image-fit">
              <img
                alt="Tailwise - Admin Dashboard Template"
                className="rounded-md"
                src={size.image || ""}
              />
            </div>
            <div className="mt-5 font-medium text-[0.94rem] truncate">
              {size.size}
            </div>
            <div className="mt-1.5 text-slate-500">{size.latest}</div>
          </div>
        ))}
      </div>
      <PriceChartDialog
        open={openPriceDialog}
        onClose={() => setOpenPriceDialog(false)}
        prices={sizePrices}
        all={true}
      />
    </div>
  );
}

export default Main;
