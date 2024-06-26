import { FlatList } from 'react-native';

import PreSchoolItem from './PreSchoolItem';

function renderCasesItem(itemData) {
  return <PreSchoolItem {...itemData.item} />;
}

function PreSchoolList({ preSchoolDetails }) {
  return (
    <FlatList
      data={preSchoolDetails}
      renderItem={renderCasesItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default PreSchoolList;
