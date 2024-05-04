import { FlatList } from 'react-native';

import PreSchoolItem from './PreSchoolItem';

function renderCasesItem(itemData) {
  console.log('********************************')
  console.log(itemData)
  console.log('********************************')
  
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
