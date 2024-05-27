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

import { getMainCategories } from '@/api/clientService';
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
  } = useQuery<ClientResponse<CategoryPagedQueryResponse>>({
    queryKey: ['categories'],
    queryFn: getMainCategories,
  });

  // const getSubcategories = (categoryId) => {
  //   return useQuery(['subcategories', categoryId], () => fetchSubcategories(categoryId), {
  //     enabled: !!categoryId,
  //   });
  // };

  if (errorCategories) {
    return <Typography>Error fetching categories: {errorCategories.message}</Typography>;
  }

  if (isSuccess) {
    console.log('categories=', categories.body.results);
    return (
      <List>
        {categories.body.results.map((category) => (
          <CategoryItem
            category={category} /* getSubcategories={getSubcategories} */
            key={category.id}
          />
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
  // const {
  //   data: subcategories,
  //   isLoading: isLoadingSubcategories,
  //   error: errorSubcategories,
  // } = getSubcategories(category.id);

  return (
    // <ListItem>
    //   <Typography variant="h6">{category.name}</Typography>
    //   {isLoadingSubcategories && <CircularProgress size={20} />}
    //   {errorSubcategories && (
    //     <Typography>Error fetching subcategories: {errorSubcategories.message}</Typography>
    //   )}
    //   {subcategories && (
    //     <List>
    //       {subcategories.map((subcategory) => (
    //         <ListItem key={subcategory.id}>
    //           <Typography variant="body2">{subcategory.name}</Typography>
    //         </ListItem>
    //       ))}
    //     </List>
    //   )}
    // </ListItem>
    <>
      <ListItemButton sx={{ height: '50px' }}>
        <ListItemText primary={category.name.en} />
      </ListItemButton>
      <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4, height: '30px' }}>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}

export default Categories;
