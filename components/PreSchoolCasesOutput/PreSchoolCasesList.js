import { FlatList } from 'react-native';

import PreSchoolCasesItem from './PreSchoolCasesItem';

function renderCasesItem(itemData) {
  return <PreSchoolCasesItem {...itemData.item} />;
}

function PreSchoolCasesList({ preSchoolCases }) {

  return (
    <FlatList
      data={preSchoolCases}
      renderItem={renderCasesItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default PreSchoolCasesList;
