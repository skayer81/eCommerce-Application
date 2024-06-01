import { Chip, Container } from '@mui/material';

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
    <Container>
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
    </Container>
  );
}

export default FilterChips;
