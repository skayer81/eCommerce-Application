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
          sx={{
            height: '30px',
            color: categoryId === category.id ? 'primary.main' : 'inherit',
          }}
        >
          <ListItemText
            primary={category.name.en}
            primaryTypographyProps={{ fontWeight: 'bold', lineHeight: '1.2em' }}
          />
        </ListItemButton>

        <Collapse in={true} sx={{ mb: '10px' }} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subcategories.map((subcategory) => (
              <ListItemButton
                key={subcategory.id}
                onClick={() => setCategory({ categoryId: subcategory.id, parentId: category.id })}
                selected={categoryId === subcategory.id}
                sx={{
                  pl: 4,
                  height: '25px',
                  color: categoryId === subcategory.id ? 'primary.main' : 'inherit',
                }}
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
