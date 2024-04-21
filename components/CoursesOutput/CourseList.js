import { FlatList } from 'react-native';

import CourseItem from './CourseItem';

function renderCasesItem(itemData){
//print the item data
  return <CourseItem {...itemData.item} />;
}

function CourseList({ institutes }) {
  return (
    <FlatList
      data={institutes}
      renderItem={renderCasesItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default CourseList;
