import { Chip } from '@mui/material';

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
    <div
      style={{
        marginTop: 0,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      {Object.entries(attributes).map(([key, value]) =>
        value ? (
          <Chip
            key={key}
            label={`${key}: ${value}`}
            onDelete={() => resetAttribute(key)}
            size="small"
          />
        ) : null,
      )}
      {!isAttributesEmpty() && (
        <Chip
          label="Reset Filters"
          onDelete={resetAllAttributes}
          size="small"
          sx={{
            backgroundColor: 'lightgrey',
          }}
        />
      )}
    </div>
  );
}

export default FilterChips;
