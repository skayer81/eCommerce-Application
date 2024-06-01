import { Category, ClientResponse } from '@commercetools/platform-sdk';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';

import { getCategoryById } from '@/api/clientService';
import { useCatalogStore } from '@/stores/catalogStore';

export default function CatalogBreadcrumbs(): JSX.Element {
  const { categoryId, parentId, setCategory } = useCatalogStore();

  const { data: categoryName } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategoryById(categoryId),
    select: (data: ClientResponse<Category>) => data.body.name.en,
    enabled: !!categoryId,
  });

  const { data: parentName } = useQuery({
    queryKey: ['parent', parentId],
    queryFn: () => getCategoryById(parentId),
    select: (data: ClientResponse<Category>) => data.body.name.en,
    enabled: !!parentId,
  });

  console.log('parent=', parentName);
  console.log('category=', categoryName);

  const getColor = (): string => (!parentId && !categoryId ? 'text.primary' : 'inherit');

  return (
    <div role="presentation" style={{ marginBottom: '10px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          onClick={() => setCategory({ categoryId: '', parentId: '' })}
          sx={{
            fontWeight: !parentId && !categoryId ? 'bold' : 'normal',
            color: getColor(),
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          }}
        >
          Catalog
        </Typography>

        {parentId && parentName && (
          <Typography
            onClick={() => setCategory({ categoryId: parentId, parentId: '' })}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
                cursor: 'pointer',
              },
            }}
          >
            {parentName}
          </Typography>
        )}

        {categoryId && (
          <Typography color="text.primary" sx={{ fontWeight: 'bold' }}>
            {categoryName}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
