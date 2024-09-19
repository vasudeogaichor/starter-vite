import { useOne, useShow } from "@refinedev/core";

export const ShowProduct = () => {
  // const { data, isLoading } = useOne({ resource: "products", id: 123 });
  const {
    query: { data, isLoading },
  } = useShow();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div>Product name: {data?.data.name}</div>
    <div>Product price: {data?.data.price}</div>
    </>
  );
};
