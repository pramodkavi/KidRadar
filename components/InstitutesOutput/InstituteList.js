import { FlatList } from 'react-native';

import InstituteItem from './InstituteItem';

function renderCasesItem(itemData){
//print the item data
  return <InstituteItem {...itemData.item} />;
}

function InstituteList({ institutes }) {
  return (
    <FlatList
      data={institutes}
      renderItem={renderCasesItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default InstituteList;
