import Category from "../../models/category.model.js";

export const updateService = async (id, data) => {
  const { name, description } = data;

  const category = await Category.findByIdAndUpdate(
    id,
    { name, description },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    throw new Error('Category not found');
  }

  console.log('update');
  console.log(id);
  console.log({ name, description });

  return category;
};
