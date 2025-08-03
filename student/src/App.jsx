import { Routes, Route } from 'react-router-dom';
import StudentList from './pages/StudentList';
import StudentDetail from './pages/StudentDetail';
import StudentForm from './components/StudentForm';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentList />} />
      <Route path="/student/:id" element={<StudentDetail />} />
      <Route path="/add" element={<StudentForm />} />
      <Route path="/edit/:id" element={<StudentForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
