import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

import ProductPanel from "../../components/ProductPanel";
import SizePanel from "../../components/SizePanel";
import CreateProductDialog from "../../components/CreateProductDialog";
import PriceChartDialog from "../../components/PriceChartDialog";

import { HttpService } from "../../utils/api";

function Main() {
  const [products, setProducts] = useState<any[]>([]);
  const [productIndex, setProductIndex] = useState("");
  const [sizeIndex, setSizeIndex] = useState("");
  const [productSizes, setProductSizes] = useState<any[]>([]);
  const [pricesByDate, setPricesByDate] = useState<any[]>([]);

  const [createProductOpen, setCreateProductOpen] = useState(false);
  const [priceChartOpen, setPriceChartOpen] = useState(false);

  const onProductCreate = (product: { name: string; url: string }) => {
    HttpService.post("/search", product)
      .then((response) => {
        if (response === "success") {
          setProducts([...products, product]);
          enqueueSnackbar("Add product successfully!", { variant: "success" });
          setCreateProductOpen(false);
        } else if (response === "url not available") {
          enqueueSnackbar("The product url is invalid.", {
            variant: "warning",
          });
        } else {
          enqueueSnackbar("Add product failed!", { variant: "error" });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Something went wrong with server!", {
          variant: "error",
        });
      });
  };

  const onSizeClick = (index: string) => {
    setSizeIndex(index);
    setPriceChartOpen(true);
  };

  useEffect(() => {
    HttpService.get("/products").then((response) => {
      setProducts(response);
    });
  }, []);

  useEffect(() => {
    if (!sizeIndex) return;
    HttpService.get(`/prices/${sizeIndex}`).then((response) => {
      if (response) {
        setPricesByDate(response);
      }
    });
  }, [sizeIndex]);

  useEffect(() => {
    if (productIndex === "") return;
    const product = products.find(
      (item: any) => item.id === productIndex
    ) as any;
    if (!product) return;
    const sizes = product.products || [];
    setProductSizes(sizes);
  }, [productIndex]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <ProductPanel
        className="col-span-1"
        products={products}
        activeIndex={productIndex}
        setActiveIndex={setProductIndex}
        openCreateDialog={() => setCreateProductOpen(true)}
      />
      <SizePanel sizes={productSizes} openOneSizeDialog={onSizeClick} />
      <CreateProductDialog
        open={createProductOpen}
        onClose={() => setCreateProductOpen(false)}
        onCreate={onProductCreate}
      />
      <PriceChartDialog
        open={priceChartOpen}
        prices={pricesByDate}
        onClose={() => setPriceChartOpen(false)}
      />
    </div>
  );
}

export default Main;
