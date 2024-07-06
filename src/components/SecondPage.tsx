
import { Navigate } from 'react-router-dom';
import { isUserDetailsValid } from '../utils/validation';
import PostTable from './PostTable'; // This is the table component from Task 3
import Departments from './Departments'; // The component from Task 4

const SecondPage = () => {
  if (!isUserDetailsValid()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h2>Post Data</h2>
      <PostTable />
      <h2>Departments</h2>
      <Departments />
    </div>
  );
};

export default SecondPage;
