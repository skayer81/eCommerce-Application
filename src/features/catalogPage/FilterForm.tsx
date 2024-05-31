import { useState } from 'react';

import { AttributeDefinition, ClientResponse, ProductType } from '@commercetools/platform-sdk';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Button,
  Chip,
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
// import { ClearIcon } from '@mui/x-date-pickers';

import { getAttributes } from '@/api/clientService';
import { useCatalogStore } from '@/stores/catalogStore';
import { PRODUCT_TYPE_KEY } from '@/utils/constants';

function FilterForm(): JSX.Element {
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { setAttributes, isAttributesEmpty, resetAllAttributes, attributes, resetAttribute } =
    useCatalogStore((state) => ({
      setAttributes: state.setAttributes,
      isAttributesEmpty: state.isAttributesEmpty,
      resetAllAttributes: state.resetAllAttributes,
      attributes: state.attributes,
      resetAttribute: state.resetAttribute,
    }));
  const handleChange = (attributeName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValues({
      ...selectedValues,
      [attributeName]: event.target.value,
    });
  };

  const applyFilters = (): void => {
    console.log('Applied filters:', selectedValues);

    setAttributes(selectedValues);
    handleClose();
  };

  const { data: queryattributes, isSuccess } = useQuery({
    queryKey: ['attributes'],
    queryFn: () => getAttributes(PRODUCT_TYPE_KEY),
    select: (data: ClientResponse<ProductType>) => data.body.attributes,
  });

  const filtAttributes = queryattributes?.filter((attr) => attr.name !== 'size');

  const handleClickOnIcon = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  if (isSuccess) {
    console.log('attributes= ', filtAttributes);
  }

  return (
    <div>
      <IconButton
        aria-label="filter"
        onClick={handleClickOnIcon}
        sx={{
          backgroundColor: isAttributesEmpty() ? 'inherit' : 'lightgreen',
          borderRadius: '10px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        <FilterAltIcon />
      </IconButton>
      {Object.entries(attributes).map(([key, value]) =>
        value ? (
          <Chip
            key={key}
            label={`${key}: ${value}`}
            onDelete={() => resetAttribute(key)}
            sx={{ ml: 1 }}
          />
        ) : null,
      )}
      {!isAttributesEmpty() && (
        <Chip
          label="Reset Filters"
          onDelete={resetAllAttributes}
          sx={{
            ml: 1,
            backgroundColor: 'lightgrey',
          }}
        />
      )}
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
