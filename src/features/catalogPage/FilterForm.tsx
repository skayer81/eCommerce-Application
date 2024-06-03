import { useState } from 'react';

import { AttributeDefinition, ClientResponse, ProductType } from '@commercetools/platform-sdk';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  ListItem,
  Popover,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getAttributes } from '@/api/clientService';
import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import { useCatalogStore } from '@/stores/catalogStore';
import { PRODUCT_TYPE_KEY } from '@/utils/constants';

function FilterForm(): JSX.Element {
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { setAttributes, isAttributesEmpty } = useCatalogStore((state) => ({
    setAttributes: state.setAttributes,
    isAttributesEmpty: state.isAttributesEmpty,
  }));
  const handleChange = (attributeName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValues({
      ...selectedValues,
      [attributeName]: event.target.value,
    });
  };

  const applyFilters = (): void => {
    setAttributes(selectedValues);
    handleClose();
  };

  const {
    data: queryattributes,
    isError,
    error,
  } = useQuery({
    queryKey: ['attributes'],
    queryFn: () => getAttributes(PRODUCT_TYPE_KEY),
    select: (data: ClientResponse<ProductType>) => data.body.attributes,
  });

  if (isError) {
    console.error(error);
    return <ErrorAlert />;
  }

  const filtAttributes = queryattributes?.filter((attr) => attr.name !== 'size');

  const handleClickOnIcon = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="filter"
        onClick={handleClickOnIcon}
        sx={{
          backgroundColor: isAttributesEmpty() ? 'bgButtons.light' : 'bgButtons.main',
          borderRadius: '10px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        <FilterAltIcon />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <Stack sx={{ p: '5px 10px' }}>
          {filtAttributes?.map((attribute: AttributeDefinition) => (
            <FormControl component="fieldset" key={attribute.name} sx={{ mt: '5px' }}>
              <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                {attribute.label.en}
              </FormLabel>
              <RadioGroup
                aria-label={attribute.name}
                name={attribute.name}
                onChange={handleChange(attribute.name)}
                value={selectedValues[attribute.name] || ''}
              >
                <ListItem sx={{ height: '25px' }}>
                  <FormControlLabel control={<Radio size="small" />} label="None" value="" />
                </ListItem>

                {attribute.type.name === 'enum'
                  ? attribute.type.values.map((value) => (
                      <ListItem key={value.key} sx={{ height: '25px' }}>
                        <FormControlLabel
                          control={<Radio size="small" />}
                          label={value.key}
                          value={value.key}
                        />
                      </ListItem>
                    ))
                  : ''}
              </RadioGroup>
              <Divider />
            </FormControl>
          ))}
          <Button
            color="primary"
            onClick={applyFilters}
            sx={{ height: '30px', mt: '10px' }}
            variant="contained"
          >
            Apply
          </Button>
        </Stack>
      </Popover>
    </div>
  );
}

export default FilterForm;
