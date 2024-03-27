import { FlatList } from 'react-native';

import CasesItem from './CasesItem';

function renderCasesItem(itemData) {
  return <CasesItem {...itemData.item} />;
}

function CasesList({ cases }) {
  return (
    <FlatList
      data={cases}
      renderItem={renderCasesItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default CasesList;
