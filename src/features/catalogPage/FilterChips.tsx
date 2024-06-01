import { Chip, Stack } from '@mui/material';

import { useCatalogStore } from '@/stores/catalogStore';

function FilterChips(): JSX.Element {
  const { isAttributesEmpty, resetAllAttributes, attributes, resetAttribute } = useCatalogStore(
    (state) => ({
      isAttributesEmpty: state.isAttributesEmpty,
      resetAllAttributes: state.resetAllAttributes,
      attributes: state.attributes,
      resetAttribute: state.resetAttribute,
    }),
  );

  return (
    <Stack direction="row" spacing={1}>
      {Object.entries(attributes).map(([key, value]) =>
        value ? (
          <Chip key={key} label={`${key}: ${value}`} onDelete={() => resetAttribute(key)} />
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
    </Stack>
  );
}

export default FilterChips;
