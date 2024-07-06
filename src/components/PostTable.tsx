import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Post } from '../models/Post';

const PostTable = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 150 ,editable: true},
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={posts} 
         columns={columns} 
         
         initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}

         
         pageSizeOptions={[10]}
         checkboxSelection
        disableRowSelectionOnClick />
    </div>
  );
};

export default PostTable;
