import { Category, CategoryPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';
import { Collapse, Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getMainCategories, getSubCategories } from '@/api/clientService';
import { useCatalogStore } from '@/stores/catalogStore';

function Categories(): JSX.Element {
  const {
    data: categories,
    error: errorCategories,
    isSuccess,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getMainCategories,
    select: (data: ClientResponse<CategoryPagedQueryResponse>) => data.body.results,
  });

  if (errorCategories) {
    return <Typography>Error fetching categories: {errorCategories.message}</Typography>;
  }

  if (isSuccess) {
    return (
      <List>
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </List>
    );
  }

  return <div></div>;
}

type CategoryProps = {
  category: Category;
};

function CategoryItem({ category }: CategoryProps): JSX.Element {
  const setCategory = useCatalogStore((state) => state.setCategory);
  const categoryId = useCatalogStore((state) => state.categoryId);
  const {
    data: subcategories,
    error: errorSubcategories,
    isSuccess,
  } = useQuery({
    queryKey: ['subcategories', category.id],
    queryFn: () => getSubCategories(category.id),
    select: (data: ClientResponse<CategoryPagedQueryResponse>) => data.body.results,
  });

  if (errorSubcategories) {
    return <Typography>Error fetching categories: {errorSubcategories.message}</Typography>;
  }

  if (isSuccess) {
    return (
      <>
        <Divider />
        <ListItemButton
          onClick={() => setCategory({ categoryId: category.id, parentId: '' })}
          selected={categoryId === category.id}
          sx={{ height: '50px' }}
        >
          <ListItemText
            primary={category.name.en}
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItemButton>
        <Divider />
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subcategories.map((subcategory) => (
              <ListItemButton
                key={subcategory.id}
                onClick={() => setCategory({ categoryId: subcategory.id, parentId: category.id })}
                selected={categoryId === subcategory.id}
                sx={{ pl: 4, height: '30px' }}
              >
                <ListItemText primary={subcategory.name.en} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <div></div>;
}

export default Categories;
