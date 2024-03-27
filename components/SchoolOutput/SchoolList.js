import { FlatList } from 'react-native';
import SchoolItem from './SchoolItem';


function renderCasesItem(itemData) {
  return <SchoolItem {...itemData.item} />;
}

function SchoolList({ preSchoolDetails }) {

  return (
    <FlatList
      data={preSchoolDetails}
      renderItem={renderCasesItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default SchoolList;
