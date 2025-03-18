"use client";

import ViewForm from '@/components/ViewForm/ViewForm';
import React from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
  const activeFormId = useSelector((state) => state.forms.activeFormId);
  const form = useSelector((state) => state.forms.tempForms[activeFormId]);

  return form ? <ViewForm form={form} /> : <p>Loading...</p>;
};

export default Page;
