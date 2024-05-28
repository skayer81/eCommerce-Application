import { Category, CategoryPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';
import {
  CircularProgress,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useQuery /* useQueryClient  */ } from '@tanstack/react-query';

import { getMainCategories, getSubCategories } from '@/api/clientService';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';

// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';

function Categories(): JSX.Element {
  // const queryClient = useQueryClient();

  const {
    data: categories,
    /*  isLoading: isLoadingCategories, */
    error: errorCategories,
    isSuccess,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getMainCategories,
    select: (data: ClientResponse<CategoryPagedQueryResponse>) => data.body.results,
  });

  // const getSubcategories = (categoryId:string) => {
  //   return useQuery<ClientResponse<CategoryPagedQueryResponse>>(['subcategories', categoryId], () => getSubcategories(categoryId), {
  //     enabled: !!categoryId,
  //   });
  // };

  if (errorCategories) {
    return <Typography>Error fetching categories: {errorCategories.message}</Typography>;
  }

  if (isSuccess) {
    console.log('categories=', categories);
    return (
      <List>
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </List>
    );
  }

  return <CircularProgress />;
}

type CategoryProps = {
  category: Category;
};

function CategoryItem({ category }: CategoryProps): JSX.Element {
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
        <ListItemButton sx={{ height: '50px' }}>
          <ListItemText primary={category.name.en} />
        </ListItemButton>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subcategories.map((subcategory) => (
              <ListItemButton key={subcategory.id} sx={{ pl: 4, height: '30px' }}>
                <ListItemText primary={subcategory.name.en} />
              </ListItemButton>
            ))}

            <ListItemButton sx={{ pl: 4, height: '30px' }}>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </>
    );
  }

  return <CircularProgress />;
}

export default Categories;
