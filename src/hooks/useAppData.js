import { useDispatch, useSelector } from 'react-redux';
import { setForms, selectForm } from '../store/slices/formSlice';

export const useAppData = () => {
  const dispatch = useDispatch();
  const { forms, selectedForm } = useSelector((state) => state.form);

  const loadForms = async () => {
    const data = await fetch('/api/forms').then((res) => res.json());
    dispatch(setForms(data));
  };

  return { forms, selectedForm, loadForms };
};
