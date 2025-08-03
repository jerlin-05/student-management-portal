import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function StudentDetail() {
  const { id } = useParams();
  const student = useSelector(state => state.students.find(s => s.id.toString() === id));
  const navigate = useNavigate();

  if (!student) return <p>Student not found.</p>;

  return (
    <div className="container">
      <h2>Student Detail</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      <button onClick={() => navigate('/')}>Back to List</button>
    </div>
  );
}
