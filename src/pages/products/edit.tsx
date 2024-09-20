// import { useForm, useSelect } from "@refinedev/core";

import { useForm, useSelect, SaveButton, Edit } from "@refinedev/antd";
import { Form, Input, Select, InputNumber } from "antd";

export const EditProduct = () => {
  // const { onFinish, mutation, query } = useForm({ redirect: "edit" });

  const { formProps, saveButtonProps, query } = useForm({
    refineCoreProps: {
      redirect: "create",
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: query?.data?.data?.category?.id,
  });

  const record = query?.data?.data;

  // const { options } = useSelect({
  //   resource: "categories",
  // });

  // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Using FormData to get the form values and convert it to an object.
  //   const data = Object.fromEntries(new FormData(event.target).entries());
  //   // Calling onFinish to submit with the data we've collected from the form.
  //   onFinish({
  //     ...data,
  //     price: Number(data.price).toFixed(2),
  //     category: { id: Number(data.category) },
  //   });
  // };

  return (
    <Edit>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Material" name="material">
          <Input />
        </Form.Item>
        <Form.Item label="Category" name={["category", "id"]}>
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber step="0.01" stringMode />
        </Form.Item>
        <SaveButton {...saveButtonProps} />
      </Form>
    </Edit>
    // <form onSubmit={onSubmit}>
    //   <label htmlFor="name">Name</label>
    //   <input type="text" id="name" name="name" defaultValue={record?.name} />

    //   <label htmlFor="description">Description</label>
    //   <textarea
    //     id="description"
    //     name="description"
    //     defaultValue={record?.description}
    //   />

    //   <label htmlFor="price">Price</label>
    //   <input
    //     type="text"
    //     id="price"
    //     name="price"
    //     pattern="\d*.?\d*"
    //     defaultValue={record?.price}
    //   />

    //   <label htmlFor="material">Material</label>
    //   <input
    //     type="text"
    //     id="material"
    //     name="material"
    //     defaultValue={record?.material}
    //   />

    //   <label htmlFor="category">Category</label>
    //   <select id="category" name="category">
    //     {options?.map((option) => (
    //       <option
    //         key={option.value}
    //         value={option.value}
    //         selected={record?.category.id == option.value}
    //       >
    //         {option.label}
    //       </option>
    //     ))}
    //   </select>

    //   {mutation.isSuccess && <span>successfully submitted!</span>}
    //   <button type="submit">Submit</button>
    // </form>
  );
};
