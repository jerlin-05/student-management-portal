import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents, deleteStudent } from '../redux/studentSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentList() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const students = useSelector(state => state.students);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        dispatch(setStudents(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Student List</h2>
      <button onClick={() => navigate('/add')}>Add Student</button>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            <strong>{s.name}</strong> ({s.email})
            <button onClick={() => navigate(`/student/${s.id}`)}>View</button>
            <button onClick={() => navigate(`/edit/${s.id}`)}>Edit</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
