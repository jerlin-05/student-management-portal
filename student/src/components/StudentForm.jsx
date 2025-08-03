import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent } from '../redux/studentSlice';
import { useNavigate, useParams } from 'react-router-dom';

export default function StudentForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const students = useSelector(state => state.students);
  const existing = isEdit ? students.find(s => s.id.toString() === id) : {};
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && existing) {
      setForm(existing);
    }
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone) errs.phone = 'Required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    if (isEdit) {
      dispatch(updateStudent({ ...form, id: existing.id }));
    } else {
      dispatch(addStudent({ ...form, id: Date.now() }));
    }
    navigate('/');
  };

  return (
    <div className="container">
      <h2>{isEdit ? 'Edit' : 'Add'} Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Full Name"
        />
        {errors.name && <p>{errors.name}</p>}

        <input
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email}</p>}

        <input
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone"
        />
        {errors.phone && <p>{errors.phone}</p>}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
