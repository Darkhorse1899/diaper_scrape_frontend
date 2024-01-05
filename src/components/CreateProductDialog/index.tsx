import { useState, useEffect } from "react";

import { FormInput } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { Dialog } from "../../base-components/Headless";

interface IMainProps {
  open?: boolean;
  onClose?: () => void;
  onCreate?: (_: IProduct) => void;
}

interface IProduct {
  name: string;
  url: string;
}

const initialProduct = {
  name: "",
  url: "",
};

const initialError = {} as IProduct;

function Main({
  open = false,
  onClose = () => {},
  onCreate = () => {},
}: IMainProps) {
  const [product, setProduct] = useState<IProduct>(initialProduct);
  const [error, setError] = useState<IProduct>(initialError);

  const onProductChange = (e: any) => {
    const name = e.target.name,
      value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  const onProductCreate = () => {
    const errors: IProduct = {} as IProduct;
    if (product.name === "") errors.name = "Name field required";
    if (product.url === "") errors.url = "URL field required";
    if (Object.keys(errors).length === 0) {
      onCreate(product);
    } else {
      setError(errors);
    }
  };

  useEffect(() => {
    if (!open) {
      setProduct(initialProduct);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Panel>
        <Dialog.Title>
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className="text-base font-medium">Create a Product</div>
          </div>
        </Dialog.Title>
        <Dialog.Description className="p-5 box box--stacked">
          <FormInput
            type="text"
            name="name"
            placeholder="Enter product name"
            className="py-3"
            value={product.name}
            onChange={onProductChange}
          />
          {!!error.name && (
            <p className="text-red-500 text-xs mt-1">{error.name}</p>
          )}
          <FormInput
            type="text"
            name="url"
            placeholder="Enter product url"
            className="py-3 mt-3"
            value={product.url}
            onChange={onProductChange}
          />
          {!!error.url && (
            <p className="text-red-500 text-xs mt-1">{error.url}</p>
          )}
          <div className="flex gap-3 mt-6">
            <Button
              rounded
              variant="primary"
              className="px-7 border-primary/50"
              onClick={onProductCreate}
            >
              Create Now
            </Button>
          </div>
        </Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  );
}

export default Main;
