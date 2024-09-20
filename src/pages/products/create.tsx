// import { useForm, useSelect } from "@refinedev/core";
import { useForm, useSelect, SaveButton, Create } from "@refinedev/antd";
import { Form, Input, Select, InputNumber } from "antd";

export const CreateProduct = () => {
  const { formProps, saveButtonProps } = useForm({
    refineCoreProps: {
      redirect: "edit",
    },
  });

  const { onFinish, mutation } = useForm();
  const { selectProps } = useSelect({
    resource: "categories",
  });

  const { options } = useSelect({
    resource: "categories",
    // optionLabel: "title", // Default value is "title" so we don't need to provide it.
    // optionValue: "id", // Default value is "id" so we don't need to provide it.
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(event.target).entries());
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
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
    </Create>

    // <form onSubmit={onSubmit}>
    //   <label htmlFor="name">Name</label>
    //   <input type="text" id="name" name="name" />

    //   <label htmlFor="description">Description</label>
    //   <textarea id="description" name="description" />

    //   <label htmlFor="price">Price</label>
    //   <input type="number" id="price" name="price" step=".01" />

    //   <label htmlFor="material">Material</label>
    //   <input type="text" id="material" name="material" />

    //   <label htmlFor="category">Category</label>
    //   <select id="category" name="category">
    //     {options?.map((option) => (
    //       <option key={option.value} value={option.value}>
    //         {option.label}
    //       </option>
    //     ))}
    //   </select>

    //   {mutation.isSuccess && <span>successfully submitted!</span>}
    //   <button type="submit">Submit</button>
    // </form>
  );
};
