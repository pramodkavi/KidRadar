import { FlatList } from 'react-native';
import StudentItem from './StudentItem';


function renderCasesItem(itemData) {
  // console.log("//////////////////////////itemData",...itemData);
  return <StudentItem itemData={itemData.item} />;
}

function StudentList({ studentDetails }) {
  console.log("//////////////////////////studentDetails",studentDetails);

  return (
    <FlatList
      data={studentDetails}
      renderItem={renderCasesItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default StudentList;
