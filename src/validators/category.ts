import { CategoryModel } from '../@types/Models';

export default async function categoryValidator(
  category: CategoryModel,
): Promise<CategoryModel> {
  category.checkLength(category.body.name, 3, 20, 'name');
  if (category.errors.length > 0) return category;
  category.nameCorrector(category.body.name);

  return category;
}
