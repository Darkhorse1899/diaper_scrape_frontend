import Lucide from "../../base-components/Lucide";
import { Menu } from "../../base-components/Headless";
import { FormCheck } from "../../base-components/Form";

import clsx from "clsx";
import _ from "lodash";

interface IMainProps {
  className?: string;
  products: any[];
  activeIndex: string;
  setActiveIndex: (_: string) => void;
  openCreateDialog: () => void;
}

function Main({
  className,
  products,
  activeIndex,
  setActiveIndex,
  openCreateDialog,
}: IMainProps) {
  const getTopicImageUrl = (product: any) => {
    const sizes: any[] = product.products || [];
    if (!sizes.length) return "";
    return sizes[0].image || "";
  };

  return (
    <div className={clsx("flex flex-col gap-y-10", className)}>
      <div className="p-5 box box--stacked space-y-3">
        <div>
          <div className="flex items-center w-full px-3 py-3 font-medium border rounded-lg bg-slate-50 text-slate-500">
            <Lucide icon="KanbanSquare" className="w-5 h-5 mr-2 stroke-[1.3]" />
            Product List
            <Menu className="ml-auto">
              <Menu.Button as="a">
                <Lucide
                  icon="MoreVertical"
                  className="w-5 h-5 stroke-slate-500/70 fill-slate-500/70"
                />
              </Menu.Button>
              <Menu.Items className="w-40">
                <Menu.Item onClick={openCreateDialog}>
                  <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Create
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="Trash" className="w-4 h-4 mr-2" />
                  Delete
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
          <div className="flex flex-col gap-3 mt-3">
            {products.map((product, productKey) => (
              <div
                onClick={() => setActiveIndex(product.id)}
                className={clsx(
                  "relative flex flex-col items-center gap-5 p-3 border border-dashed rounded-lg sm:flex-row border-slate-300/60 cursor-pointer",
                  { "bg-slate-100": activeIndex === product.id }
                )}
                key={productKey}
              >
                <div className="absolute top-0 right-0 mt-3 mr-3">
                  <FormCheck.Input
                    className="border"
                    type="checkbox"
                    checked={false}
                    onChange={() => {}}
                  />
                </div>
                <div>
                  <div className="w-40 h-24 rounded-md image-fit border-[3px] border-slate-200/70">
                    <img
                      alt="Tailwise - Admin Dashboard Template"
                      className="rounded-md saturate-[0.7]"
                      src={getTopicImageUrl(product)}
                    />
                  </div>
                </div>
                <div className="-mt-1 overflow-hidden flex flex-col">
                  <p className="block font-medium text-center sm:text-left">
                    {product.name}
                  </p>
                  <div className="flex items-center mt-2.5 text-xs text-slate-500 dark:text-slate-500">
                    <Lucide
                      icon="Link"
                      className="w-2.5 h-2.5 mr-1.5 stroke-[2] shrink-0"
                    />
                    <a
                      href={product.url}
                      className="truncate underline decoration-dotted underline-offset-[3px] decoration-slate-300"
                    >
                      {product.url}
                    </a>
                  </div>
                  <div className="flex items-center justify-center mt-4 sm:justify-start">
                    <div className="ml-3 text-xs text-slate-500">
                      {(product.products || []).length} Sizes
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
